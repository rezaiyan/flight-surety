# FlightSurety

Here you can find outlines key information and provides instructions for setting up and interacting with the FlightSurety Project, a decentralized application (DApp) built on the Ethereum blockchain. FlightSurety is designed to automate flight insurance, leveraging smart contracts for operational integrity and security.

## Ethereum Contract and Transaction Links

Explore the FlightSurety smart contracts and transactions via these links on the Sepolia testnet:

- **Deployment Transaction**: [View Here](TBD)
- **Smart Contract Address**: [View Here](TBD)

## About FlightSurety

FlightSurety leverages the Ethereum blockchain to bring transparency and trust into flight insurance. It allows passengers to purchase insurance for their flights and receive automated payouts if their flights are delayed due to airline faults.

### Key Features and Roles

- **Smart Contract Logic**: Separated into data persistence and application logic for modularity and upgradeability.
- **Oracle Simulation**: External server application simulates oracle behavior for fetching and updating flight status information.
- **User Interaction**: Passengers can purchase flight insurance via a user-friendly DApp interface.

## Setting Up the Project

Follow these steps to set up and run the FlightSurety DApp:

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   ```

2. **Install Dependencies**:
   - Navigate to the project's root directory:
     ```
     cd flight-surety
     ```
   - Install the required npm packages:
     ```
     npm install
     ```

3. **Compile Smart Contracts**:
   ```
   npx hardhat compile
   ```

4. **Run Tests**:
   - Ensure smart contract integrity through comprehensive tests:
     ```
     npx hardhat test
     ```

5. **Deploy Contracts**:
   - Deploy the smart contracts to a local development network or the Sepolia testnet. Update the deployment script with the desired network:
     ```
     npx hardhat run scripts/deploy.js --network <network-name>
     ```

6. **Launch the DApp**:
   - Navigate to the DApp's frontend directory and start the application:
     ```
     cd frontend
     npm start
     ```

## Using the FlightSurety DApp

- **Purchasing Insurance**: Passengers can select flights and purchase insurance through the DApp interface.
- **Checking Flight Status**: The Oracle server application simulates real-world flight information updates, triggering automatic insurance payouts as applicable.
- **Receiving Payouts**: In the event of a flight delay due to airline fault, insured passengers are automatically credited with payouts, which they can withdraw through the DApp.

## Development Environment

This project utilizes Hardhat as the primary development framework, given its powerful testing, debugging, and deployment features. Notably, Solidity version 0.8.20 is used for smart contract development, eliminating the need for the SafeMath library due to built-in overflow and underflow checks.

## Contributing

Contributions to the FlightSurety project are welcome. When contributing, please adhere to the following guidelines:
- Ensure code modifications are well-tested.
- Follow the existing coding style and practices.
- Update documentation as necessary to reflect changes.

Enjoy exploring and contributing to the FlightSurety project. For any queries or assistance, please reach out through the project's issue tracker or discussion forums.