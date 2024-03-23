import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Provider } from '../utils/provider';
import { SectionDivider } from './SectionDivider';

const contractArtifact = require('../artifacts/contracts/artifact.json');
const contractAddress = require('../artifacts/contracts/address.json');

const StyledGreetingDiv = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 135px 2.7fr 1fr;
  grid-gap: 10px;
  place-self: center;
  align-items: center;
`;

const StyledActionButton = styled.button`
  width: 180px;
  height: auto;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
  place-self: center;
  padding: 0.5rem 1rem;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledTitle = styled(StyledLabel)`
  display: block; // Ensures the label is on a new line
  margin-bottom: 0.5rem; // Adds some space below the title
  font-size: 1.2rem; // Larger font size for titles
  color: #333; // Dark color for high visibility
`;

const StyledSubTitle = styled(StyledLabel)`
  display: block; // Ensures the label is on a new line
  margin: 0.25rem 0; // Adds some space around subtitles for better readability
  font-size: 1rem; // Slightly smaller font size than titles
  color: #666; // Lighter color to differentiate from titles
  font-weight: normal; // Normal weight for subtitles
`;

interface FlightInfo {
    isRegistered: boolean;
    status: string;
    timestamp: string;
    airlineAddress: string;
    flightNumber: string;
    destination: string;
    airlineName: string;
}

interface AirlineInfo {
    name: string;
    address: string;
    isRegistered: boolean;
    funding: number;
}

