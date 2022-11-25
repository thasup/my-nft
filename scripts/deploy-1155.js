const hre = require("hardhat");

async function main() {

  const factory = await hre.ethers.getContractFactory("AwesomeGame");
  const [owner] = await hre.ethers.getSigners();
  const contract = await factory.deploy();

  await contract.deployed();
  console.log("Contract deployed to: ", contract.address);
  console.log("Contract deployed by: ", owner.address, "\n");
  console.log("Tokens have been minted successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });