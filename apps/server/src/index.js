//Oracle functionality is implemented in the server app.
import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import deployedContractAddress from './artifacts/contracts/address.json' assert { type: 'json' };
import artifact from './artifacts/contracts/artifact.json' assert { type: 'json' };

class Oracle {
    constructor(address, indexes) {
        this.address = address;
        this.indexes = indexes;
    }
}
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 1337;
const providerURL = process.env.PROVIDER_URL;
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(providerURL);
const owner = new ethers.Wallet(privateKey, provider);
const flightSuretyApp = new ethers.Contract(
    deployedContractAddress.address,
    artifact.abi,
    owner
);
const registeredOracles = [];

function setupContract() {
    console.log(`Connected to contract at address: ${flightSuretyApp.address}`);

    flightSuretyApp.on("UpdateOperatingStatus", (mode) => {
        console.log("UpdateOperatingStatus mode: " + mode);
    });

    flightSuretyApp.on("FlightRegistered", (flightNumber, sender) => {
        console.log("FlightRegistered payload: " + flightNumber);
    });

    flightSuretyApp.on("FlightStatusInfo", (airline, flight, timestamp, statusCode) => {
        console.log(`airline: ${airline},flight: ${flight},timestamp: ${timestamp},airline: ${statusCode},`);
    });

    //Update flight status requests from client Dapp result in OracleRequest event emitted by Smart Contract 
    //that is captured by server (displays on console and handled in code)
    flightSuretyApp.on("OracleRequest", async (index, airline, flight, timestamp) => {
        let payload = {
            index: index,
            airline: airline,
            flight: flight,
            timestamp: timestamp,
        };
        console.log(`OracleRequest received`);
        //Server will loop through all registered oracles, identify those oracles for which the OracleRequest event applies,
        //and respond by calling into FlightSuretyApp contract with random status code of
        //Unknown (0), On Time (10) or Late Airline (20), Late Weather (30), Late Technical (40), or Late Other (50)
        let statusCodeList = [0, 10, 20, 30, 40, 50];
        let statusCode = statusCodeList[Math.floor(Math.random() * statusCodeList.length)];
        console.log(`New status code: ${statusCode}`);

        let matchingOracles = registeredOracles.filter(oracle => oracle.indexes.includes(index));

        for (let oracle of matchingOracles) {
            try {
                const oracleSigner = provider.getSigner(oracle.address);
                const tx = await flightSuretyApp.connect(oracleSigner).submitOracleResponse(
                    payload.index, payload.airline, payload.flight, payload.timestamp, statusCode, { gasLimit: 5000000 }
                );
                await tx.wait();
                console.log(`Oracle response submitted: ${oracle.address} with status code ${statusCode}`);
            } catch (error) {
                console.error(`Error submitting oracle response from ${oracle.address}: ${error.message}`);
            }
        }
    });
}
function setupServer() {

    app.get('/', (req, res) => res.send('Flight Surety Server\n'));
    app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}/`));
}

async function registerOracles(accounts) {
    try {
        const registrationPromises = accounts.map(async (account, index) => {
            const app = flightSuretyApp.connect(provider.getSigner(account));
            try {
                const _1ETH = ethers.utils.parseEther('1');

                await app.registerOracle({ value: _1ETH, gasLimit: 5000000 });
                const indexes = await app.getMyIndexes();
                console.log(`[${indexes}] (${index}) Oracle Account Registered: ${account}`);
                registeredOracles.push(new Oracle(account.toString(), indexes));
                return indexes;

            } catch (err) {
                console.error(`Error registering oracle ${index}: ${err.message}`);
                return null; // Continue processing other accounts even if one fails
            }
        });

        const results = await Promise.all(registrationPromises);
        return results.filter(result => result !== null);
    } catch (err) {
        throw err;
    }
}

async function main() {
    setupContract();
    setupServer();
    const oracleAccounts = await provider.listAccounts();
    //Upon startup, 20+ oracles are registered and their assigned indexes are persisted in memory
    registerOracles(oracleAccounts.slice(10, 30));
}

main().catch(console.error);
