import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import ContractArtifact from '../../../artifacts/contracts/FlightSuretyApp.sol/FlightSuretyApp.json' assert { type: 'json' };

dotenv.config();

// Express App Setup
const app = express();
app.use(cors());
app.use(express.json());

const providerURL = process.env.PROVIDER_URL;
const privateKey = process.env.PRIVATE_KEY;
const signerAddress = process.env.SIGNER_ADDRESS;
let flightSuretyApp;

async function deployContract() {
    const provider = new ethers.providers.JsonRpcProvider(providerURL);
    const signer = new ethers.Wallet(privateKey, provider);
    const contractFactory = new ethers.ContractFactory(
        ContractArtifact.abi,
        ContractArtifact.bytecode,
        signer
    );
    flightSuretyApp = await contractFactory.deploy(signerAddress);
    await flightSuretyApp.deployed();
    console.log(`Contract deployed to address: ${flightSuretyApp.address}`);

    flightSuretyApp.on("OracleRequest", (index, airline, flight, timestamp)=>{
        let payload = {
            index: index,
            airline: airline,
            flight: flight,
            timestamp: timestamp,
        };
        console.log("oracle requests payload: " + payload);
    });
}

function setupServer() {
    app.get('/', (req, res) => {
        res.send('Hello World\n');
    });

    const port = 1337;
    app.listen(port, () => {
        console.log(`Server running at http://127.0.0.1:${port}/`);
    });

}

async function main() {
    setupServer();
    await deployContract();
}

main().catch(console.error);
