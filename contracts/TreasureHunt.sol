// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TreasureHunt is ReentrancyGuard {
    using SafeMath for uint256;

    uint256 public constant GRID_SIZE = 10;
    uint256 public constant TOTAL_POSITIONS = GRID_SIZE * GRID_SIZE;
    uint256 public constant MIN_BET = 0.01 ether;
    uint256 public constant WINNER_PERCENTAGE = 90;

    struct Player {
        uint256 position;
        bool hasJoined;
    }

    mapping(address => Player) public players;
    address[] public playerAddresses;
    uint256 public treasurePosition;
    uint256 public totalBets;

    event PlayerJoined(address player, uint256 position);
    event PlayerMoved(address player, uint256 newPosition);
    event TreasureMoved(uint256 newPosition);
    event Winner(address player, uint256 amount);

    constructor() {
        treasurePosition =
            uint256(keccak256(abi.encodePacked(block.number, block.timestamp))) %
            TOTAL_POSITIONS;
    }

    function joinGame() external payable {
        require(msg.value >= MIN_BET, "Insufficient bet amount");
        require(!players[msg.sender].hasJoined, "Player already joined");

        uint256 initialPosition = uint256(
            keccak256(abi.encodePacked(msg.sender, block.timestamp))
        ) % TOTAL_POSITIONS;
        players[msg.sender] = Player(initialPosition, true);
        playerAddresses.push(msg.sender);
        totalBets += msg.value;

        emit PlayerJoined(msg.sender, initialPosition);
    }

    function move(uint256 direction) external nonReentrant {
        require(players[msg.sender].hasJoined, "Player not in the game");
        require(direction < 4, "Invalid direction");

        uint256 newPosition = calculateNewPosition(players[msg.sender].position, direction);
        players[msg.sender].position = newPosition;

        emit PlayerMoved(msg.sender, newPosition);

        if (newPosition == treasurePosition) {
            declareWinner(msg.sender);
        } else {
            moveTreasure(newPosition);
        }
    }

    function calculateNewPosition(
        uint256 currentPosition,
        uint256 direction
    ) internal pure returns (uint256) {
        uint256 row = currentPosition / GRID_SIZE;
        uint256 col = currentPosition % GRID_SIZE;

        if (direction == 0 && row > 0)
            row--; // Up
        else if (direction == 1 && row < GRID_SIZE - 1)
            row++; // Down
        else if (direction == 2 && col > 0)
            col--; // Left
        else if (direction == 3 && col < GRID_SIZE - 1) col++; // Right

        return row * GRID_SIZE + col;
    }

    function moveTreasure(uint256 playerPosition) internal {
        if (playerPosition % 5 == 0) {
            treasurePosition = getAdjacentPosition(treasurePosition);
        } else if (isPrime(playerPosition)) {
            treasurePosition =
                uint256(keccak256(abi.encodePacked(block.number, block.timestamp))) %
                TOTAL_POSITIONS;
        }

        emit TreasureMoved(treasurePosition);
    }

    function getAdjacentPosition(uint256 position) internal view returns (uint256) {
        uint256[] memory adjacentPositions = new uint256[](4);
        uint256 count = 0;

        if (position >= GRID_SIZE) adjacentPositions[count++] = position - GRID_SIZE; // Up
        if (position < TOTAL_POSITIONS - GRID_SIZE)
            adjacentPositions[count++] = position + GRID_SIZE; // Down
        if (position % GRID_SIZE != 0) adjacentPositions[count++] = position - 1; // Left
        if (position % GRID_SIZE != GRID_SIZE - 1) adjacentPositions[count++] = position + 1; // Right

        return
            adjacentPositions[
                uint256(keccak256(abi.encodePacked(block.number, block.timestamp))) % count
            ];
    }

    function isPrime(uint256 n) internal pure returns (bool) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        for (uint256 i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }

    function declareWinner(address winner) internal {
        uint256 winAmount = totalBets.mul(WINNER_PERCENTAGE).div(100);
        totalBets = totalBets.sub(winAmount);

        emit Winner(winner, winAmount);

        (bool success, ) = winner.call{value: winAmount}("");
        require(success, "Failed to send ETH to winner");

        resetGame();
    }

    function resetGame() internal {
        for (uint256 i = 0; i < playerAddresses.length; i++) {
            delete players[playerAddresses[i]];
        }
        delete playerAddresses;
        treasurePosition =
            uint256(keccak256(abi.encodePacked(block.number, block.timestamp))) %
            TOTAL_POSITIONS;
    }

    function getPlayerPosition(address player) external view returns (uint256) {
        if (!players[player].hasJoined) {
            return 100;
        }
        return players[player].position;
    }

    function getTreasurePosition() external view returns (uint256) {
        return treasurePosition;
    }
}
