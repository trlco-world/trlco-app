import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { STAKING_ABI } from './stakingV2.abi'
import { erc20Abi, maxUint256, parseEther } from 'viem'

const TOKEN_ADDRESS = '0x8eA35F3606f274403d23D667b5c5E6038C62FD2c'
const CONTRACT_ADDRESS = '0x2bEC34ddF812F2AFfc5E07D029B4374CCFDB6ae7'

const TOKEN_CONFIG = {
  address: TOKEN_ADDRESS,
  abi: erc20Abi,
} as const

const STAKING_CONFIG = {
  address: CONTRACT_ADDRESS,
  abi: STAKING_ABI,
} as const

export const useStakingV2 = () => {
  const { address } = useAccount()
  const {
    writeContractAsync,
    data: hash,
    isPending,
    isError,
  } = useWriteContract()
  const {
    isLoading: isConfirming,
    isSuccess,
    isError: isFailed,
  } = useWaitForTransactionReceipt({
    hash,
  })

  // Consolidated Read Functions
  const { data, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        ...TOKEN_CONFIG,
        functionName: 'balanceOf',
        args: [address!],
      },
      {
        ...STAKING_CONFIG,
        functionName: 'getAllowance',
        args: [address!],
      },
      {
        ...STAKING_CONFIG,
        functionName: 'totalStaked',
      },
      {
        ...STAKING_CONFIG,
        functionName: 'getWalletStats',
        args: [address!],
      },
      {
        ...STAKING_CONFIG,
        functionName: 'getPendingRewards',
        args: [address!],
      },
      {
        ...STAKING_CONFIG,
        functionName: 'totalUniqueStakers',
      },
      {
        ...STAKING_CONFIG,
        functionName: 'totalRewardDistributed',
      },
      {
        ...STAKING_CONFIG,
        functionName: 'totalClaimCount',
      },
    ],
    query: {
      enabled: !!address,
      refetchInterval: 6_000,
    },
  })

  // Write Functions
  const approve = async () => {
    const hash = await writeContractAsync({
      ...TOKEN_CONFIG,
      functionName: 'approve',
      args: [CONTRACT_ADDRESS, maxUint256],
    })
    return hash
  }

  const stake = async (amount: string) => {
    const hash = await writeContractAsync({
      ...STAKING_CONFIG,
      functionName: 'stake',
      args: [parseEther(amount)],
    })
    return hash
  }

  const withdrawStake = async (amount: string) => {
    await writeContractAsync({
      ...STAKING_CONFIG,
      functionName: 'withdrawStake',
      args: [parseEther(amount)],
    })
  }

  const claimRewards = async () => {
    await writeContractAsync({
      ...STAKING_CONFIG,
      functionName: 'claimRewards',
    })
  }

  const exitMembership = async () => {
    await writeContractAsync({
      ...STAKING_CONFIG,
      functionName: 'exitMembership',
    })
  }

  return {
    // Read States
    refetch,
    balance: data?.[0].result,
    allowance: data?.[1].result,
    totalStaked: data?.[2].result,
    walletStats: data?.[3].result
      ? {
          stakedAmount: data[3].result[0],
          rewardDebt: data[3].result[1],
          claimedReward: data[3].result[2],
          lifetimeReward: data[3].result[3],
          lastClaimed: data[3].result[4],
          membership: {
            name: data[3].result[5].name,
            min: data[3].result[5].min,
            max: data[3].result[5].max,
            multiplier: data[3].result[5].multiplier,
          },
        }
      : undefined,
    pendingRewards: data?.[4].result,
    stats: {
      uniqueStakers: data?.[5].result,
      totalRewardDistributed: data?.[6].result,
      totalClaimCount: data?.[7].result,
    },

    // Write Functions
    approve,
    stake,
    withdrawStake,
    claimRewards,
    exitMembership,

    // Transaction States
    isLoading,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    isFailed,
    hash,
  }
}
