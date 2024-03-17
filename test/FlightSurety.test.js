import { expect } from 'chai';
import { ethers } from 'hardhat';
describe('FlightSuretyApp', function () {
    let flightSuretyApp;
    let deployer;
    let airlines = [];
    let oracles = [];
    let passengerAccount;
    beforeEach(async function () {
        let signers = await ethers.getSigners();
        deployer = signers[0];
        passengerAccount = signers[1];
        let airlineSigners = signers.slice(2, 7);
        let oracleSigners = signers.slice(8, 20);
        airlines = await Promise.all(airlineSigners.map(signer => ({
            signer: signer,
            address: signer.address,
        })));
        const FlightSuretyApp = await ethers.getContractFactory('FlightSuretyApp');
        flightSuretyApp = await FlightSuretyApp.deploy(airlines[0].address);
        await flightSuretyApp.connect(airlines[0].signer).fund({ value: ethers.parseEther('10') });
        oracles = await Promise.all(oracleSigners.map(signer => ({
            signer: signer,
            address: signer.address
        })));
    });
    it('Should return true for operational status initially', async function () {
        expect(await flightSuretyApp.isOperational()).to.equal(true);
    });
    describe('FlightSuretyApp Airline Registration', function () {
        const registerAndFundAirline = async (airlineToRegister, registeredBy) => {
            const airlineAddress = airlineToRegister.address;
            await flightSuretyApp.connect(registeredBy.signer).registerAirline(airlineAddress, `${airlineAddress} Airline`);
            await flightSuretyApp.connect(airlineToRegister.signer).fund({ value: ethers.parseEther('10') });
            return flightSuretyApp.isAirlineRegistered(airlineToRegister.address);
        };
        const expectAirlineRegistration = async (airline, expected, message) => {
            const isRegistered = await flightSuretyApp.isAirlineRegistered(airline.address);
            expect(isRegistered).to.equal(expected, message);
        };
        it('registers a second airline by an already registered airline', async function () {
            await registerAndFundAirline(airlines[1], airlines[0]);
            await expectAirlineRegistration(airlines[1], true, "Second airline should be registered successfully.");
        });
        it('prevents non-airlines from registering an airline', async function () {
            try {
                const unknownAirline = {
                    signer: deployer,
                    address: deployer.address,
                };
                await registerAndFundAirline(airlines[2], unknownAirline);
                expect.fail("Should have thrown an error since deployer is not a registered airline.");
            }
            catch (error) {
                expect(error.message).to.include('Only existing airline may register a new airline');
            }
        });
        it('reaches consensus when required number of airlines vote', async function () {
            // Simplify the voting process
            const voteForAirline = async (voter, targetAirlineAddress) => {
                await flightSuretyApp.connect(voter.signer).voteAirline(targetAirlineAddress);
            };
            // Register and fund initial airlines for setup
            await Promise.all(airlines.slice(1, 4).map(airline => registerAndFundAirline(airline, airlines[0])));
            // Cast votes for the fifth airline
            await Promise.all([
                voteForAirline(airlines[0], airlines[4].address),
                voteForAirline(airlines[1], airlines[4].address),
            ]);
            // After receiving enough votes, register and fund the fifth airline
            await registerAndFundAirline(airlines[4], airlines[0]);
            // Verify registration
            await expectAirlineRegistration(airlines[4], true, "Fifth airline should be registered successfully after reaching consensus.");
        });
    });
    describe('FlightSuretyApp Flight and Insurance Management', function () {
        const flight = "AUS101";
        const destination = "TEH";
        const registerFlight = async () => {
            await flightSuretyApp.connect(airlines[0].signer).registerFlight(flight, destination, Math.floor(Date.now() / 1000));
        };
        const buyInsurance = async (amount) => {
            await flightSuretyApp.connect(passengerAccount).buy(flight, { value: ethers.parseEther(amount) });
        };
        it('allows an airline to register a flight', async function () {
            await registerFlight();
            const exists = await flightSuretyApp.getFlightExistsStatus(flight);
            expect(exists).to.equal(true);
        });
        it('prevents a passenger from purchasing insurance with more than 1 ETH', async function () {
            await registerFlight();
            try {
                await buyInsurance('2');
                expect.fail("Should not allow insurance purchase over 1 ETH");
            }
            catch (error) {
                expect(error.message).to.include('Cannot buy more than 1 ETH of insurance');
            }
        });
        it('credits insurees if flight is late due to airline fault', async function () {
            await registerFlight();
            await buyInsurance('1');
            await flightSuretyApp.creditInsurees(flight);
            const credit = await flightSuretyApp.connect(passengerAccount).getCreditToPay(flight);
            expect(credit).to.equal(ethers.parseEther('1.5'));
        });
        it('allows passengers to withdraw funds as credit after flight delay', async function () {
            await registerFlight();
            await buyInsurance('1');
            // Simulate flight delay and insurance credit
            await flightSuretyApp.creditInsurees(flight);
            // Withdraw the credited amount
            await flightSuretyApp.connect(passengerAccount).pay(flight);
            const remainingCredit = await flightSuretyApp.connect(passengerAccount).getCreditToPay(flight);
            expect(remainingCredit).to.equal(ethers.parseEther('0'));
        });
    });
    describe("FlightSuretyApp Oracle Logic", function () {
        const flight = "AUS101";
        const destination = "TEH";
        const timestamp = 1;
        const registerFlight = async () => {
            await flightSuretyApp.connect(airlines[0].signer).registerFlight(flight, destination, timestamp);
        };
        it("should allow oracles to register", async function () {
            const fee = await flightSuretyApp.REGISTRATION_FEE();
            await flightSuretyApp.connect(oracles[0].signer).registerOracle({ value: fee });
            const indexes = await flightSuretyApp.connect(oracles[0].signer).getMyIndexes();
            expect(indexes.length).to.equal(3);
        });
        it("should emit OracleRequest event on fetchFlightStatus", async function () {
            registerFlight();
            await expect(flightSuretyApp.fetchFlightStatus(airlines[0].address, flight, timestamp))
                .to.emit(flightSuretyApp, "OracleRequest")
                .withArgs(Number(9), airlines[0].address, flight, timestamp);
        });
        it("oracles can submit responses and process flight status", async function () {
            const STATUS_CODE_LATE_AIRLINE = 20;
            const airline = airlines[0].address;
            const fee = await flightSuretyApp.REGISTRATION_FEE();
            await registerFlight();
            for (const oracle of oracles) {
                await flightSuretyApp.connect(oracle.signer).registerOracle({ value: fee });
            }
            let requestIndex;
            flightSuretyApp.on("OracleRequest", (index, airlin, flight, timestamp) => {
                requestIndex = index;
            });
            await flightSuretyApp.fetchFlightStatus(airline, flight, timestamp);
            let responseSubmitted = 0;
            for (const oracle of oracles) {
                const oracleIndexes = await flightSuretyApp.connect(oracle.signer).getMyIndexes();
                if (oracleIndexes.includes(requestIndex)) {
                    await flightSuretyApp.connect(oracle.signer).submitOracleResponse(requestIndex, airline, flight, timestamp, STATUS_CODE_LATE_AIRLINE);
                    responseSubmitted++;
                    if (responseSubmitted > 3) {
                        break; // Stop after successfully submitting 3 responses
                    }
                }
            }
            const flightStatus = await flightSuretyApp.viewFlightStatus(flight, airline);
            expect(flightStatus.toString()).to.equal(STATUS_CODE_LATE_AIRLINE.toString());
        });
    });
});
