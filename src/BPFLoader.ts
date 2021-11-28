import {
  Keypair,
  BpfLoader,
  BPF_LOADER_PROGRAM_ID,
} from "@safecoin/web3.js"

import { Wallet } from '.';

import { promises as fs } from "fs";
import { program } from "commander";

export class BPFLoader {
  static programID = BPF_LOADER_PROGRAM_ID;

  constructor(private wallet: Wallet, public programID = BPFLoader.programID) {}

  public async loadFile(
    binaryPath: string,
    programAccount = new Keypair(),
  ): Promise<Keypair> {
    const bin = await fs.readFile(binaryPath);
    return this.load(bin, programAccount);
  }

  public async load(
    programBinary: Buffer,
    programAccount = new Keypair(),
  ): Promise<Keypair> {
    await BpfLoader.load(
      this.wallet.conn,
      this.wallet.account,
      programAccount,
      programBinary,
      this.programID,
    );

    return programAccount;
  }
}