export function FlightSurety(): ReactElement {
    const { library, active } = useWeb3React<Provider>();
    const [signer, setSigner] = useState<ethers.Signer>();
    const [flightSuretyContract, setFlightSuretyApp] = useState<ethers.Contract>();
    const [flightSuretyContractAddr, setFlightSuretyAppAddr] = useState<string>('');
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [isPassenger, setIsPassenger] = useState<boolean>(false);
    const [isOperational, setIsOperational] = useState<boolean>(false);
    const [credit, setCredit] = useState<number>(0);
    const [isAirline, setIsAirline] = useState<boolean>(false);
    const [airlineInfo, setAirlineInfo] = useState<AirlineInfo>();
    const [airlines, setAirlines] = useState<AirlineInfo[]>([]);
    const [flights, setFlights] = useState<FlightInfo[]>([]);

    // Initialize signer
    useEffect(() => {
        if (!library) {
            setSigner(undefined);
        } else {
            setSigner(library.getSigner());
        }
    }, [library]);

    useEffect(() => {
        const initializeContract = async () => {
            if (!signer) return;
            const newContract = new ethers.Contract(contractAddress.address, contractArtifact.abi, signer);

            setFlightSuretyApp(newContract);
            setFlightSuretyAppAddr(newContract.address);

            const signerAddress = await signer.getAddress();
            const isOperational = await newContract.isOperational();
            const isOwner = await newContract.isOwner();

            const passengerAddresses = await newContract.getPassengerAddresses();
            const isPassenger = passengerAddresses.includes(signerAddress);

            setIsOwner(isOwner);
            setIsOperational(isOperational);
            setIsPassenger(isPassenger);

            if (!isOperational) {
                console.log('isOperational: ' + isOperational);
                return;
            }

            const airlineAddress = await signer.getAddress();
            const isAirline = await newContract.isAirlineRegistered(airlineAddress);
            console.log("isAirline: " + isAirline);
            if (isAirline) {
                await handleFetchAirline();
            }
            setIsAirline(isAirline);

            const airlines = await newContract.getAllAirlines();
            console.log("airlines: " + JSON.stringify(airlines));
            setAirlines(airlines);

            const rawFlights = await newContract.getFlights();
            console.log("flights: " + JSON.stringify(rawFlights));

            const statusCodeToStatus = (statusCode: number): string => {
                switch (statusCode) {
                    case 0: return 'Unknown';
                    case 10: return 'On Time';
                    case 20: return 'Late Airline';
                    case 30: return 'Late Weather';
                    case 40: return 'Late Technical';
                    case 50: return 'Late Other';
                    default: return 'Invalid Status';
                }
            };

            const formattedFlights: FlightInfo[] = rawFlights.map((flight: any) => ({
                isRegistered: flight.isRegistered,
                status: statusCodeToStatus(flight.statusCode),
                timestamp: flight.updatedTimestamp,
                airlineAddress: flight.airline,
                flightNumber: flight.flightNumber,
                destination: flight.destination,
                airlineName: flight.airlineName,
            }));

            setFlights(formattedFlights);
        };

        initializeContract();
    }, [signer]);


    const handleAction = async (event: MouseEvent<HTMLButtonElement>, action: Function) => {
        event.preventDefault();
        if (!signer) {
            window.alert('👽 Signer not available 👽');
            return;
        }
        try {
            await action(signer);
        } catch (error: any) {
            window.alert(`Error: ${error.message || "Unknown error occurred"}`);
        }
    };

    const promptForInput = (message: string, validation = (input: any) => !!input) => {
        let input;
        do {
            input = prompt(message);
        } while (!validation(input));
        return input;
    };

    // Handler to pause the contract
    async function handlePauseContract() {
        if (!flightSuretyContract) return;

        const isOwner = await flightSuretyContract.isOwner();
        if (!isOwner) {
            throw new Error('You are not the owner!');
        }

        const mode = await flightSuretyContract.isOperational();
        const input = promptForInput(`Set Operational Status (current: ${mode})`, (input) => ["0", "1"].includes(input));

        const status = parseInt(input!, 10);
        await flightSuretyContract.setOperatingStatus(status === 1);
    }

    async function handlefetchFlightStatus() {
        if (!flightSuretyContract) return;
        for (let flight of flights) {
            try {
                await flightSuretyContract.fetchFlightStatus(flight.airlineAddress, flight.flightNumber, flight.timestamp);
            } catch (error) {
                console.error(`Failed to fetch status for flight ${flight.flightNumber}:`, error);
            }
        }
    }

    async function handlePurchaseFlightInsurance() {
        if (!flightSuretyContract) {
            window.alert("Contract is not initialized.");
            return;
        }

        const airlineNameInput = promptForInput("Flight number");
        const amountInput = promptForInput("Amount (no more than 1 ETH)");

        // Check for empty inputs
        if (!amountInput || !airlineNameInput) {
            window.alert("Invalid inputs! Please provide both airline name and amount.");
            return;
        }

        // Validate the amount input
        const amount = parseFloat(amountInput);
        if (isNaN(amount) || amount <= 0 || amount > 1) {
            window.alert("Invalid amount! The amount should be a positive number and no more than 1 ETH.");
            return;
        }

        try {
            const transactionResponse = await flightSuretyContract.buy(
                airlineNameInput,
                { value: ethers.utils.parseEther(amount.toString()) }
            );

            // Wait for the transaction to be mined
            const receipt = await transactionResponse.wait();
            console.log("Transaction receipt:", receipt);

            window.alert(`Insurance purchased successfully! Transaction Hash: ${receipt.transactionHash}`);
        } catch (error: any) {
            console.error("Error purchasing flight insurance:", error);
            window.alert(`Failed to purchase insurance: ${error.message}`);
        }
    }

    async function handleGetAirlineVotes() {
        if (!flightSuretyContract) return;

        const input = promptForInput(`Airline address`);
        const votes = await flightSuretyContract.getAirlineVoters(input);

        console.log('votes: ' + votes);
    }

    async function handleShowPassengerCredit() {
        if (!flightSuretyContract) return;

        if (isPassenger) {
            let total = 0;
            for (const flight of flights) {
                const credit = await flightSuretyContract.getPassengerCredit(flight.flightNumber);
                total += credit;
            }
            let amountInEther = ethers.utils.formatEther(total);

            setCredit(Number(amountInEther));
            window.alert(`Your credit is: ${amountInEther} ETH`);
        } else {
            window.alert(`You are not passenger!`);
        }

    }

    async function handleClaimCredit() {
        if (!flightSuretyContract) return;

        if (isPassenger) {
            const flightNumber = promptForInput(`What is the flight number?`);
            await flightSuretyContract.pay(flightNumber);
        } else {
            window.alert(`You are not passenger!`);
        }

    }

    // Handler to register an airline
    async function handleRegisterAirline() {
        if (!flightSuretyContract || !signer) return;
        const airlineAddress = promptForInput('Enter the airline address', ethers.utils.isAddress);
        const airlineName = promptForInput('Enter the airline name');

        const contractWithSigner = flightSuretyContract.connect(signer);
        await contractWithSigner.registerAirline(airlineAddress, airlineName);

    }

    // Handler to register an airline
    async function handleRegisterFlight() {
        if (!flightSuretyContract || !signer) return;
        for (let airline of airlines) {
            try {
                const flightNumber = `FL-${1000}${airline.name}`;
                await flightSuretyContract.registerFlight(
                    flightNumber,
                    `City ${Math.ceil(Math.random() * 100)}`,
                    new Date(generateRandomFutureDate()).getTime(),
                    { gasLimit: 5000000 }
                );
                console.log("Flight Registered:", flightNumber);
            } catch (e) {
                console.error("Error in registerFlight:", e);
            }
        }
    }

    // Handler to fund an airline
    async function handleFundAirline() {
        if (!flightSuretyContract || !signer) return;
        const _10ETH = ethers.utils.parseEther('10');
        const contractWithSigner = flightSuretyContract.connect(signer);

        await contractWithSigner.fund({ value: _10ETH });
    }

    // Handler to vote for an airline
    async function handleVoteAirline() {
        if (!flightSuretyContract || !signer) return;
        const airlineAddress = promptForInput('Enter the airline address to vote for', ethers.utils.isAddress);

        const contractWithSigner = flightSuretyContract.connect(signer);
        await contractWithSigner.voteAirline(airlineAddress);
    }

    // Handler to fetch airline information
    async function handleFetchAirline() {

        if (!flightSuretyContract || !signer) return;

        const airlineAddress = await signer.getAddress();
        const contractWithSigner = flightSuretyContract.connect(signer);

        const [name, isRegistered, funding] = await contractWithSigner.getAirlineInfo(airlineAddress);
        const valueInEther = ethers.utils.formatUnits(funding.toString(), 'ether');

        setAirlineInfo({
            name: name,
            address: airlineAddress,
            isRegistered: isRegistered,
            funding: Number(valueInEther),
        });
    }

    const buttonProps = {
        disabled: !active || !flightSuretyContract,
        style: {
            cursor: !active || !flightSuretyContract ? 'not-allowed' : 'pointer',
            borderColor: !active || !flightSuretyContract ? 'unset' : 'blue'
        }
    };

    return (
        <>
            <StyledGreetingDiv>
                <StyledTitle>Contract Address:</StyledTitle>
                <div>{flightSuretyContractAddr || <em>{`<Contract not yet deployed>`}</em>}</div>
                <br></br>

                <StyledSubTitle>isOperational: {isOperational.toString()}</StyledSubTitle>
                <br></br>
                {isOwner && (<StyledTitle>Role: Owner</StyledTitle>)}
                <br></br>
                {isAirline && airlineInfo && (
                    <div>
                        <StyledTitle>Airline:</StyledTitle>
                        <StyledSubTitle>Name: {airlineInfo.name}</StyledSubTitle>
                        <StyledSubTitle>IsRegistered: {airlineInfo.isRegistered.toString()}</StyledSubTitle>
                        <StyledSubTitle>Funding: {airlineInfo.funding}</StyledSubTitle>
                    </div>
                )}
            </StyledGreetingDiv>


            {credit > 0 && (<StyledActionButton
                {...buttonProps} onClick={(e) => handleAction(e, handleClaimCredit)}>
                Claim Credit ({credit})
            </StyledActionButton>)}

            <StyledActionButton {...buttonProps} onClick={(e) => handleAction(e, handlePauseContract)}>
                Change the application mode
            </StyledActionButton>

            <SectionDivider />

            <StyledActionButton {...buttonProps} onClick={(e) => handleAction(e, handleRegisterAirline)}>
                Register Airline
            </StyledActionButton>

            <StyledActionButton {...buttonProps} onClick={(e) => handleAction(e, handleRegisterFlight)}>
                Registe Flight
            </StyledActionButton>

            <StyledActionButton {...buttonProps} onClick={(e) => handleAction(e, handleFundAirline)}>
                Fund Airline
            </StyledActionButton>

            <StyledActionButton {...buttonProps} onClick={(e) => handleAction(e, handleVoteAirline)}>
                Vote Airline
            </StyledActionButton>

            <StyledActionButton {...buttonProps} onClick={(e) => handleAction(e, handleFetchAirline)}>
                Fetch Airline Info
            </StyledActionButton>

            <StyledActionButton {...buttonProps} onClick={(e) => handleAction(e, handleGetAirlineVotes)}>
                Fetch Airline Votes
            </StyledActionButton>

            <StyledActionButton {...buttonProps} onClick={(e) => handleAction(e, handlefetchFlightStatus)}>
                Fetch Flight Status
            </StyledActionButton>

            <StyledActionButton {...buttonProps} onClick={(e) => handleAction(e, handlePurchaseFlightInsurance)}>
                Buy Flight Insurance
            </StyledActionButton>

            <StyledActionButton {...buttonProps} onClick={(e) => handleAction(e, handleShowPassengerCredit)}>
                Show Passenger Credit
            </StyledActionButton>

            <div>
                <h1>Airlines</h1>
                <ul>
                    {airlines.map((airline, index) => (
                        <li key={index}>
                            <p>Name: {airline.name}</p>
                            <p>Is Registered: {airline.isRegistered.toString()}</p>
                            <p>Funding: {ethers.utils.formatEther(airline.funding)} ETH</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h1>Flights</h1>
                <ul>
                    {flights.map((flight, index) => (
                        <li key={index}>
                            <p>Flight Number: {flight.flightNumber}</p>
                            <p>Airline Address: {flight.airlineAddress}</p>
                            <p>Airline Name: {flight.airlineName}</p>
                            <p>Timestamp: {new Date(flight.timestamp).toLocaleString()}</p>
                            <p>Destination: {flight.destination}</p>
                            <p>Status: {flight.status}</p>
                        </li>
                    ))}
                </ul>
            </div>


        </>
    );
}

const generateRandomFutureDate = () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 30)); // Random day within the next 30 days
    return futureDate.toISOString();
};

