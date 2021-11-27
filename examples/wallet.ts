
import {
  safecoin,
  Wallet,
} from ".."

async function main() {
  // Connect to https://devnet.safecoin.com
  const conn = safecoin.connect("dev")

  const mnemonic = "spin canyon tuition upset pioneer celery liquid conduct boy bargain dust seed"
  const wallet = await Wallet.fromMnemonic(mnemonic, conn)
  console.log(wallet.address)

  await conn.requestAirdrop(wallet.pubkey, 1e9)

  // https://explorer.safecoin.com/address/4i7YkLD9RiiACd4gbG9HdTUUH2wTfTycuRwB8GcehzMd?cluster=devnet
}

main().catch(err => console.log(err))