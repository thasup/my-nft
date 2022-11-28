// How to Filter Out Spam NFTs
require('dotenv').config();
const { Network, Alchemy } = require("alchemy-sdk");

const API_KEY = process.env.API_KEY;

const config = {
  apiKey: API_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

const main = async () => {
  // Not available on Goerli testnet
  const listOfSpamNFT = await alchemy.nft.getSpamContracts();
  console.log("List of spam NFTs --> ", listOfSpamNFT);

  const userAddr = "0x6D6Fe13E339Aa55743E2A719f80A71Ee6e18831f";

  // 1) Check if contract is spam with API method
  // const response = await alchemy.nft.isSpamContract(userAddr);
  // console.log("response", response);

  // 2) Check if contract is spam locally
  // Get NFTs of owner
  let nfts = await alchemy.nft.getNftsForOwner(userAddr);
  console.log("nfts", nfts);

  console.log("Spam NFTs:");
  let counter = 1;

  // Print out titles of spam NFTs
  for (let i = 0; i < nfts['ownedNfts'].length; i++) {
      const contractAddr = nfts['ownedNfts'][i]['contract']['address'];
      if (spamContracts.includes(contractAddr)) {
          console.log(`${counter}. ${nfts['ownedNfts'][i]['title']}`);
          counter += 1;
      }
  }
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