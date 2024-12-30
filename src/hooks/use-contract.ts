import { abi } from '@/lib/abi'
import { erc20Abi, parseEther } from 'viem'
import {
  useAccount,
  useReadContracts,
  useTransactionCount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

const StakingContract = import.meta.env.VITE_FIXED_STAKING_SC_ADDRESS
const RewardToken = import.meta.env.VITE_TRLCO_SC_ADDRESS
const InvestReceiverAddress = import.meta.env.VITE_INVEST_WALLET

const RewardTokenConfig = {
  abi: erc20Abi,
  address: RewardToken,
}
const stakingConfig = {
  address: StakingContract,
  abi,
} as const

export function useTRLContract() {
  const { address } = useAccount()

  const { writeContractAsync, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const result = useTransactionCount({
    address,
  })

  const { data, refetch, isLoading } = useReadContracts({
    contracts: [
      {
        ...stakingConfig,
        functionName: 'stakes',
        args: [address!],
      },
      {
        ...stakingConfig,
        functionName: 'calculateReward',
        args: [address!],
      },
      {
        ...stakingConfig,
        functionName: 'baseRate',
      },
      {
        ...RewardTokenConfig,
        functionName: 'balanceOf',
        args: [address!],
      },
      {
        ...RewardTokenConfig,
        functionName: 'allowance',
        args: [address!, StakingContract],
      },
      {
        ...stakingConfig,
        functionName: 'totalStaked',
      },
      {
        ...stakingConfig,
        functionName: 'getMembershipInfo',
        args: [address!],
      },
    ],
    query: {
      refetchInterval: 5_000,
      staleTime: 0,
    },
  })

  const approve = async (amount: string) => {
    await writeContractAsync({
      ...RewardTokenConfig,
      functionName: 'approve',
      args: [StakingContract, parseEther(amount)],
    })
  }

  const stake = async (amount: string) => {
    await writeContractAsync({
      ...stakingConfig,
      functionName: 'stake',
      args: [parseEther(amount)],
    })
  }

  const claim = async () => {
    await writeContractAsync({
      ...stakingConfig,
      functionName: 'claimRewards',
    })
  }

  const unstake = async (amount: string) => {
    await writeContractAsync({
      ...stakingConfig,
      functionName: 'withdrawStake',
      args: [parseEther(amount)],
    })
  }

  const invest = async (amount: string) => {
    return await writeContractAsync({
      ...RewardTokenConfig,
      functionName: 'transfer',
      args: [InvestReceiverAddress, parseEther(amount)],
    })
  }

  return {
    stakes: {
      amount: data?.[0].result?.[0],
      rewardDebt: data?.[0].result?.[1],
      lastClaimed: data?.[0].result?.[2],
    },
    reward: data?.[1].result,
    baseRate: data?.[2].result,
    balance: data?.[3].result,
    allowance: data?.[4].result,
    totalStaked: data?.[5].result,
    membership: {
      name: data?.[6].result?.[0],
      multiplier: data?.[6].result?.[1],
    },
    refetch,
    approve,
    stake,
    claim,
    unstake,
    invest,
    isPending,
    isConfirming,
    isLoading,
    isSuccess,
    hash,
    result,
  }
}
