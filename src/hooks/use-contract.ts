import { abi } from '@/lib/abi'
import { erc20Abi, parseEther } from 'viem'
import {
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

const StakingContract = import.meta.env.VITE_FIXED_STAKING_SC_ADDRESS
const RewardToken = import.meta.env.VITE_TRLCO_SC_ADDRESS

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
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
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
        ...RewardTokenConfig,
        functionName: 'balanceOf',
        args: [address!],
      },
      {
        ...RewardTokenConfig,
        functionName: 'allowance',
        args: [address!, StakingContract],
      },
    ],
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

  return {
    stakes: {
      amount: data?.[0].result?.[0],
      rewardDebt: data?.[0].result?.[1],
      lastClaimed: data?.[0].result?.[2],
    },
    reward: data?.[1].result,
    balance: data?.[2].result,
    allowance: data?.[3].result,
    refetch,
    approve,
    stake,
    claim,
    unstake,
    isPending,
    isConfirming,
    isLoading,
  }
}
