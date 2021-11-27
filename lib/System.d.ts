/// <reference types="node" />
import { Wallet } from './Wallet';
import { PublicKey } from "@safecoin/web3.js";
export interface RentFreeAccountInstruction {
    newPubicKey: PublicKey;
    programID: PublicKey;
    space: number;
}
export interface TransferInstructionParams {
    to: PublicKey;
    amount: number;
}
export declare class System {
    private wallet;
    constructor(wallet: Wallet);
    accountInfo(pubkey: PublicKey): Promise<import("@safecoin/web3.js").AccountInfo<Buffer> | null>;
    createRentFreeAccountInstruction(params: RentFreeAccountInstruction): Promise<import("@safecoin/web3.js").TransactionInstruction>;
    createTransferInstruction(params: TransferInstructionParams): import("@safecoin/web3.js").TransactionInstruction;
}
