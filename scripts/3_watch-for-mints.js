// How to Listen to NFT Mints
require('dotenv').config();
const { Network, Alchemy } = require("alchemy-sdk");

const API_KEY = process.env.API_KEY;

const settings = {
  apiKey: API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// This is the "transfer event" topic we want to watch.
const mintTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
// This is the "from address" we want to watch.
const zeroTopic =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
// This is the NFT contract we want to watch.
const nftContractAddress = "0xfd6E1B3666a073eccDd5379934F344D7e5f89930";

// Create the log options object.
const myNFTMintEvents = {
  address: nftContractAddress,
  topics: [mintTopic, zeroTopic],
};

// TODO: Add whatever logic you want to run upon mint events.
const doSomethingWithTxn = (txn) => console.log(txn);

// Open the websocket and listen for events!
alchemy.ws.on(myNFTMintEvents, doSomethingWithTxn);