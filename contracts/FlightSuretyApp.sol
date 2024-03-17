// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./FlightSuretyData.sol";
import "hardhat/console.sol";

contract FlightSuretyApp is FlightSuretyData {
    struct Flight {
        bool isRegistered;
        uint8 statusCode;
        uint256 updatedTimestamp;
        address airline;
        string flightNumber;
        string destination;
        string airlineName;
    }
    struct Oracle {
        bool isRegistered;
        uint8[3] indexes;
    }

    struct ResponseInfo {
        address requester;
        bool isOpen;
        mapping(uint8 => address[]) responses;
    }

    uint8 private constant STATUS_CODE_UNKNOWN = 0;
    uint8 private constant STATUS_CODE_ON_TIME = 10;
    uint8 private constant STATUS_CODE_LATE_AIRLINE = 20;
    uint8 private constant STATUS_CODE_LATE_WEATHER = 30;
    uint8 private constant STATUS_CODE_LATE_TECHNICAL = 40;
    uint8 private constant STATUS_CODE_LATE_OTHER = 50;

    uint8 private constant MULTIPARTY_CONSENSUS_MIN_AIRLINES = 4;
    uint private constant MIN_FUNDING = 10 ether;

    uint256 public constant REGISTRATION_FEE = 1 ether;
    uint256 private constant MIN_RESPONSES = 3;

    uint8 private nonce = 0;
    address private contractOwner;
    bytes32[] private flightsInfo;

    mapping(bytes32 => Flight) private flights;
    mapping(bytes32 => ResponseInfo) private oracleResponses;
    mapping(address => Oracle) private oracles;

    event RegisteredAirline(address indexed airlineAddress, string name);
    event FlightRegistered(string flightNumber, address indexed airlineAddress);
    event FlightStatusInfo(
        address airline,
        string flight,
        uint256 timestamp,
        uint8 status
    );

    event OracleReport(
        address airline,
        string flight,
        uint256 timestamp,
        uint8 status
    );

    event OracleRequest(
        uint8 index,
        address airline,
        string flight,
        uint256 timestamp
    );

    constructor(address dataAddress) FlightSuretyData(dataAddress) {
        contractOwner = msg.sender;
    }

    function registerAirline(
        address _airlineAddress,
        string memory _name
    ) external requireIsOperational {
        require(_airlineAddress != address(0), "Invalid address");
        require(
            !isAirlineRegistered(_airlineAddress),
            "Airline is already registered"
        );
        uint airlinesCount = getAirlinesCount();
        if (airlinesCount <= MULTIPARTY_CONSENSUS_MIN_AIRLINES) {
            require(
                isAirlineRegistered(msg.sender),
                "Only existing airline may register a new airline"
            );
            require(
                getAirlineFunding(msg.sender) >= MIN_FUNDING,
                "Airline does not meet minimum funding to register another airline. Contract governance denied!!!"
            );
            addAirline(_airlineAddress, _name);
            emit RegisteredAirline(_airlineAddress, _name);
        } else {
            require(
                getVotes(_airlineAddress) >= airlinesCount / 2,
                "Need more than half votes to be registered."
            );
            addAirline(_airlineAddress, _name);
            emit RegisteredAirline(_airlineAddress, _name);
        }
    }

    function voteAirline(
        address _airlineAddress
    ) external requireIsOperational {
        require(
            getAirlineFunding(msg.sender) >= MIN_FUNDING,
            "Airline does not meet minimum funding to vote for another airline. Contract governance denied!!!"
        );
        require(_airlineAddress != address(0), "Invalid address");
        require(
            !isAirlineRegistered(_airlineAddress),
            "Airline is already registered"
        );
        address[] memory voters = getAirlineVoters(
            _airlineAddress
        );
        uint len = voters.length;
        bool voted = false;
        for (uint i = 0; i < len; i++) {
            if (voters[i] == msg.sender) {
                voted = true;
                break;
            }
        }
        require(!voted, "Caller has already voted for this airline");
        setVotes(_airlineAddress);
        setAirlineVoters(_airlineAddress, msg.sender);
    }


    function registerFlight(
        string memory flightNumber,
        string memory destination,
        uint timestamp
    ) external requireIsOperational {
        bytes32 key = keccak256(abi.encodePacked(flightNumber, msg.sender));
        require(!flights[key].isRegistered, "Flight is already registered.");
        require(
            getAirlineFunding(msg.sender) >= MIN_FUNDING,
            "Airline does not meet minimum funding to register a flight. Contract governance denied!!!"
        );

        flights[key] = Flight({
            isRegistered: true,
            statusCode: STATUS_CODE_ON_TIME,
            updatedTimestamp: timestamp,
            airline: msg.sender,
            flightNumber: flightNumber,
            destination: destination,
            airlineName: getAirlineName(msg.sender)
        });
        setFlightExistsStatus(flightNumber);
        flightsInfo.push(key);

        emit FlightRegistered(flightNumber, msg.sender);
    }

    function processFlightStatus(
        address airline,
        string memory flight,
        uint256 timestamp,
        uint8 statusCode
    ) internal requireIsOperational {
        bytes32 key = keccak256(abi.encodePacked(flight, airline));
        require(flights[key].isRegistered, "Flight is not registered.");

        flights[key].updatedTimestamp = timestamp;
        flights[key].statusCode = statusCode;
        if (statusCode == STATUS_CODE_LATE_AIRLINE) {
            creditInsurees(flight);
        }
    }

    function fetchFlightStatus(
        address airline,
        string memory flight,
        uint256 timestamp
    ) external requireIsOperational {
        require(
            getFlightExistsStatus(flight),
            "FLight does not exist"
        );
        uint8 index = getRandomIndex(msg.sender);

        bytes32 key = keccak256(
            abi.encodePacked(index, airline, flight, timestamp)
        );
        ResponseInfo storage newResponse = oracleResponses[key];
        newResponse.requester = msg.sender;
        newResponse.isOpen = true;

        emit OracleRequest(index, airline, flight, timestamp);
    }

    function viewFlightStatus(
        string memory flight,
        address airline
    ) external view requireIsOperational returns (uint8) {
        bytes32 key = keccak256(abi.encodePacked(flight, airline));
        return flights[key].statusCode;
    }

    function registerOracle() external payable {
        require(msg.value >= REGISTRATION_FEE, "Registration fee is required");

        uint8[3] memory indexes = generateIndexes(msg.sender);

        oracles[msg.sender] = Oracle({isRegistered: true, indexes: indexes});
    }

    function getMyIndexes() external view returns (uint8[3] memory) {
        require(
            oracles[msg.sender].isRegistered,
            "Not registered as an oracle"
        );

        return oracles[msg.sender].indexes;
    }

    function submitOracleResponse(
        uint8 index,
        address airline,
        string memory flight,
        uint256 timestamp,
        uint8 statusCode
    ) external {
        require(
            (oracles[msg.sender].indexes[0] == index) ||
                (oracles[msg.sender].indexes[1] == index) ||
                (oracles[msg.sender].indexes[2] == index),
            "Index does not match oracle request"
        );

        bytes32 key = keccak256(
            abi.encodePacked(index, airline, flight, timestamp)
        );
        require(
            oracleResponses[key].isOpen,
            "Flight or timestamp do not match oracle request"
        );

        oracleResponses[key].responses[statusCode].push(msg.sender);
        emit OracleReport(airline, flight, timestamp, statusCode);
        if (
            oracleResponses[key].responses[statusCode].length >= MIN_RESPONSES
        ) {
            emit FlightStatusInfo(airline, flight, timestamp, statusCode);
            processFlightStatus(airline, flight, timestamp, statusCode);
        }
    }

    function generateIndexes(
        address account
    ) internal returns (uint8[3] memory) {
        uint8[3] memory indexes;
        indexes[0] = getRandomIndex(account);

        indexes[1] = indexes[0];
        while (indexes[1] == indexes[0]) {
            indexes[1] = getRandomIndex(account);
        }

        indexes[2] = indexes[1];
        while ((indexes[2] == indexes[0]) || (indexes[2] == indexes[1])) {
            indexes[2] = getRandomIndex(account);
        }

        return indexes;
    }

    function getRandomIndex(address account) internal returns (uint8) {
        uint8 maxValue = 10;

        uint8 random = uint8(
            uint256(
                keccak256(
                    abi.encodePacked(blockhash(block.number - nonce++), account)
                )
            ) % maxValue
        );

        if (nonce > 250) {
            nonce = 0;
        }

        return random;
    }

    function getFlights() public view returns (Flight[] memory) {
        uint len = flightsInfo.length;
        Flight[] memory allFlights = new Flight[](len);

        for (uint256 i = 0; i < len; i++) {
            bytes32 key = flightsInfo[i];
            allFlights[i] = flights[key];
        }

        return allFlights;
    }
}
