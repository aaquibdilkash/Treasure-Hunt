const networkConfig = {
    localhost: {},
    hardhat: {},
    selpolia: {
        blockConfirmations: 6,
    },
    goerli: {
        blockConfirmations: 6,
    },
    bscTestnet: {
        blockConfirmations: 6,
    },
    bsc: {
        blockConfirmations: 6,
    },
    polygon: {
        blockConfirmations: 6,
    },
    polygonTestnet: {
        blockConfirmations: 6,
    },
}

const developmentChains = ["hardhat", "localhost"]
const addressFile = "address.json"
const accountsFile = "accounts.json"

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

module.exports = {
    networkConfig,
    developmentChains,
    addressFile,
    accountsFile,
    ADDRESS_ZERO,
}
