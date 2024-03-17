import { ethers } from 'ethers';
import Web3 from 'Web3';
import fs from 'fs';
import path from 'path';
const FlightSuretyAppArtifact = await import("../artifacts/contracts/FlightSuretyApp.sol/FlightSuretyApp.json", {
    assert: { type: "json" }
});

async function main() {
    console.log("testLog1");

    let web3 = new Web3();
    const provider = new Web3.providers.WebsocketProvider('http://localhost:8545');
    const signer = web3.eth.accounts[0];

    const FlightSuretyAppFactory = new ethers.ContractFactory(
        FlightSuretyAppArtifact.abi,
        FlightSuretyAppArtifact.bytecode,
        signer
    );

    const firstAirline = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
    const flightSuretyApp = await FlightSuretyAppFactory.deploy(firstAirline);
    await flightSuretyApp.deployed();

    console.log("Contract deployed to:", flightSuretyApp.address);
    console.log("testLog2");

    let config = {
        localhost: {
            url: 'http://localhost:8545',
            appAddress: flightSuretyApp.address
        }
    };
    console.log("testLog3");

    try {
        const configPath = path.resolve(__dirname, '../config.json');
        await fs.promises.writeFile(configPath, JSON.stringify(config, null, '\t'), 'utf-8');
        console.log("Configuration written to file");
    } catch (error) {
        console.error('Error writing configuration files:', error);
    }
}

main().catch(error => {
    console.error("Error deploying contract:", error);
});
