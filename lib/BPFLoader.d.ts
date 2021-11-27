/// <reference types="node" />
import { Account } from "@safecoin/web3.js";
import { Wallet } from '.';
export declare class BPFLoader {
    private wallet;
    programID: import("@safecoin/web3.js").PublicKey;
    static programID: import("@safecoin/web3.js").PublicKey;
    constructor(wallet: Wallet, programID?: import("@safecoin/web3.js").PublicKey);
    loadFile(binaryPath: string, programAccount?: Account): Promise<Account>;
    load(programBinary: Buffer, programAccount?: Account): Promise<Account>;
}
