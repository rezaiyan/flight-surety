// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
import { ethers } from "hardhat";
import path from "path";

async function main() {
  // This is just a convenience check
  const network = await ethers.provider.getNetwork();
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which " +
      "gets automatically created and destroyed every time. Use the Hardhat " +
      "option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer, airline] = await ethers.getSigners();

  // Deploy the contract
  const FlightSuretyApp = await ethers.getContractFactory("FlightSuretyApp");
  const flightSuretyApp = await FlightSuretyApp.deploy(airline);
  await flightSuretyApp.waitForDeployment();
  const address = await flightSuretyApp.getAddress();

  console.log("flightSuretyApp address:", address);

  // We also save the contract's artifacts and address in the frontend directory
  // saveFrontendFiles(supplyChain);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
