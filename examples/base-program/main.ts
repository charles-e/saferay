import { safecoin, Wallet, BPFLoader } from '../..';

import fs from 'fs';

import Demo from './Demo';

import { Keypair } from '@safecoin/web3.js';

const programBinary = fs.readFileSync('./demo.so');

async function main() {
  const conn = safecoin.connect('local');
  
  const mnemonic = "spin canyon tuition upset pioneer celery liquid conduct boy bargain dust seed"
  const wallet = await Wallet.fromMnemonic(mnemonic, conn);

  console.log('Keypair address:', wallet.address);

  console.log('Get some airdrop...');
  await wallet.conn.requestAirdrop(wallet.pubkey, 1e9);

  await new Promise(resolve => setTimeout(resolve, 1000));

  let balance = await wallet.conn.getBalance(wallet.pubkey);
  console.log('Keypair banalce:', balance);

  console.log('Load demo program...')
  const loader = new BPFLoader(wallet);
  const program = await loader.load(programBinary);

  console.log('Program loaded to account:', program.publicKey.toBase58());

  const demo = new Demo(wallet, program.publicKey);
  const demoAccount = new Keypair();

  console.log('Excute instruction with account: ', demoAccount.publicKey.toBase58());
  await demo.request(demoAccount.publicKey);

  console.log('Success!');

}

main().catch(console.log)