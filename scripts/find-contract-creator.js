require('dotenv').config();
const axios = require('axios');

const API_URL = process.env.API_URL;
// const API_URL = "https://eth-mainnet.g.alchemy.com/v2/cIOn7W3o1v8U_OL6HhOxDqU2-Z-mj1OB";

async function getBlockNum() {
  // const url = "https://eth-mainnet.g.alchemy.com/v2/demo"

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
  });

  console.log("response -->", response.data);
  
  const res = response.data.result;
  console.log("res -->", res);

  console.log(typeof res === "string");

  return response.data.result;
};

async function getCode(contract_address, block_num) {
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
  });

  console.log("response 2 -->", response.data);

  return response.data.result;
};

async function getTxReceipt(block_num) {
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
  });

  console.log("response 3 -->", response.data);

  return response.data.result.receipts;
};

// Returns index of x in arr if present, else -1
async function binarySearch(arr, low, high, contract_address) {
  // Check base case
  if (high >= low) {
    let mid = parseInt((high + low)/2);

    console.log("===");
    console.log({high, mid, low});
    
    if (high === low) { 
      return low;
    }

    // If element is smaller than mid, then it can only
    // be present in left subarray
    if (await getCode(contract_address, mid.toString(16)) !== "0x") {
      return binarySearch(arr, low, mid, contract_address)

    // Else the element can only be present in right subarray
    } else if (await getCode(contract_address, mid.toString(16)) === "0x") {
      return await binarySearch(arr, mid+1, high, contract_address)
    }
  } else {
    // Element is not present in the array
    return -1
  }
};

async function find_contract_deployer(contract_address) {
  let currNum = await getBlockNum();

  console.log("currNum", currNum);
  const arr = Array.from(Array(parseInt(currNum) + 1).keys());

  console.log("arr length", arr.length);

  // Function call
  const result_block_num = await binarySearch(arr, 0, arr.length-1, contract_address);
  const receipts = (await getTxReceipt(result_block_num));

  console.log("receipts length", receipts.length);

  for (let receipt of receipts) {
    if ((receipt["contractAddress"]) === contract_address.toLowerCase()) {
      return(receipt["from"], result_block_num);
    }
  }
};

// Find the deployer address of the smart contract
find_contract_deployer("0xfd6E1B3666a073eccDd5379934F344D7e5f89930");


async function run() {
  const block = await getBlockNum();
  // block.toLocaleString()
  // console.log(typeof +block === "string");
  // getCode("0xfd6E1B3666a073eccDd5379934F344D7e5f89930", +block);
  const arr = Array.from(Array(parseInt(block) + 1).keys());

  console.log("arr --> ", arr);

  // await getTxReceipt(block);
  await binarySearch(arr, 0, arr.length - 1, "0xfd6E1B3666a073eccDd5379934F344D7e5f89930");
}

run();
// getBlockNum();

