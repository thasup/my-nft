// How to Get NFT Owners at a Specific Block Height
require('dotenv').config();
const { Network, Alchemy } = require("alchemy-sdk");

const API_KEY = process.env.API_KEY;

const config = {
    apiKey: API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const main = async () => {

    // BAYC contract address
    const address = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

    // Block number or height
    const block = "15753215";

    // Get owners 
    const owners = await alchemy.nft.getOwnersForContract(address, false, block);
    console.log(owners);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();