require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-ethers")
require("hardhat-gas-reporter")
require("dotenv/config")
require("solidity-coverage")
require("hardhat-deploy")

const MAINNET_RPC_URL =
    process.env.MAINNET_RPC_URL || "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL || "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL || "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"

const BSC_TESTNET_RPC_URL =
    process.env.BSC_TESTNET_RPC_URL || "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"

const BSC_RPC_URL = process.env.BSC_RPC_URL || "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"

const POLYGON_RPC_URL =
    process.env.POLYGON_RPC_URL || "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"

const POLYGON_MUMBAI_TESTNET_RPC_URL =
    process.env.POLYGON_MUMBAI_TESTNET_RPC_URL ||
    "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"

const MNEMONIC = process.env.MNEMONIC || "<mnemonic>"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "<privatKey>"
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2 || "<privatKey2>"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "<your etherscan api>"
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "<your bscscan api>"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "<your polygon api>"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "<your coinmarketcap api>"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            forking: {
                url: BSC_TESTNET_RPC_URL,
                enabled: false,
            },
            allowUnlimitedContractSize: true,
        },
        localhost: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        mainnet: {
            url: MAINNET_RPC_URL,
            // accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            accounts: { mnemonic: MNEMONIC },
            chainId: 1,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            // accounts: { mnemonic: MNEMONIC },
            chainId: 11155111,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            // accounts: { mnemonic: MNEMONIC },
            chainId: 5,
        },
        bscTestnet: {
            url: BSC_TESTNET_RPC_URL,
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            // accounts: { mnemonic: MNEMONIC },
            chainId: 97,
            allowUnlimitedContractSize: true,
        },
        bsc: {
            url: BSC_RPC_URL,
            // accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            accounts: { mnemonic: MNEMONIC },
            chainId: 56,
            allowUnlimitedContractSize: true,
        },
        polygon: {
            url: POLYGON_RPC_URL,
            // accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            accounts: { mnemonic: MNEMONIC },
            chainId: 137,
            allowUnlimitedContractSize: true,
        },
        polygonTestnet: {
            url: POLYGON_MUMBAI_TESTNET_RPC_URL,
            // accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            accounts: { mnemonic: MNEMONIC },
            chainId: 80001,
            allowUnlimitedContractSize: true,
        },
    },
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1337,
            },
        },
        contractSizer: {
            alphaSort: true,
            runOnCompile: true,
            disambiguatePaths: false,
        },
        // compilers: [
        //     {
        //         version: "0.7.4",
        //         settings: {
        //             optimizer: {
        //                 enabled: true,
        //                 runs: 200,
        //             },
        //         },
        //     },
        //     {
        //         version: "0.8.9",
        //         settings: {
        //             optimizer: {
        //                 enabled: true,
        //                 runs: 200,
        //             },
        //         },
        //     },
        // ],
    },
    etherscan: {
        apiKey: {
            mainnet: ETHERSCAN_API_KEY,
            // sepolia: ETHERSCAN_API_KEY,
            // goerli: ETHERSCAN_API_KEY,
            bscTestnet: BSCSCAN_API_KEY,
            bsc: BSCSCAN_API_KEY,
            polygon: POLYGONSCAN_API_KEY,
            polygonMumbai: POLYGONSCAN_API_KEY,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        coinmarketcap: COINMARKETCAP_API_KEY,
        noColors: true,
        currency: "USD",
        network: "Polygon",
        token: "MATIC",
        gasPriceApi: "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice",
        // showTimeSpent: true,
        // rst: true,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
        user1: {
            default: 1,
            1: 1,
        },
    },
    mocha: {
        timeout: 200000, // 200 seconds max for running tests
    },
}
