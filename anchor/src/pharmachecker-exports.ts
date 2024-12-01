// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import PharmacheckerIDL from '../target/idl/pharmachecker.json'
import type { Pharmachecker } from '../target/types/pharmachecker'

// Re-export the generated IDL and type
export { Pharmachecker, PharmacheckerIDL }

// The programId is imported from the program IDL.
export const PHARMACHECKER_PROGRAM_ID = new PublicKey(PharmacheckerIDL.address)

// This is a helper function to get the Pharmachecker Anchor program.
export function getPharmacheckerProgram(provider: AnchorProvider) {
  return new Program(PharmacheckerIDL as Pharmachecker, provider)
}

// This is a helper function to get the program ID for the Pharmachecker program depending on the cluster.
export function getPharmacheckerProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Pharmachecker program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return PHARMACHECKER_PROGRAM_ID
  }
}
