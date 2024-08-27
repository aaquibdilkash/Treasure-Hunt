const { verify } = require("../utils/verify")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { ethers } = require("hardhat")
const { saveAddresses } = require("../utils/saveAddresses")

const deployerTreasureHunt = async function (hre) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    let [deployer] = await ethers.getSigners()

    log("----------------------------------------------------")
    log("Deploying TreasureHunt and waiting for confirmations...")

    const args = []

    const TreasureHunt = await deploy("TreasureHunt", {
        from: deployer.address,
        args: args,
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`TreasureHunt at ${TreasureHunt.address}`)
    if (!developmentChains.includes(network.name) && process.env.POLYGONSCAN_API_KEY) {
        await verify(TreasureHunt.address, args, "contracts/TreasureHunt.sol:TreasureHunt")
    }

    saveAddresses("TreasureHuntContractAddress", TreasureHunt.address)
}

module.exports = deployerTreasureHunt
deployerTreasureHunt.tags = ["all", "TreasureHunt"]
