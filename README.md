# Treasure Hunt

## Installation

---

---

### 1. Clone this repo:

```
git clone https://github.com/aaquibdilkash/Treasure-Hunt.git
cd Treasure-Hunt
```

---

---

### 2. Install dependencies

```sh
yarn
```

or

```sh
npm i
```

---

---

### 3. Run the test suite (which also has all the functionality)

```sh
yarn test
```

or

```sh
npm run test
```

---

---

### 4. Deploy scripts (before deployment see point no. 5)

```
yarn deployMain (for mainnet)
```

---

```
yarn deployTest (for testnet)
```

---

---

Treasure Hunt Smart Contract README
Overview

The Treasure Hunt smart contract is a fun and engaging Ethereum-based game where players can join by placing a bet, move around a virtual grid, and aim to find a hidden treasure. The game incorporates elements of randomness for the initial positioning of both the players and the treasure, as well as for the movement of the treasure based on certain conditions. This document provides an overview of the contract, including its functionalities, testing considerations, and notes on randomness and security.
Features

    Join Game: Players can join the game by sending Ether along with the transaction. The minimum bet is defined by MIN_BET.
    Move Around Grid: Joined players can move around a 10x10 grid by choosing a direction (up, down, left, right).
    Find Treasure: The objective is to land on the same position as the hidden treasure. When a player finds the treasure, they win a percentage of the total bets collected.
    Randomness: The contract uses a combination of block.timestamp and block.difficulty to generate pseudo-random numbers for initial positions and treasure movements. However, this method is not entirely secure and could potentially be manipulated by miners.

Testing

A comprehensive suite of unit tests should be developed to ensure the correctness of the contract, especially focusing on edge cases such as:

    Handling of treasure movement when multiple conditions are met simultaneously.
    Ensuring that players cannot join the game without meeting the minimum bet requirement.
    Verifying the distribution of winnings to the correct player upon finding the treasure.
    Checking the reset functionality to prepare the game for a new round correctly.

Hints for Testing

    Utilize modular arithmetic to efficiently manage the grid and movement calculations.
    Carefully design tests to cover various scenarios, including edge cases like simultaneous condition fulfillment for treasure movement.
    Pay attention to gas optimization techniques to minimize costs associated with transactions and computations within the contract.

Randomness and Security

While the contract aims to introduce an element of chance through pseudo-random number generation, it's important to note that the method employed (block.timestamp and block.difficulty) is not secure against manipulation by miners. Ideally, a more secure source of randomness, such as Chainlink VRF, would be preferred. However, considering the constraints and the educational nature of this project, the chosen method serves as a demonstration of how randomness might be implemented in a smart contract.
Conclusion

The Treasure Hunt smart contract offers a simple yet entertaining way to engage with blockchain technology. While it demonstrates several key concepts in smart contract development, including state management, randomness, and event handling, it also highlights important considerations regarding security and fairness in game mechanics. Future iterations could explore integrating more secure randomness solutions and further optimizing gas usage to enhance the gameplay experience.

---
---




## If you want to deploy to a testnet or mainnet:

---

---

### 5. Add a `.env` file with the same contents of `.env.example`, but replaced with your variables.

![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+) **WARNING** ![WARNING](https://via.placeholder.com/15/f03c15/000000?text=+)

> DO NOT PUSH YOUR PRIVATE_KEY TO GITHUB

---

---
