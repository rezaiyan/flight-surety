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
        console.log("UpdateOperatingStatus payload: " + mode);
    });

    flightSuretyApp.on("FlightRegistered", (flightNumber, sender) => {
        console.log("FlightRegistered payload: " + flightNumber);
    });

    flightSuretyApp.on("FlightStatusInfo", (airline, flight, timestamp, statusCode) => {
        console.log(`--FlightStatusInfo--`);
        console.log(`airline: ${airline},flight: ${flight},timestamp: ${timestamp},airline: ${statusCode},`);
        console.log(`--FlightStatusInfo--`);
    });

    flightSuretyApp.on("OracleRequest", async (index, airline, flight, timestamp) => {
        let payload = {
            index: index,
            airline: airline,
            flight: flight,
            timestamp: timestamp,
        };

        let statusCodeList = [0, 10, 20, 30, 40, 50];
        let statusCode = statusCodeList[Math.floor(Math.random() * statusCodeList.length)];

        let matchingOracles = registeredOracles.filter(oracle => oracle.indexes.includes(index));
        console.log(`await newContract.getFlightExistsStatus(${flight}): ` + await flightSuretyApp.getFlightExistsStatus(flight));

        for (let oracle of matchingOracles) {
            try {
                const oracleSigner = provider.getSigner(oracle.address);

                console.log(`--timestamp--: ${payload.timestamp}`);
                const tx = await flightSuretyApp.connect(oracleSigner).submitOracleResponse(
                    payload.index, payload.airline, payload.flight, payload.timestamp, statusCode, { gasLimit: 5000000 }
                );
                await tx.wait();
                console.log(`--SUCCESS--`);
                console.log(`Oracle response submitted: ${oracle.address} with status code ${statusCode}`);
                console.log(`index: ${index}, airline: ${airline}, flight: ${flight}, timestamp: ${timestamp}, statusCode: ${statusCode}`);
                console.log(`--SUCCESS--`);
            } catch (error) {

                console.log(`--Failed--`);
                console.error(`Error submitting oracle response from ${oracle.address}: ${error.message}`);
                console.log(`index: ${index}, airline: ${airline}, flight: ${flight}, timestamp: ${timestamp}, statusCode: ${statusCode}`);
                console.log(`--Failed--`);
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
            const balance = await provider.getBalance(account);
            console.log(`Oracle balance: ${balance}`);
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
    registerOracles(oracleAccounts.slice(10, 30));
}

main().catch(console.error);
