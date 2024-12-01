'use client'

import {getPharmacheckerProgram, getPharmacheckerProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'

export function usePharmacheckerProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getPharmacheckerProgramId(cluster.network as Cluster), [cluster])
  const program = getPharmacheckerProgram(provider)

  const accounts = useQuery({
    queryKey: ['pharmachecker', 'all', { cluster }],
    queryFn: () => program.account.pharmachecker.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['pharmachecker', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ pharmachecker: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function usePharmacheckerProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = usePharmacheckerProgram()

  const accountQuery = useQuery({
    queryKey: ['pharmachecker', 'fetch', { cluster, account }],
    queryFn: () => program.account.pharmachecker.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['pharmachecker', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ pharmachecker: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['pharmachecker', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ pharmachecker: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['pharmachecker', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ pharmachecker: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['pharmachecker', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ pharmachecker: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
