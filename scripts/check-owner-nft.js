require('dotenv').config();
const { Network, Alchemy } = require("alchemy-sdk");

const API_KEY = process.env.API_KEY;

const config = {
    apiKey: API_KEY,
    network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

const main = async () => {

    // The NFT's smart contract address (ERC-721 or ERC-1155)
    const address = "0x73dA78273F58420c976b6a8305690C11ef436552";

    // The ID of the NFT (decimal or hexadecimal format)
    const tokenId = 0;

    // Get owner
    const owner = await alchemy.nft.getOwnersForNft(address, tokenId);
    console.log(owner);
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