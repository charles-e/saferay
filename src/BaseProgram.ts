import {
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
  Keypair,
  Connection,
} from "@safecoin/web3.js"

import { Wallet } from '.';

import BufferLayout from 'buffer-layout';

// BaseProgram offers some sugar around interacting with a program. Extend this abstract
// class with program specific instructions.
export abstract class BaseProgram {
  constructor(protected wallet: Wallet, public programID: PublicKey) { }

  protected get conn(): Connection {
    return this.wallet.conn
  }

  protected get account(): Keypair {
    return this.wallet.account
  }

  protected get pubkey(): PublicKey {
    return this.wallet.pubkey
  }


  // sendTx sends and confirm instructions in a transaction. It automatically adds
  // the wallet's account as a signer to pay for the transaction.
  protected async sendTx(insts: TransactionInstruction[], signers: Keypair[] = []): Promise<string> {
    const tx = new Transaction()

    for (let inst of insts) {
      tx.add(inst)
    }

    return await sendAndConfirmTransaction(this.conn, tx, signers, {
      commitment: this.conn.commitment,
      preflightCommitment: this.conn.commitment
    })
  }

  protected instructionEncode(
    layout: BufferLayout,
    data: any,
    authorities: InstructionAuthority[] = []): TransactionInstruction {
    const buffer = Buffer.alloc(layout.span);
    layout.encode(data, buffer)

    return this.instruction(buffer, authorities)
  }

  protected instruction(
    data: Buffer,
    authorities: InstructionAuthority[] = []): TransactionInstruction {
    return new TransactionInstruction({
      keys: authsToKeys(authorities),
      programId: this.programID,
      data,
    })
  }
}

export type InstructionAuthority = Keypair | Keypair[] | PublicKey[] | PublicKey | { write: PublicKey | Keypair }

function authsToKeys(auths: InstructionAuthority[]): InstructionKey[] {
  const keys: InstructionKey[] = []

  for (let auth of auths) {
    if (auth instanceof Array) {
      auth.forEach(a =>  keys.push(authToKey(a, false)));
    } else {
      keys.push(
        authToKey(auth['write'] || auth, !!auth['write'])
      );
    }
  }
  return keys
}

function authToKey(auth: Keypair | PublicKey, isWritable = false): InstructionKey {
  // FIXME: @safecoin/web3.js and solray may import different versions of PublicKey, causing
  // the typecheck here to fail. Let's just compare constructor name for now -.-
  if (auth.constructor.name == Keypair.name) {
    return {
      pubkey: (auth as Keypair).publicKey,
      isSigner: true,
      isWritable,
    }
  } else if (auth.constructor.name == PublicKey.name) {
    return {
      pubkey: (auth as PublicKey),
      isSigner: false,
      isWritable,
    }
  }

  throw new Error(`Invalid instruction authority. Expect Keypair | PublicKey`)
}

interface InstructionKey {
  pubkey: PublicKey;
  isSigner: boolean;
  isWritable: boolean;
}