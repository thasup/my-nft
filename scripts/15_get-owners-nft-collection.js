// How to Get the Transfer History of an NFT
require('dotenv').config();
const { Network, Alchemy } = require("alchemy-sdk");

const API_KEY = process.env.API_KEY;

const config = {
    apiKey: API_KEY,
    network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

const main = async () => {
  // The address of the NFT collection (an ERC-721 or an ERC-1155 contract)
  const address = "0xf4910c763ed4e47a585e2d34baa9a4b611ae448c";

  // Get owners 
  const owners = await alchemy.nft.getOwnersForContract(address);
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