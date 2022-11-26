// Setup: npm install alchemy-sdk
require('dotenv').config();
const { Network, Alchemy } = require("alchemy-sdk");

const API_KEY = process.env.API_KEY;

const config = {
  apiKey: API_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

const main = async () => {
  // The token address we want to query for metadata
  const metadata = await alchemy.core.getTokenMetadata(
    "0xfd6E1B3666a073eccDd5379934F344D7e5f89930" // NFT smart contract address
  );

  console.log("TOKEN METADATA", metadata);
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