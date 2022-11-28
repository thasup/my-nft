// Grabbing an ownership snapshot for a collection
require('dotenv').config();
const { Network, Alchemy } = require("alchemy-sdk");

const API_KEY = process.env.API_KEY;

const config = {
  apiKey: API_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

const main = async () => {
  // Check if 0xshah.eth owns a Bored Ape.
  const nfts = await alchemy.nft.getOwnersForContract(
    "0xf4910c763ed4e47a585e2d34baa9a4b611ae448c", // NFT contract address
    {
      withTokenBalances: true,
    }
  );
  // Print NFTs
  console.log(nfts);
};

// Execute the code
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