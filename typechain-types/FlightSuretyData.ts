/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface FlightSuretyDataInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "INSURANCE_PRICE_LIMIT"
      | "addAirline"
      | "authorizeCallers"
      | "buy"
      | "creditInsurees"
      | "deAuthorizeContract"
      | "fund"
      | "getAirlineFunding"
      | "getAirlineInfo"
      | "getAirlineName"
      | "getAirlineVoters"
      | "getAirlinesCount"
      | "getBalance"
      | "getCreditToPay"
      | "getFlightExistsStatus"
      | "getPassengerAddresses"
      | "getVotes"
      | "isAirlineRegistered"
      | "isOperational"
      | "pay"
      | "setAirlineFunding"
      | "setAirlineVoters"
      | "setFlightExistsStatus"
      | "setOperatingStatus"
      | "setVotes"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AuthorizedContract"
      | "CreditWithdrawn"
      | "DeAuthorizedContract"
      | "InsuranceBought"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "INSURANCE_PRICE_LIMIT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addAirline",
    values: [AddressLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "authorizeCallers",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "buy", values: [string]): string;
  encodeFunctionData(
    functionFragment: "creditInsurees",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "deAuthorizeContract",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "fund", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getAirlineFunding",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAirlineInfo",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAirlineName",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAirlineVoters",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAirlinesCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCreditToPay",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getFlightExistsStatus",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getPassengerAddresses",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVotes",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isAirlineRegistered",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isOperational",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "pay", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setAirlineFunding",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setAirlineVoters",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setFlightExistsStatus",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setOperatingStatus",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setVotes",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "INSURANCE_PRICE_LIMIT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addAirline", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "authorizeCallers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "creditInsurees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deAuthorizeContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fund", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAirlineFunding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAirlineInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAirlineName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAirlineVoters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAirlinesCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCreditToPay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFlightExistsStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPassengerAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getVotes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isAirlineRegistered",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isOperational",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAirlineFunding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAirlineVoters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFlightExistsStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOperatingStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setVotes", data: BytesLike): Result;
}

