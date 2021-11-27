import { Connection } from "@safecoin/web3.js";
export { Account, PublicKey } from "@safecoin/web3.js";
export { Wallet } from "./Wallet";
export { SPLToken } from "./SPLToken";
export { ProgramAccount } from "./ProgramAccount";
export { BaseProgram } from "./BaseProgram";
export { BPFLoader } from "./BPFLoader";
export { System } from "./System";
export { Deployer } from "./Deployer";
export interface IConnectOptions {
    commitment?: string;
    rpcHost?: string;
}
export declare namespace safecoin {
    function connect(networkName: string, opts?: IConnectOptions): Connection;
}
