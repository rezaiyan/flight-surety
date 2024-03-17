// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlightSuretyData {
    struct Airline {
        string name;
        bool isRegistered;
        uint funding;
    }

    struct Passenger {
        address passengerAddress;
        mapping(string => uint) flightNoToInsuranceAmt;
        uint credit;
    }

    uint public constant INSURANCE_PRICE_LIMIT = 1 ether;

    address private contractOwner;
    uint private airlinesCount;
    bool private operational = true;
    address[] private passengerAddresses;

    mapping(address => Airline) airlines;
    mapping(address => uint) private votes;
    mapping(address => address[]) private airlineVoters;
    mapping(address => uint) authorizedCallers;
    mapping(string => bool) flightExists;
    mapping(bytes32 => Passenger) private passengers;

    event AuthorizedContract(address indexed addr);
    event DeAuthorizedContract(address indexed addr);
    event InsuranceBought(
        address indexed passenger,
        string flightNumber,
        uint amount
    );
    event CreditWithdrawn(
        address indexed passenger,
        string flightNumber,
        uint amount
    );

    constructor(address _airlineAddress) {
        contractOwner = msg.sender;
        airlines[_airlineAddress] = Airline({
            name: "Genesis Air",
            isRegistered: true,
            funding: 0
        });
        authorizedCallers[_airlineAddress] = 1;
        authorizedCallers[contractOwner] = 1;
        airlinesCount++;
    }

    modifier requireIsOperational() {
        require(operational, "Contract is currently not operational");
        _;
    }

    modifier requireContractOwner() {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    modifier requireIsAuthorizedCaller() {
        require(
            authorizedCallers[msg.sender] == 1,
            "Caller is not authorized: "
        );
        _;
    }

    function isOperational() public view returns (bool) {
        return operational;
    }

    function setOperatingStatus(bool mode) external requireContractOwner {
        operational = mode;
    }

    function authorizeCallers(
        address _address
    ) external requireContractOwner requireIsOperational {
        authorizedCallers[_address] = 1;
        emit AuthorizedContract(_address);
    }

    function deAuthorizeContract(
        address _address
    ) external requireContractOwner requireIsOperational {
        delete authorizedCallers[_address];
        emit DeAuthorizedContract(_address);
    }

    function addAirline(
        address _airlineAddress,
        string memory _name
    ) public requireIsOperational requireIsAuthorizedCaller {
        airlines[_airlineAddress] = Airline({
            name: _name,
            isRegistered: true,
            funding: 0
        });
        airlinesCount++;
    }

    function buy(
        string memory flightNumber
    ) external payable requireIsOperational {
        require(flightExists[flightNumber], "Flight does not exist");
        require(
            msg.sender == tx.origin,
            "Contracts cannot call this function."
        );
        require(msg.value > 0, "Amount needs to be greater than 0");
        require(
            msg.value <= 1 ether,
            "Cannot buy more than 1 ETH of insurance"
        );

        bytes32 key = keccak256(abi.encodePacked(flightNumber, msg.sender));
        require(
            passengers[key].passengerAddress == address(0),
            "Already insured for this flight"
        );

        // Add new passenger insurance
        Passenger storage newPassenger = passengers[key];
        newPassenger.passengerAddress = msg.sender;
        newPassenger.credit = 0;
        newPassenger.flightNoToInsuranceAmt[flightNumber] = msg.value;
        passengerAddresses.push(msg.sender);

        // Emit event for insurance purchase
        emit InsuranceBought(msg.sender, flightNumber, msg.value);
    }

    function getCreditToPay(
        string memory flightNumber
    ) external view requireIsOperational returns (uint256) {
        bytes32 key = keccak256(abi.encodePacked(flightNumber, msg.sender));
        return passengers[key].credit;
    }

    function creditInsurees(
        string memory flightNumber
    ) public requireIsOperational {
        uint len = passengerAddresses.length;
        for (uint i = 0; i < len; i++) {
            bytes32 key = keccak256(
                abi.encodePacked(flightNumber, passengerAddresses[i])
            );

            if (passengers[key].passengerAddress != address(0)) {
                Passenger storage newPassenger = passengers[key];

                uint currentCredit = newPassenger.credit;
                uint payedInsurance = newPassenger.flightNoToInsuranceAmt[
                    flightNumber
                ];
                newPassenger.flightNoToInsuranceAmt[flightNumber] = 0;
                newPassenger.credit =
                    currentCredit +
                    (payedInsurance + payedInsurance / 2);
            }
        }
    }

    function pay(string memory flightNumber) external requireIsOperational {
        require(
            msg.sender == tx.origin,
            "Contracts cannot call this function."
        );
        bytes32 key = keccak256(abi.encodePacked(flightNumber, msg.sender));
        require(passengers[key].credit > 0, "No credit to be withdrawn");
        uint credit = passengers[key].credit;
        require(
            address(this).balance > credit,
            "The contract does not have enough funds to pay the credit"
        );
        passengers[key].credit = 0;
        payable(msg.sender).transfer(credit);

        emit CreditWithdrawn(msg.sender, flightNumber, credit);
    }

    function fund() public payable requireIsOperational {
        require(airlines[msg.sender].isRegistered, "Airline is not registered");
        airlines[msg.sender].funding += msg.value;
    }

    function getFlightKey(
        address airline,
        string memory flight,
        uint256 timestamp
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    receive() external payable {
        fund();
    }

    function isAirlineRegistered(
        address _airlineAddress
    ) public view requireIsOperational returns (bool) {
        return airlines[_airlineAddress].isRegistered;
    }

    function getAirlineFunding(
        address _airlineAddress
    ) public view requireIsOperational returns (uint) {
        return airlines[_airlineAddress].funding;
    }

    function setAirlineFunding(
        address _airlineAddress,
        uint amount
    ) public requireIsOperational {
        airlines[_airlineAddress].funding += amount;
    }

    function getAirlinesCount()
        public
        view
        requireIsOperational
        returns (uint)
    {
        return airlinesCount;
    }

    function getVotes(
        address _airlineAddress
    ) public view requireIsOperational returns (uint) {
        return votes[_airlineAddress];
    }

    function setVotes(address _airlineAddress) public {
        votes[_airlineAddress] += 1;
    }

    function getAirlineVoters(
        address _airlineAddress
    ) public view requireIsOperational returns (address[] memory) {
        return airlineVoters[_airlineAddress];
    }

    function setAirlineVoters(
        address _airlineAddress,
        address voter
    ) public requireIsOperational {
        airlineVoters[_airlineAddress].push(voter);
    }

    function getBalance() public view requireIsOperational returns (uint) {
        return address(this).balance;
    }

    function getAirlineName(
        address _airlineAddress
    ) public view requireIsOperational returns (string memory) {
        return airlines[_airlineAddress].name;
    }

    function getAirlineInfo(
        address _airlineAddress
    )
        public
        view
        requireIsOperational
        returns (string memory name, bool isRegistered, uint funding)
    {
        Airline memory airline = airlines[_airlineAddress];
        name = airline.name;
        isRegistered = airline.isRegistered;
        funding = airline.funding;
    }

    function setFlightExistsStatus(
        string memory flightNumber
    ) public requireIsOperational {
        flightExists[flightNumber] = true;
    }

    function getFlightExistsStatus(
        string memory flightNumber
    ) public view requireIsOperational returns (bool) {
        return flightExists[flightNumber];
    }

    function getPassengerAddresses()
        public
        view
        requireIsOperational
        returns (address[] memory)
    {
        return passengerAddresses;
    }
}