export namespace AuthorizedContractEvent {
  export type InputTuple = [addr: AddressLike];
  export type OutputTuple = [addr: string];
  export interface OutputObject {
    addr: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CreditWithdrawnEvent {
  export type InputTuple = [
    passenger: AddressLike,
    flightNumber: string,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    passenger: string,
    flightNumber: string,
    amount: bigint
  ];
  export interface OutputObject {
    passenger: string;
    flightNumber: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DeAuthorizedContractEvent {
  export type InputTuple = [addr: AddressLike];
  export type OutputTuple = [addr: string];
  export interface OutputObject {
    addr: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InsuranceBoughtEvent {
  export type InputTuple = [
    passenger: AddressLike,
    flightNumber: string,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    passenger: string,
    flightNumber: string,
    amount: bigint
  ];
  export interface OutputObject {
    passenger: string;
    flightNumber: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface FlightSuretyData extends BaseContract {
  connect(runner?: ContractRunner | null): FlightSuretyData;
  waitForDeployment(): Promise<this>;

  interface: FlightSuretyDataInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  INSURANCE_PRICE_LIMIT: TypedContractMethod<[], [bigint], "view">;

  addAirline: TypedContractMethod<
    [_airlineAddress: AddressLike, _name: string],
    [void],
    "nonpayable"
  >;

  authorizeCallers: TypedContractMethod<
    [_address: AddressLike],
    [void],
    "nonpayable"
  >;

  buy: TypedContractMethod<[flightNumber: string], [void], "payable">;

  creditInsurees: TypedContractMethod<
    [flightNumber: string],
    [void],
    "nonpayable"
  >;

  deAuthorizeContract: TypedContractMethod<
    [_address: AddressLike],
    [void],
    "nonpayable"
  >;

  fund: TypedContractMethod<[], [void], "payable">;

  getAirlineFunding: TypedContractMethod<
    [_airlineAddress: AddressLike],
    [bigint],
    "view"
  >;

  getAirlineInfo: TypedContractMethod<
    [_airlineAddress: AddressLike],
    [
      [string, boolean, bigint] & {
        name: string;
        isRegistered: boolean;
        funding: bigint;
      }
    ],
    "view"
  >;

  getAirlineName: TypedContractMethod<
    [_airlineAddress: AddressLike],
    [string],
    "view"
  >;

  getAirlineVoters: TypedContractMethod<
    [_airlineAddress: AddressLike],
    [string[]],
    "view"
  >;

  getAirlinesCount: TypedContractMethod<[], [bigint], "view">;

  getBalance: TypedContractMethod<[], [bigint], "view">;

  getCreditToPay: TypedContractMethod<[flightNumber: string], [bigint], "view">;

  getFlightExistsStatus: TypedContractMethod<
    [flightNumber: string],
    [boolean],
    "view"
  >;

  getPassengerAddresses: TypedContractMethod<[], [string[]], "view">;

  getVotes: TypedContractMethod<
    [_airlineAddress: AddressLike],
    [bigint],
    "view"
  >;

  isAirlineRegistered: TypedContractMethod<
    [_airlineAddress: AddressLike],
    [boolean],
    "view"
  >;

  isOperational: TypedContractMethod<[], [boolean], "view">;

  pay: TypedContractMethod<[flightNumber: string], [void], "nonpayable">;

  setAirlineFunding: TypedContractMethod<
    [_airlineAddress: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  setAirlineVoters: TypedContractMethod<
    [_airlineAddress: AddressLike, voter: AddressLike],
    [void],
    "nonpayable"
  >;

  setFlightExistsStatus: TypedContractMethod<
    [flightNumber: string],
    [void],
    "nonpayable"
  >;

  setOperatingStatus: TypedContractMethod<
    [mode: boolean],
    [void],
    "nonpayable"
  >;

  setVotes: TypedContractMethod<
    [_airlineAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "INSURANCE_PRICE_LIMIT"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "addAirline"
  ): TypedContractMethod<
    [_airlineAddress: AddressLike, _name: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "authorizeCallers"
  ): TypedContractMethod<[_address: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "buy"
  ): TypedContractMethod<[flightNumber: string], [void], "payable">;
  getFunction(
    nameOrSignature: "creditInsurees"
  ): TypedContractMethod<[flightNumber: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "deAuthorizeContract"
  ): TypedContractMethod<[_address: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "fund"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "getAirlineFunding"
  ): TypedContractMethod<[_airlineAddress: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getAirlineInfo"
  ): TypedContractMethod<
    [_airlineAddress: AddressLike],
    [
      [string, boolean, bigint] & {
        name: string;
        isRegistered: boolean;
        funding: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getAirlineName"
  ): TypedContractMethod<[_airlineAddress: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "getAirlineVoters"
  ): TypedContractMethod<[_airlineAddress: AddressLike], [string[]], "view">;
  getFunction(
    nameOrSignature: "getAirlinesCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getCreditToPay"
  ): TypedContractMethod<[flightNumber: string], [bigint], "view">;
  getFunction(
    nameOrSignature: "getFlightExistsStatus"
  ): TypedContractMethod<[flightNumber: string], [boolean], "view">;
  getFunction(
    nameOrSignature: "getPassengerAddresses"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "getVotes"
  ): TypedContractMethod<[_airlineAddress: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "isAirlineRegistered"
  ): TypedContractMethod<[_airlineAddress: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "isOperational"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "pay"
  ): TypedContractMethod<[flightNumber: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setAirlineFunding"
  ): TypedContractMethod<
    [_airlineAddress: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setAirlineVoters"
  ): TypedContractMethod<
    [_airlineAddress: AddressLike, voter: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setFlightExistsStatus"
  ): TypedContractMethod<[flightNumber: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setOperatingStatus"
  ): TypedContractMethod<[mode: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setVotes"
  ): TypedContractMethod<[_airlineAddress: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "AuthorizedContract"
  ): TypedContractEvent<
    AuthorizedContractEvent.InputTuple,
    AuthorizedContractEvent.OutputTuple,
    AuthorizedContractEvent.OutputObject
  >;
  getEvent(
    key: "CreditWithdrawn"
  ): TypedContractEvent<
    CreditWithdrawnEvent.InputTuple,
    CreditWithdrawnEvent.OutputTuple,
    CreditWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: "DeAuthorizedContract"
  ): TypedContractEvent<
    DeAuthorizedContractEvent.InputTuple,
    DeAuthorizedContractEvent.OutputTuple,
    DeAuthorizedContractEvent.OutputObject
  >;
  getEvent(
    key: "InsuranceBought"
  ): TypedContractEvent<
    InsuranceBoughtEvent.InputTuple,
    InsuranceBoughtEvent.OutputTuple,
    InsuranceBoughtEvent.OutputObject
  >;

  filters: {
    "AuthorizedContract(address)": TypedContractEvent<
      AuthorizedContractEvent.InputTuple,
      AuthorizedContractEvent.OutputTuple,
      AuthorizedContractEvent.OutputObject
    >;
    AuthorizedContract: TypedContractEvent<
      AuthorizedContractEvent.InputTuple,
      AuthorizedContractEvent.OutputTuple,
      AuthorizedContractEvent.OutputObject
    >;

    "CreditWithdrawn(address,string,uint256)": TypedContractEvent<
      CreditWithdrawnEvent.InputTuple,
      CreditWithdrawnEvent.OutputTuple,
      CreditWithdrawnEvent.OutputObject
    >;
    CreditWithdrawn: TypedContractEvent<
      CreditWithdrawnEvent.InputTuple,
      CreditWithdrawnEvent.OutputTuple,
      CreditWithdrawnEvent.OutputObject
    >;

    "DeAuthorizedContract(address)": TypedContractEvent<
      DeAuthorizedContractEvent.InputTuple,
      DeAuthorizedContractEvent.OutputTuple,
      DeAuthorizedContractEvent.OutputObject
    >;
    DeAuthorizedContract: TypedContractEvent<
      DeAuthorizedContractEvent.InputTuple,
      DeAuthorizedContractEvent.OutputTuple,
      DeAuthorizedContractEvent.OutputObject
    >;

    "InsuranceBought(address,string,uint256)": TypedContractEvent<
      InsuranceBoughtEvent.InputTuple,
      InsuranceBoughtEvent.OutputTuple,
      InsuranceBoughtEvent.OutputObject
    >;
    InsuranceBought: TypedContractEvent<
      InsuranceBoughtEvent.InputTuple,
      InsuranceBoughtEvent.OutputTuple,
      InsuranceBoughtEvent.OutputObject
    >;
  };
}
