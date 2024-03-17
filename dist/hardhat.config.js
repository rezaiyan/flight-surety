"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
require("@typechain/hardhat");
require("solidity-coverage");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const infuraKey = process.env.INFURA_PROJECT_ID || '';
const mnemonic = process.env.MNEMONIC || '';
const config = {
    solidity: '0.8.19',
    paths: {
        artifacts: './artifacts'
    },
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true,
            accounts: {
                count: 500,
            },
        },
        sepolia: {
            url: `https://sepolia.infura.io/v3/${infuraKey}`,
            accounts: {
                mnemonic: mnemonic,
            }
        }
    },
};
exports.default = config;
