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
  // Contract address
  const address = ["0xf4910c763ed4e47a585e2d34baa9a4b611ae448c"];
  // Get all NFTs
  const response = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    contractAddresses: address,
    category: ["erc721, erc1155"],
    excludeZeroValue: false,
  });

  // Set NFT ID
  const nftId = 3;

  // Get transactions for the NFT
  let txns = response.transfers.filter(
    (txn) => fromHex(txn.erc721TokenId) === nftId
  );
  console.log(response);
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