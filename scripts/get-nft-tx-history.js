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
  // Address we want get NFT mints from
  const fromAddress = "0x6D6Fe13E339Aa55743E2A719f80A71Ee6e18831f";

  const res = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: fromAddress,
    excludeZeroValue: true,
    category: ["erc721", "erc1155"],
  });

  console.log("res", res);

  // Print contract address and tokenId for each NFT (ERC721 or ERC1155):
  for (const events of res.transfers) {
    // console.log("events", events);
    if (events.erc1155Metadata == null) {
      console.log(
        "ERC-721 Token Minted: ID- ",
        events.tokenId,
        " Contract- ",
        events.rawContract.address
      );
    } else {
      for (const erc1155 of events.erc1155Metadata) {
        // console.log("erc1155 metadata --> ", erc1155);
        console.log(
          "ERC-1155 Token Minted: ID- ",
          erc1155.tokenId,
          " Contract- ",
          events.rawContract.address
        );
      }
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