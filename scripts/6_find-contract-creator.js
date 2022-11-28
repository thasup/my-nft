// How to Get NFT Contract Creator Address
require('dotenv').config();
const axios = require('axios');

// For Goerli testnet
// const API_URL = process.env.API_URL;

// For Ethereum mainnet
const API_URL = "https://eth-mainnet.g.alchemy.com/v2/cIOn7W3o1v8U_OL6HhOxDqU2-Z-mj1OB";

async function getBlockNum() {
  // console.log("getBlockNum");

  const payload = JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 0
  });

  const headers = {
    'Content-Type': 'application/json'
  };

  const response = await axios({
    method: "post",
    url: API_URL,
    headers: headers,
    data: payload,
  }).catch((e) => console.log(e));

  // console.log("response 1 -->", response.data.result);

  // console.log(typeof res === "string");

  return response.data.result;
};

async function getCode(contract_address, block_num) {

  // console.log("getCode");
  // console.log({contract_address, block_num});

  const payload = JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_getCode",
    params: [contract_address, block_num],
    id: 0
  });
  
  const headers = {
    'Content-Type': 'application/json'
  };
  
  const response = await axios({
    method: "post",
    url: API_URL,
    headers: headers,
    data: payload,
  }).catch((e) => console.log(e));

  // console.log("response 2 -->", response.data);

  return response.data.result;
};

async function getTxReceipt(block_num) {
  // console.log("getTxReceipt");
  // console.log({block_num});

  const payload = JSON.stringify({
    jsonrpc: "2.0",
    method: "alchemy_getTransactionReceipts",
    params: [
      {
        blockNumber: block_num,
      }
    ],
    id:1
  });
  
  const headers = {
    'Content-Type': 'application/json'
  };
  
  const response = await axios({
    method: "post",
    url: API_URL,
    headers: headers,
    data: payload,
  }).catch((e) => console.log(e));

  // console.log("response 3 -->", response.data);

  return response.data.result.receipts;
};

// Returns index of x in arr if present, else -1
async function binarySearch(arr, low, high, contract_address) {

  // Convert hexcimal to decimal number
  let decHigh = parseInt(high);
  let decLow = parseInt(low);

  // console.log({decHigh, decLow});

  // Check base case
  if (decHigh >= decLow) {
    let mid = parseInt((decHigh + decLow)/2);

    console.log("===");
    console.log({decHigh, mid, decLow});
    
    if (decHigh === decLow) { 
      const hLow = `0x${decLow.toString(16)}`;
      return hLow;
    }

    // Convert decimal to hexcimal string
    let hexHigh = `0x${decHigh.toString(16)}`;
    let hexMid = `0x${mid.toString(16)}`;
    let hexLow = `0x${decLow.toString(16)}`;

    // If element is smaller than mid, then it can only
    // be present in left subarray
    if (await getCode(contract_address, hexMid) !== "0x") {
      return await binarySearch(arr, hexLow, hexMid, contract_address)
      
      // Else the element can only be present in right subarray
    } else if (await getCode(contract_address, hexMid) === "0x") {
      let nextHexMid = `0x${(mid + 1).toString(16)}`;
      return await binarySearch(arr, nextHexMid, hexHigh, contract_address)
    }
  } else {
    // Element is not present in the array
    return -1
  }
};

async function findContractDeployer(contract_address) {
  let currNum = await getBlockNum();

  console.log("currNum : ", currNum);
  const arr = Array.from(Array(parseInt(currNum) + 1).keys());

  // Function call
  const result_block_num = await binarySearch(arr, 0, arr.length-1, contract_address);

  console.log({result_block_num});
  const receipts = (await getTxReceipt(result_block_num));

  console.log("receipts length : ", receipts.length);

  for (const receipt of receipts) {
    if (receipt.contractAddress === contract_address.toLowerCase()) {
      return receipt.from;
    }
  }

  return "not found";
};

// Find the deployer address of the smart contract
async function run() {
  const deployer = await findContractDeployer("0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D");
  console.log("deployer --> ", deployer);
}

run();