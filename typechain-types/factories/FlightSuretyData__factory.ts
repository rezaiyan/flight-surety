/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  FlightSuretyData,
  FlightSuretyDataInterface,
} from "../FlightSuretyData";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_airlineAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "AuthorizedContract",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "passenger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "flightNumber",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CreditWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "DeAuthorizedContract",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "passenger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "flightNumber",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "InsuranceBought",
    type: "event",
  },
  {
    inputs: [],
    name: "INSURANCE_PRICE_LIMIT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airlineAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "addAirline",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "authorizeCallers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "flightNumber",
        type: "string",
      },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "flightNumber",
        type: "string",
      },
    ],
    name: "creditInsurees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "deAuthorizeContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airlineAddress",
        type: "address",
      },
    ],
    name: "getAirlineFunding",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airlineAddress",
        type: "address",
      },
    ],
    name: "getAirlineInfo",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isRegistered",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "funding",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airlineAddress",
        type: "address",
      },
    ],
    name: "getAirlineName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airlineAddress",
        type: "address",
      },
    ],
    name: "getAirlineVoters",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAirlinesCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "flightNumber",
        type: "string",
      },
    ],
    name: "getCreditToPay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "flightNumber",
        type: "string",
      },
    ],
    name: "getFlightExistsStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPassengerAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airlineAddress",
        type: "address",
      },
    ],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airlineAddress",
        type: "address",
      },
    ],
    name: "isAirlineRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOperational",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "flightNumber",
        type: "string",
      },
    ],
    name: "pay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airlineAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "setAirlineFunding",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airlineAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "setAirlineVoters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "flightNumber",
        type: "string",
      },
    ],
    name: "setFlightExistsStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "mode",
        type: "bool",
      },
    ],
    name: "setOperatingStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_airlineAddress",
        type: "address",
      },
    ],
    name: "setVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60806040526001600260006101000a81548160ff0219169083151502179055503480156200002c57600080fd5b5060405162003649380380620036498339818101604052810190620000529190620002a0565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060405180606001604052806040518060400160405280600b81526020017f47656e657369732041697200000000000000000000000000000000000000000081525081526020016001151581526020016000815250600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000190816200013c91906200054c565b5060208201518160010160006101000a81548160ff021916908315150217905550604082015181600201559050506001600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506001600760008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600160008154809291906200022a9062000662565b919050555050620006af565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000268826200023b565b9050919050565b6200027a816200025b565b81146200028657600080fd5b50565b6000815190506200029a816200026f565b92915050565b600060208284031215620002b957620002b862000236565b5b6000620002c98482850162000289565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200035457607f821691505b6020821081036200036a57620003696200030c565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003d47fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000395565b620003e0868362000395565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006200042d620004276200042184620003f8565b62000402565b620003f8565b9050919050565b6000819050919050565b62000449836200040c565b62000461620004588262000434565b848454620003a2565b825550505050565b600090565b6200047862000469565b620004858184846200043e565b505050565b5b81811015620004ad57620004a16000826200046e565b6001810190506200048b565b5050565b601f821115620004fc57620004c68162000370565b620004d18462000385565b81016020851015620004e1578190505b620004f9620004f08562000385565b8301826200048a565b50505b505050565b600082821c905092915050565b6000620005216000198460080262000501565b1980831691505092915050565b60006200053c83836200050e565b9150826002028217905092915050565b6200055782620002d2565b67ffffffffffffffff811115620005735762000572620002dd565b5b6200057f82546200033b565b6200058c828285620004b1565b600060209050601f831160018114620005c45760008415620005af578287015190505b620005bb85826200052e565b8655506200062b565b601f198416620005d48662000370565b60005b82811015620005fe57848901518255600182019150602085019450602081019050620005d7565b868310156200061e57848901516200061a601f8916826200050e565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200066f82620003f8565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203620006a457620006a362000633565b5b600182019050919050565b612f8a80620006bf6000396000f3fe60806040526004361061016a5760003560e01c806346ee941a116100d1578063720c7cbb1161008a578063a1a5faf111610064578063a1a5faf114610564578063b60d42881461058d578063cd905dff14610597578063ebc5c8ea146105c257610179565b8063720c7cbb146104ab57806394e2177a146104ea5780639ab24eb01461052757610179565b806346ee941a1461039a578063487d7200146103d7578063490e1f6614610400578063492cc769146104295780634c8d027414610445578063524b61001461046e57610179565b806329e18e5d1161012357806329e18e5d1461028c5780632b66d72e146102b75780632ca8eb0e146102e057806339004b271461031d5780633afb50d7146103465780633fcf1cf41461037157610179565b8063010c5c971461017e57806305e931f4146101bb578063110466ed146101e657806312065fe01461020f5780631d6306701461023a57806329df66cc1461026357610179565b36610179576101776105ff565b005b600080fd5b34801561018a57600080fd5b506101a560048036038101906101a09190611fa1565b610738565b6040516101b29190611fe9565b60405180910390f35b3480156101c757600080fd5b506101d06107e0565b6040516101dd919061201d565b60405180910390f35b3480156101f257600080fd5b5061020d60048036038101906102089190612064565b610839565b005b34801561021b57600080fd5b506102246108e4565b604051610231919061201d565b60405180910390f35b34801561024657600080fd5b50610261600480360381019061025c91906121d7565b61093b565b005b34801561026f57600080fd5b5061028a60048036038101906102859190612220565b6109c4565b005b34801561029857600080fd5b506102a1610b52565b6040516102ae919061201d565b60405180910390f35b3480156102c357600080fd5b506102de60048036038101906102d991906121d7565b610b5e565b005b3480156102ec57600080fd5b50610307600480360381019061030291906121d7565b610db6565b604051610314919061201d565b60405180910390f35b34801561032957600080fd5b50610344600480360381019061033f9190611fa1565b610e53565b005b34801561035257600080fd5b5061035b610ead565b604051610368919061233a565b60405180910390f35b34801561037d57600080fd5b50610398600480360381019061039391906121d7565b610f8a565b005b3480156103a657600080fd5b506103c160048036038101906103bc9190611fa1565b611176565b6040516103ce919061233a565b60405180910390f35b3480156103e357600080fd5b506103fe60048036038101906103f99190611fa1565b611292565b005b34801561040c57600080fd5b5061042760048036038101906104229190612388565b6113fa565b005b610443600480360381019061043e91906121d7565b6114a6565b005b34801561045157600080fd5b5061046c600480360381019061046791906123c8565b61186f565b005b34801561047a57600080fd5b5061049560048036038101906104909190611fa1565b611962565b6040516104a29190612487565b60405180910390f35b3480156104b757600080fd5b506104d260048036038101906104cd9190611fa1565b611a85565b6040516104e1939291906124a9565b60405180910390f35b3480156104f657600080fd5b50610511600480360381019061050c9190611fa1565b611bfb565b60405161051e919061201d565b60405180910390f35b34801561053357600080fd5b5061054e60048036038101906105499190611fa1565b611c96565b60405161055b919061201d565b60405180910390f35b34801561057057600080fd5b5061058b60048036038101906105869190611fa1565b611d2e565b005b6105956105ff565b005b3480156105a357600080fd5b506105ac611e94565b6040516105b99190611fe9565b60405180910390f35b3480156105ce57600080fd5b506105e960048036038101906105e491906121d7565b611eab565b6040516105f69190611fe9565b60405180910390f35b600260009054906101000a900460ff1661064e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064590612559565b60405180910390fd5b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff166106dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106d4906125c5565b60405180910390fd5b34600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825461072f9190612614565b92505081905550565b6000600260009054906101000a900460ff16610789576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078090612559565b60405180910390fd5b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff169050919050565b6000600260009054906101000a900460ff16610831576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082890612559565b60405180910390fd5b600154905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108be90612694565b60405180910390fd5b80600260006101000a81548160ff02191690831515021790555050565b6000600260009054906101000a900460ff16610935576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092c90612559565b60405180910390fd5b47905090565b600260009054906101000a900460ff1661098a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098190612559565b60405180910390fd5b600160088260405161099c91906126f0565b908152602001604051809103902060006101000a81548160ff02191690831515021790555050565b600260009054906101000a900460ff16610a13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0a90612559565b60405180910390fd5b6001600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414610a95576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8c90612753565b60405180910390fd5b60405180606001604052808281526020016001151581526020016000815250600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019081610b08919061297f565b5060208201518160010160006101000a81548160ff0219169083151502179055506040820151816002015590505060016000815480929190610b4990612a51565b91905055505050565b670de0b6b3a764000081565b600260009054906101000a900460ff16610bad576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ba490612559565b60405180910390fd5b3273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c1b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1290612b0b565b60405180910390fd5b60008133604051602001610c30929190612b73565b6040516020818303038152906040528051906020012090506000600960008381526020019081526020016000206002015411610ca1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c9890612be7565b60405180910390fd5b600060096000838152602001908152602001600020600201549050804711610cfe576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cf590612c79565b60405180910390fd5b600060096000848152602001908152602001600020600201819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610d60573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167f37821217243a9021d21d3064ee513839a726184e5a5ec6068a9faf8213fad23d8483604051610da9929190612c99565b60405180910390a2505050565b6000600260009054906101000a900460ff16610e07576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dfe90612559565b60405180910390fd5b60008233604051602001610e1c929190612b73565b6040516020818303038152906040528051906020012090506009600082815260200190815260200160002060020154915050919050565b6001600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ea39190612614565b9250508190555050565b6060600260009054906101000a900460ff16610efe576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ef590612559565b60405180910390fd5b6003805480602002602001604051908101604052809291908181526020018280548015610f8057602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610f36575b5050505050905090565b600260009054906101000a900460ff16610fd9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fd090612559565b60405180910390fd5b6000600380549050905060005b81811015611171576000836003838154811061100557611004612cc9565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051602001611041929190612b73565b604051602081830303815290604052805190602001209050600073ffffffffffffffffffffffffffffffffffffffff166009600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461115d576000600960008381526020019081526020016000209050600081600201549050600082600101876040516110f791906126f0565b90815260200160405180910390205490506000836001018860405161111c91906126f0565b90815260200160405180910390208190555060028161113b9190612d27565b816111469190612614565b826111519190612614565b83600201819055505050505b50808061116990612a51565b915050610fe6565b505050565b6060600260009054906101000a900460ff166111c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111be90612559565b60405180910390fd5b600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561128657602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161123c575b50505050509050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611320576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161131790612694565b60405180910390fd5b600260009054906101000a900460ff1661136f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161136690612559565b60405180910390fd5b6001600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508073ffffffffffffffffffffffffffffffffffffffff167f2c74592fddad593c2c4403101ce9b30930711ab87571268ddd1e1989ee1d791760405160405180910390a250565b600260009054906101000a900460ff16611449576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161144090612559565b60405180910390fd5b80600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600082825461149b9190612614565b925050819055505050565b600260009054906101000a900460ff166114f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114ec90612559565b60405180910390fd5b60088160405161150591906126f0565b908152602001604051809103902060009054906101000a900460ff16611560576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161155790612da4565b60405180910390fd5b3273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146115ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115c590612b0b565b60405180910390fd5b60003411611611576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161160890612e36565b60405180910390fd5b670de0b6b3a764000034111561165c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161165390612ec8565b60405180910390fd5b60008133604051602001611671929190612b73565b604051602081830303815290604052805190602001209050600073ffffffffffffffffffffffffffffffffffffffff166009600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461172e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161172590612f34565b60405180910390fd5b6000600960008381526020019081526020016000209050338160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600081600201819055503481600101846040516117a591906126f0565b9081526020016040518091039020819055506003339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167f26ad90fbc61f14a22f36e3f307f548d6d4cb6193ec8fdfd8903077e2e3d8953d8434604051611862929190612c99565b60405180910390a2505050565b600260009054906101000a900460ff166118be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118b590612559565b60405180910390fd5b600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b6060600260009054906101000a900460ff166119b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119aa90612559565b60405180910390fd5b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054611a00906127a2565b80601f0160208091040260200160405190810160405280929190818152602001828054611a2c906127a2565b8015611a795780601f10611a4e57610100808354040283529160200191611a79565b820191906000526020600020905b815481529060010190602001808311611a5c57829003601f168201915b50505050509050919050565b6060600080600260009054906101000a900460ff16611ad9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ad090612559565b60405180910390fd5b6000600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806060016040529081600082018054611b35906127a2565b80601f0160208091040260200160405190810160405280929190818152602001828054611b61906127a2565b8015611bae5780601f10611b8357610100808354040283529160200191611bae565b820191906000526020600020905b815481529060010190602001808311611b9157829003601f168201915b505050505081526020016001820160009054906101000a900460ff161515151581526020016002820154815250509050806000015193508060200151925080604001519150509193909250565b6000600260009054906101000a900460ff16611c4c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c4390612559565b60405180910390fd5b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201549050919050565b6000600260009054906101000a900460ff16611ce7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cde90612559565b60405180910390fd5b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611dbc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611db390612694565b60405180910390fd5b600260009054906101000a900460ff16611e0b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e0290612559565b60405180910390fd5b600760008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600090558073ffffffffffffffffffffffffffffffffffffffff167fd5cf915bcf19ee4a2edf05f0add6e4520e02eda58f4b4a99387be2a7ae79cefb60405160405180910390a250565b6000600260009054906101000a900460ff16905090565b6000600260009054906101000a900460ff16611efc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ef390612559565b60405180910390fd5b600882604051611f0c91906126f0565b908152602001604051809103902060009054906101000a900460ff169050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611f6e82611f43565b9050919050565b611f7e81611f63565b8114611f8957600080fd5b50565b600081359050611f9b81611f75565b92915050565b600060208284031215611fb757611fb6611f39565b5b6000611fc584828501611f8c565b91505092915050565b60008115159050919050565b611fe381611fce565b82525050565b6000602082019050611ffe6000830184611fda565b92915050565b6000819050919050565b61201781612004565b82525050565b6000602082019050612032600083018461200e565b92915050565b61204181611fce565b811461204c57600080fd5b50565b60008135905061205e81612038565b92915050565b60006020828403121561207a57612079611f39565b5b60006120888482850161204f565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6120e48261209b565b810181811067ffffffffffffffff82111715612103576121026120ac565b5b80604052505050565b6000612116611f2f565b905061212282826120db565b919050565b600067ffffffffffffffff821115612142576121416120ac565b5b61214b8261209b565b9050602081019050919050565b82818337600083830152505050565b600061217a61217584612127565b61210c565b90508281526020810184848401111561219657612195612096565b5b6121a1848285612158565b509392505050565b600082601f8301126121be576121bd612091565b5b81356121ce848260208601612167565b91505092915050565b6000602082840312156121ed576121ec611f39565b5b600082013567ffffffffffffffff81111561220b5761220a611f3e565b5b612217848285016121a9565b91505092915050565b6000806040838503121561223757612236611f39565b5b600061224585828601611f8c565b925050602083013567ffffffffffffffff81111561226657612265611f3e565b5b612272858286016121a9565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6122b181611f63565b82525050565b60006122c383836122a8565b60208301905092915050565b6000602082019050919050565b60006122e78261227c565b6122f18185612287565b93506122fc83612298565b8060005b8381101561232d57815161231488826122b7565b975061231f836122cf565b925050600181019050612300565b5085935050505092915050565b6000602082019050818103600083015261235481846122dc565b905092915050565b61236581612004565b811461237057600080fd5b50565b6000813590506123828161235c565b92915050565b6000806040838503121561239f5761239e611f39565b5b60006123ad85828601611f8c565b92505060206123be85828601612373565b9150509250929050565b600080604083850312156123df576123de611f39565b5b60006123ed85828601611f8c565b92505060206123fe85828601611f8c565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b83811015612442578082015181840152602081019050612427565b60008484015250505050565b600061245982612408565b6124638185612413565b9350612473818560208601612424565b61247c8161209b565b840191505092915050565b600060208201905081810360008301526124a1818461244e565b905092915050565b600060608201905081810360008301526124c3818661244e565b90506124d26020830185611fda565b6124df604083018461200e565b949350505050565b7f436f6e74726163742069732063757272656e746c79206e6f74206f706572617460008201527f696f6e616c000000000000000000000000000000000000000000000000000000602082015250565b6000612543602583612413565b915061254e826124e7565b604082019050919050565b6000602082019050818103600083015261257281612536565b9050919050565b7f4169726c696e65206973206e6f74207265676973746572656400000000000000600082015250565b60006125af601983612413565b91506125ba82612579565b602082019050919050565b600060208201905081810360008301526125de816125a2565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061261f82612004565b915061262a83612004565b9250828201905080821115612642576126416125e5565b5b92915050565b7f43616c6c6572206973206e6f7420636f6e7472616374206f776e657200000000600082015250565b600061267e601c83612413565b915061268982612648565b602082019050919050565b600060208201905081810360008301526126ad81612671565b9050919050565b600081905092915050565b60006126ca82612408565b6126d481856126b4565b93506126e4818560208601612424565b80840191505092915050565b60006126fc82846126bf565b915081905092915050565b7f43616c6c6572206973206e6f7420617574686f72697a65643a20000000000000600082015250565b600061273d601a83612413565b915061274882612707565b602082019050919050565b6000602082019050818103600083015261276c81612730565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806127ba57607f821691505b6020821081036127cd576127cc612773565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026128357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826127f8565b61283f86836127f8565b95508019841693508086168417925050509392505050565b6000819050919050565b600061287c61287761287284612004565b612857565b612004565b9050919050565b6000819050919050565b61289683612861565b6128aa6128a282612883565b848454612805565b825550505050565b600090565b6128bf6128b2565b6128ca81848461288d565b505050565b5b818110156128ee576128e36000826128b7565b6001810190506128d0565b5050565b601f82111561293357612904816127d3565b61290d846127e8565b8101602085101561291c578190505b612930612928856127e8565b8301826128cf565b50505b505050565b600082821c905092915050565b600061295660001984600802612938565b1980831691505092915050565b600061296f8383612945565b9150826002028217905092915050565b61298882612408565b67ffffffffffffffff8111156129a1576129a06120ac565b5b6129ab82546127a2565b6129b68282856128f2565b600060209050601f8311600181146129e957600084156129d7578287015190505b6129e18582612963565b865550612a49565b601f1984166129f7866127d3565b60005b82811015612a1f578489015182556001820191506020850194506020810190506129fa565b86831015612a3c5784890151612a38601f891682612945565b8355505b6001600288020188555050505b505050505050565b6000612a5c82612004565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612a8e57612a8d6125e5565b5b600182019050919050565b7f436f6e7472616374732063616e6e6f742063616c6c20746869732066756e637460008201527f696f6e2e00000000000000000000000000000000000000000000000000000000602082015250565b6000612af5602483612413565b9150612b0082612a99565b604082019050919050565b60006020820190508181036000830152612b2481612ae8565b9050919050565b60008160601b9050919050565b6000612b4382612b2b565b9050919050565b6000612b5582612b38565b9050919050565b612b6d612b6882611f63565b612b4a565b82525050565b6000612b7f82856126bf565b9150612b8b8284612b5c565b6014820191508190509392505050565b7f4e6f2063726564697420746f2062652077697468647261776e00000000000000600082015250565b6000612bd1601983612413565b9150612bdc82612b9b565b602082019050919050565b60006020820190508181036000830152612c0081612bc4565b9050919050565b7f54686520636f6e747261637420646f6573206e6f74206861766520656e6f756760008201527f682066756e647320746f20706179207468652063726564697400000000000000602082015250565b6000612c63603983612413565b9150612c6e82612c07565b604082019050919050565b60006020820190508181036000830152612c9281612c56565b9050919050565b60006040820190508181036000830152612cb3818561244e565b9050612cc2602083018461200e565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612d3282612004565b9150612d3d83612004565b925082612d4d57612d4c612cf8565b5b828204905092915050565b7f466c6967687420646f6573206e6f742065786973740000000000000000000000600082015250565b6000612d8e601583612413565b9150612d9982612d58565b602082019050919050565b60006020820190508181036000830152612dbd81612d81565b9050919050565b7f416d6f756e74206e6565647320746f2062652067726561746572207468616e2060008201527f3000000000000000000000000000000000000000000000000000000000000000602082015250565b6000612e20602183612413565b9150612e2b82612dc4565b604082019050919050565b60006020820190508181036000830152612e4f81612e13565b9050919050565b7f43616e6e6f7420627579206d6f7265207468616e203120455448206f6620696e60008201527f737572616e636500000000000000000000000000000000000000000000000000602082015250565b6000612eb2602783612413565b9150612ebd82612e56565b604082019050919050565b60006020820190508181036000830152612ee181612ea5565b9050919050565b7f416c726561647920696e737572656420666f72207468697320666c6967687400600082015250565b6000612f1e601f83612413565b9150612f2982612ee8565b602082019050919050565b60006020820190508181036000830152612f4d81612f11565b905091905056fea2646970667358221220d2e929dee5eaed42f632755752e48397687b66d70292b196eed133a2f45bdc6764736f6c63430008130033";

type FlightSuretyDataConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FlightSuretyDataConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FlightSuretyData__factory extends ContractFactory {
  constructor(...args: FlightSuretyDataConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _airlineAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_airlineAddress, overrides || {});
  }
  override deploy(
    _airlineAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_airlineAddress, overrides || {}) as Promise<
      FlightSuretyData & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): FlightSuretyData__factory {
    return super.connect(runner) as FlightSuretyData__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FlightSuretyDataInterface {
    return new Interface(_abi) as FlightSuretyDataInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): FlightSuretyData {
    return new Contract(address, _abi, runner) as unknown as FlightSuretyData;
  }
}
