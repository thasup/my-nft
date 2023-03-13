// How to Get All NFTs Owned by an Address
require('dotenv').config();
const { Network, Alchemy } = require("alchemy-sdk");

const API_KEY = process.env.API_KEY;

const config = {
    apiKey: API_KEY,
    network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

const main = async () => {
  // Wallet address
  const walletAddr = "0x6D6Fe13E339Aa55743E2A719f80A71Ee6e18831f";

  const contractAddresses = [
    "0xdb6f6f88b32793349ca121421777a7615c4b8848",
    "0x73da78273f58420c976b6a8305690c11ef436552"
  ]

  // Get all NFTs
  const nfts = await alchemy.nft.getNftsForOwner(walletAddr, {
    contractAddresses
  });
  
  // Parse output
  const numNfts = nfts["totalCount"];
  const nftList = nfts["ownedNfts"];

  console.log(`Total NFTs owned by ${walletAddr}: ${numNfts} \n`);

  let i = 1;

  for (let nft of nftList) {
    console.log(nft.media);
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