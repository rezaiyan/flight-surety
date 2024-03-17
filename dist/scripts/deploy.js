"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
const hardhat_1 = require("hardhat");
const path_1 = __importDefault(require("path"));
async function main() {
    // This is just a convenience check
    const network = await hardhat_1.ethers.provider.getNetwork();
    if (network.name === "hardhat") {
        console.warn("You are trying to deploy a contract to the Hardhat Network, which " +
            "gets automatically created and destroyed every time. Use the Hardhat " +
            "option '--network localhost'");
    }
    // ethers is available in the global scope
    const [deployer, airline] = await hardhat_1.ethers.getSigners();
    // Deploy the contract
    const FlightSuretyApp = await hardhat_1.ethers.getContractFactory("FlightSuretyApp");
    const flightSuretyApp = await FlightSuretyApp.deploy(airline);
    await flightSuretyApp.waitForDeployment();
    const address = await flightSuretyApp.getAddress();
    console.log("flightSuretyApp address:", address);
    // We also save the contract's artifacts and address in the frontend directory
    // saveFrontendFiles(supplyChain);
}
function saveFrontendFiles(flightSuretyApp) {
    const fs = require("fs");
    const contractsDir = path_1.default.join(__dirname, "..", "frontend", "src", "contracts");
    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir, { recursive: true });
    }
    fs.writeFileSync(path_1.default.join(contractsDir, "contract-address.json"), JSON.stringify({ FlightSuretyApp: flightSuretyApp.address }, undefined, 2));
    const FlightSuretyAppArtifact = require("../artifacts/contracts/FlightSuretyApp.sol/FlightSuretyApp.json");
    fs.writeFileSync(path_1.default.join(contractsDir, "FlightSuretyApp.json"), JSON.stringify(FlightSuretyAppArtifact, null, 2));
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
