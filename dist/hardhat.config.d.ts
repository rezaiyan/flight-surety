import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';
import '@typechain/hardhat';
import 'solidity-coverage';
declare const config: HardhatUserConfig;
export default config;
