// How to Get All NFTs Owned by an Address
require('dotenv').config();
const { Network, Alchemy } = require("alchemy-sdk");

const API_KEY = process.env.API_KEY;

const config = {
    apiKey: API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const main = async () => {
  // Print NFT metadata returned in the response:
  alchemy.nft.getNftMetadataBatch(
  [
    {
      contractAddress: "0xdb6f6f88b32793349ca121421777a7615c4b8848",
      tokenId: "3",
      tokenType: "ERC721"
    },
    {
      contractAddress: "0x73da78273f58420c976b6a8305690c11ef436552",
      tokenId: "4",
      tokenType: "ERC721"
    }
  ],
  {
    tokenUriTimeoutInMs: 5000,
    refreshCache: true
  }
).then(console.log);
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