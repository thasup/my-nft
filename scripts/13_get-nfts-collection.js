// How to Get All NFTs in a Collection
require('dotenv').config();
const { Network, Alchemy } = require("alchemy-sdk");

const API_KEY = process.env.API_KEY;

const config = {
    apiKey: API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const main = async () => {
    // Contract address
  const address = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

  // Flag to omit metadata
  const omitMetadata = false;

  // Get all NFTs
  const { nfts } = await alchemy.nft.getNftsForContract(address, {
    omitMetadata: omitMetadata,
  });

  let i = 1;

  for (let nft of nfts) {
    // The API will only return data for the first 100 NFTs
    console.log(`${i}. ${nft.rawMetadata.image}`);
    i++;
  }
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