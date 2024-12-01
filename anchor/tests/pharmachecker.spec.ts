import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Pharmachecker} from '../target/types/pharmachecker'

describe('pharmachecker', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Pharmachecker as Program<Pharmachecker>

  const pharmacheckerKeypair = Keypair.generate()

  it('Initialize Pharmachecker', async () => {
    await program.methods
      .initialize()
      .accounts({
        pharmachecker: pharmacheckerKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([pharmacheckerKeypair])
      .rpc()

    const currentCount = await program.account.pharmachecker.fetch(pharmacheckerKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Pharmachecker', async () => {
    await program.methods.increment().accounts({ pharmachecker: pharmacheckerKeypair.publicKey }).rpc()

    const currentCount = await program.account.pharmachecker.fetch(pharmacheckerKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Pharmachecker Again', async () => {
    await program.methods.increment().accounts({ pharmachecker: pharmacheckerKeypair.publicKey }).rpc()

    const currentCount = await program.account.pharmachecker.fetch(pharmacheckerKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Pharmachecker', async () => {
    await program.methods.decrement().accounts({ pharmachecker: pharmacheckerKeypair.publicKey }).rpc()

    const currentCount = await program.account.pharmachecker.fetch(pharmacheckerKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set pharmachecker value', async () => {
    await program.methods.set(42).accounts({ pharmachecker: pharmacheckerKeypair.publicKey }).rpc()

    const currentCount = await program.account.pharmachecker.fetch(pharmacheckerKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the pharmachecker account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        pharmachecker: pharmacheckerKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.pharmachecker.fetchNullable(pharmacheckerKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
