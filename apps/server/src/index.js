import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import deployedContractAddress from '../../../artifacts/contracts/address.json' assert { type: 'json' };
import artifact from '../../../artifacts/contracts/artifact.json' assert { type: 'json' };

dotenv.config();

// Express App Setup
const app = express();
app.use(cors());
app.use(express.json());

const providerURL = process.env.PROVIDER_URL;
const privateKey = process.env.PRIVATE_KEY;

async function deployContract() {
    const provider = new ethers.providers.JsonRpcProvider(providerURL);
    const signer = new ethers.Wallet(privateKey, provider);

    const flightSuretyApp = new ethers.Contract(
        deployedContractAddress.address,
        artifact.abi,
        signer
    );
    console.log(`Connected to contract at address: ${flightSuretyApp.address}`);

    flightSuretyApp.on("OracleRequest", (index, airline, flight, timestamp) => {
        let payload = {
            index: index,
            airline: airline,
            flight: flight,
            timestamp: timestamp,
        };
        console.log("Oracle requests payload: " + JSON.stringify(payload));
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
