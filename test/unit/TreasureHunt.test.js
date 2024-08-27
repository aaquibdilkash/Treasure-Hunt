const { expect } = require("chai")
const { formatEther } = require("ethers/lib/utils")
const { ethers } = require("hardhat")

describe("TreasureHunt", function () {
    let TreasureHunt
    let treasureHunt
    let owner
    let player1
    let player2
    let player3

    beforeEach(async function () {
        TreasureHunt = await ethers.getContractFactory("TreasureHunt")
        ;[owner, player1, player2, player3] = await ethers.getSigners()
        treasureHunt = await TreasureHunt.deploy()
        await treasureHunt.deployed()
    })

    it("Should allow players to join the game", async function () {
        await treasureHunt.connect(player1).joinGame({ value: ethers.utils.parseEther("0.01") })
        const player1Position = await treasureHunt.getPlayerPosition(player1.address)
        expect(player1Position).to.be.lt(100)
    })

    it("Should not allow players to join twice", async function () {
        await treasureHunt.connect(player1).joinGame({ value: ethers.utils.parseEther("0.01") })
        await expect(
            treasureHunt.connect(player1).joinGame({ value: ethers.utils.parseEther("0.01") })
        ).to.be.revertedWith("Player already joined")
    })

    it("Should allow players to move", async function () {
        await treasureHunt.connect(player1).joinGame({ value: ethers.utils.parseEther("0.01") })
        const initialPosition = await treasureHunt.getPlayerPosition(player1.address)
        await treasureHunt.connect(player1).move(0) // Move up
        await treasureHunt.connect(player1).move(0) // Move up
        await treasureHunt.connect(player1).move(1) // Move down
        await treasureHunt.connect(player1).move(1) // Move down
        await treasureHunt.connect(player1).move(1) // Move down
        await treasureHunt.connect(player1).move(2) // Move left
        await treasureHunt.connect(player1).move(2) // Move left
        await treasureHunt.connect(player1).move(2) // Move left
        await treasureHunt.connect(player1).move(2) // Move left
        await treasureHunt.connect(player1).move(3) // Move right
        await treasureHunt.connect(player1).move(3) // Move right
        await treasureHunt.connect(player1).move(3) // Move right
        await treasureHunt.connect(player1).move(3) // Move right
        await treasureHunt.connect(player1).move(3) // Move right
        const newPosition = await treasureHunt.getPlayerPosition(player1.address)
        expect(newPosition).to.not.equal(initialPosition)
    })

    it("Should move the treasure when player moves to a multiple of 5", async function () {
        await treasureHunt.connect(player1).joinGame({ value: ethers.utils.parseEther("0.01") })
        const initialTreasurePosition = await treasureHunt.getTreasurePosition()
        let move = parseInt(Math.random() * 3)

        // Keep moving until we land on a multiple of 5
        let playerPosition
        let prevPosition = -1
        let treasurePosition

        while (
            Number(playerPosition) % 5 !== 0 &&
            Number(await treasureHunt.getPlayerPosition(player1.address)) != 100
        ) {
            await treasureHunt.connect(player1).move(move) // Move random
            playerPosition = await treasureHunt.getPlayerPosition(player1.address)

            if (Number(prevPosition) == Number(playerPosition)) {
                move = parseInt(Math.random() * 3)
                await treasureHunt.connect(player1).move(move)
                playerPosition = await treasureHunt.getPlayerPosition(player1.address)
            }
            prevPosition = playerPosition
            treasurePosition = await treasureHunt.getTreasurePosition()
            console.log(`Player Move: ${move}`)
            console.log(`Treasure Position: ${Number(treasurePosition)}`)
            console.log(`Player Position: ${Number(playerPosition)}`)
        }

        treasurePosition = await treasureHunt.getTreasurePosition()
        if (Number(await treasureHunt.getPlayerPosition(player1.address)) != 100) {
            expect(treasurePosition).to.not.equal(initialTreasurePosition)
        }
    })

    it("Should move the treasure to a random position when player moves to a prime number", async function () {
        await treasureHunt.connect(player1).joinGame({ value: ethers.utils.parseEther("0.01") })
        const initialTreasurePosition = await treasureHunt.getTreasurePosition()
        let move = parseInt(Math.random() * 3)
        let treasurePosition

        // Keep moving until we land on a prime number
        let playerPosition = -1
        let prevPosition = -2

        while (
            !isPrime(Number(playerPosition)) &&
            Number(await treasureHunt.getPlayerPosition(player1.address)) != 100
        ) {
            await treasureHunt.connect(player1).move(move) // Move random
            playerPosition = await treasureHunt.getPlayerPosition(player1.address)
            if (Number(prevPosition) == Number(playerPosition)) {
                move = parseInt(Math.random() * 3)
                await treasureHunt.connect(player1).move(move)
                playerPosition = await treasureHunt.getPlayerPosition(player1.address)
            }
            prevPosition = playerPosition
            treasurePosition = await treasureHunt.getTreasurePosition()
            console.log(`Player Move: ${move}`)
            console.log(`Treasure Position: ${Number(treasurePosition)}`)
            console.log(`Player Position: ${Number(playerPosition)}`)
        }

        if (Number(await treasureHunt.getPlayerPosition(player1.address)) != 100) {
            expect(treasurePosition).to.not.equal(initialTreasurePosition)
        }
    })

    it("Should declare a winner and reset the game", async function () {
        await treasureHunt.connect(player1).joinGame({ value: ethers.utils.parseEther("0.01") })
        await treasureHunt.connect(player2).joinGame({ value: ethers.utils.parseEther("1") })
        await treasureHunt.connect(player3).joinGame({ value: ethers.utils.parseEther("1") })

        const initialBalance = await player1.getBalance()

        let move = parseInt(Math.random() * 3)

        let treasurePosition

        let playerPosition = -1
        let prevPosition = -2

        while (Number(await treasureHunt.getPlayerPosition(player1.address)) != 100) {
            await treasureHunt.connect(player1).move(move) // Move down
            playerPosition = await treasureHunt.getPlayerPosition(player1.address)

            if (Number(prevPosition) == Number(playerPosition)) {
                move = parseInt(Math.random() * 3)
                await treasureHunt.connect(player1).move(move)
                if (Number(await treasureHunt.getPlayerPosition(player1.address)) == 100) {
                    console.log(`Game Ended`)
                    expect(await treasureHunt.getPlayerPosition(player1.address)).to.be.equal(
                        BigInt(100)
                    )
                }
            }
            prevPosition = playerPosition

            treasurePosition = await treasureHunt.getTreasurePosition()
            console.log(`Player Move: ${move}`)
            console.log(`Treasure Position: ${Number(treasurePosition)}`)
            console.log(`Player Position: ${Number(playerPosition)}`)
        }

        const finalBalance = await player1.getBalance()
        console.log(`Player's Initial Balance: ${formatEther(initialBalance)}`)
        console.log(`Player's Final Balance: ${formatEther(finalBalance)}`)
        expect(initialBalance).to.be.lt(finalBalance)

        // Check if the game has been reset
        expect(await treasureHunt.getPlayerPosition(player1.address)).to.be.equal(BigInt(100))
    })
})

function isPrime(n) {
    if (n <= 1) return false
    if (n <= 3) return true
    if (n % 2 === 0 || n % 3 === 0) return false
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false
    }
    return true
}
