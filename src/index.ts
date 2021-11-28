import { Connection } from "@safecoin/web3.js";

export { Keypair, PublicKey } from "@safecoin/web3.js";
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

const defaultRPCHosts = {
  local: "http://localhost:8328",

  dev: "https://api.devnet.safecoin.org",
  devnet: "https://api.devnet.safecoin.org",

  main: "https://api.mainnet-beta.safecoin.org",
  mainnet: "https://api.mainnet-beta.safecoin.org",
};

export namespace safecoin {
  export function connect(
    networkName: string,
    opts: IConnectOptions = {},
  ): Connection {
    const commitment = opts.commitment || "singleGossip";

    const rpcHost = opts.rpcHost || defaultRPCHosts[networkName];

    if (!rpcHost) {
      throw new Error(`Cannot find RPC Host to connect to: ${networkName}`);
    }

    return new Connection(rpcHost, commitment as any);
  }
}
