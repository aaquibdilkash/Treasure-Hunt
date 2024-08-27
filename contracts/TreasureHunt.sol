// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing OpenZeppelin contracts for security and utility functions
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/* Note: Randomness and Security

While the contract aims to introduce an element of chance through pseudo-random number generation, it's important to note that the method employed (block.timestamp and block.difficulty) is not secure against manipulation by miners. Ideally, a more secure source of randomness, such as Chainlink VRF, would be preferred. However, I wasn't sure if I was allowed to use any third party contract such as chainlink VRF. the chosen method serves as a demonstration of how randomness might be implemented in a smart contract

*/

// The contract inherits ReentrancyGuard for protection against reentrancy attacks
contract TreasureHunt is ReentrancyGuard {
    // Using SafeMath library for safe arithmetic operations
    using SafeMath for uint256;

    // Constants defining game parameters
    uint256 public constant GRID_SIZE = 10;
    uint256 public constant TOTAL_POSITIONS = GRID_SIZE * GRID_SIZE; // Total positions on the grid
    uint256 public constant MIN_BET = 0.01 ether; // Minimum bet required to join the game
    uint256 public constant WINNER_PERCENTAGE = 90; // Percentage of total bets won by the winner

    // Struct representing a player in the game
    struct Player {
        uint256 position; // Current position on the grid
        bool hasJoined; // Flag indicating if the player has joined the game
    }

    // Mapping to track players' positions and participation status
    mapping(address => Player) public players;
    // Array to keep track of all players who have joined the game
    address[] public playerAddresses;
    // Variable to store the current position of the treasure
    uint256 public treasurePosition;
    // Total amount of ETH bet by all players
    uint256 public totalBets;

    // Events emitted by the contract
    event PlayerJoined(address player, uint256 position);
    event PlayerMoved(address player, uint256 newPosition);
    event TreasureMoved(uint256 newPosition);
    event Winner(address player, uint256 amount);

    // Constructor initializes the treasure position randomly
    constructor() {
        treasurePosition =
            uint256(keccak256(abi.encodePacked(block.number, block.timestamp))) %
            TOTAL_POSITIONS;
    }

    // Function allowing a player to join the game by placing a bet
    function joinGame() external payable {
        require(msg.value >= MIN_BET, "Insufficient bet amount");
        require(!players[msg.sender].hasJoined, "Player already joined");

        // Calculate initial position for the player
        uint256 initialPosition = uint256(
            keccak256(abi.encodePacked(msg.sender, block.timestamp))
        ) % TOTAL_POSITIONS;

        // Update player's status and record their initial position
        players[msg.sender] = Player(initialPosition, true);
        playerAddresses.push(msg.sender);
        totalBets += msg.value;

        emit PlayerJoined(msg.sender, initialPosition);
    }

    // Function allowing a player to move around the grid
    function move(uint256 direction) external nonReentrant {
        require(players[msg.sender].hasJoined, "Player not in the game");
        require(direction < 4, "Invalid direction");

        // Calculate new position based on chosen direction
        uint256 newPosition = calculateNewPosition(players[msg.sender].position, direction);

        // Update player's position
        players[msg.sender].position = newPosition;

        emit PlayerMoved(msg.sender, newPosition);

        // Check if player has won or move treasure
        if (newPosition == treasurePosition) {
            declareWinner(msg.sender);
        } else {
            moveTreasure(newPosition);
        }
    }

    // Internal function to calculate new position after movement
    function calculateNewPosition(
        uint256 currentPosition,
        uint256 direction
    ) internal pure returns (uint256) {
        // Logic to calculate new position based on direction
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

    // Internal function to determine new treasure position based on game rules
    function moveTreasure(uint256 playerPosition) internal {
        // Logic to move treasure based on player's position
        if (playerPosition % 5 == 0) {
            treasurePosition = getAdjacentPosition(treasurePosition);
        } else if (isPrime(playerPosition)) {
            treasurePosition =
                uint256(keccak256(abi.encodePacked(block.number, block.timestamp))) %
                TOTAL_POSITIONS;
        }

        emit TreasureMoved(treasurePosition);
    }

    // Internal function to get an adjacent position to the current one
    function getAdjacentPosition(uint256 position) internal view returns (uint256) {
        // Logic to select an adjacent position randomly
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

    // Internal function to check if a number is prime
    function isPrime(uint256 n) internal pure returns (bool) {
        // Prime checking logic
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        for (uint256 i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }

    // Internal function to declare a winner and distribute rewards
    function declareWinner(address winner) internal {
        // Logic to distribute winnings and reset game state
        uint256 winAmount = totalBets.mul(WINNER_PERCENTAGE).div(100);
        totalBets = totalBets.sub(winAmount);

        emit Winner(winner, winAmount);

        (bool success, ) = winner.call{value: winAmount}("");
        require(success, "Failed to send ETH to winner");

        resetGame();
    }

    // Internal function to reset the game state for a new round
    function resetGame() internal {
        // Reset logic
        for (uint256 i = 0; i < playerAddresses.length; i++) {
            delete players[playerAddresses[i]];
        }
        delete playerAddresses;
        treasurePosition =
            uint256(keccak256(abi.encodePacked(block.number, block.timestamp))) %
            TOTAL_POSITIONS;
    }

    // External view functions to retrieve player and treasure positions
    function getPlayerPosition(address player) external view returns (uint256) {
        // Return player's position or a default value if they haven't joined
        if (!players[player].hasJoined) {
            return 100;
        }
        return players[player].position;
    }

    function getTreasurePosition() external view returns (uint256) {
        // Return current treasure position
        return treasurePosition;
    }
}
