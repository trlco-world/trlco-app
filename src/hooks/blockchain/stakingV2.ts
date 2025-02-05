import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { STAKING_ABI } from './stakingV2.abi'
import { erc20Abi, parseEther } from 'viem'

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
  const { writeContractAsync, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Read Functions
  const { data: balance } = useReadContract({
    ...TOKEN_CONFIG,
    functionName: 'balanceOf',
    args: [address!],
    query: { enabled: !!address },
  })

  const { data: baseRate } = useReadContract({
    ...STAKING_CONFIG,
    functionName: 'baseRate',
  })

  const { data: totalStaked } = useReadContract({
    ...STAKING_CONFIG,
    functionName: 'totalStaked',
  })

  const { data: walletStats } = useReadContract({
    ...STAKING_CONFIG,
    functionName: 'getWalletStats',
    args: [address!],
    query: { enabled: !!address },
  })

  const { data: pendingRewards } = useReadContract({
    ...STAKING_CONFIG,
    functionName: 'getPendingRewards',
    args: [address!],
    query: { enabled: !!address },
  })

  // Write Functions
  const approve = async (amount: string) => {
    await writeContractAsync({
      ...TOKEN_CONFIG,
      functionName: 'approve',
      args: [CONTRACT_ADDRESS, parseEther(amount)],
    })
  }

  const stake = async (amount: string) => {
    await writeContractAsync({
      ...STAKING_CONFIG,
      functionName: 'stake',
      args: [parseEther(amount)],
    })
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

  // Additional Read Functions
  const getMultiplier = async (amount: string) => {
    return await writeContractAsync({
      ...STAKING_CONFIG,
      functionName: 'getMultiplier',
      args: [parseEther(amount)],
    })
  }

  const getTierStats = async (tierIndex: number) => {
    return await writeContractAsync({
      ...STAKING_CONFIG,
      functionName: 'getTierStats',
      args: [BigInt(tierIndex)],
    })
  }

  const getAllowance = async (ownerAddress: string) => {
    return await writeContractAsync({
      ...STAKING_CONFIG,
      functionName: 'getAllowance',
      args: [ownerAddress],
    })
  }

  // Stats and Info
  const { data: statsData } = useReadContracts({
    contracts: [
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
  })

  return {
    // Read States
    balance,
    baseRate,
    totalStaked,
    walletStats,
    pendingRewards,
    stats: {
      uniqueStakers: statsData?.[0].result,
      totalRewardDistributed: statsData?.[1].result,
      totalClaimCount: statsData?.[2].result,
    },

    // Write Functions
    approve,
    stake,
    withdrawStake,
    claimRewards,
    exitMembership,

    // Utility Functions
    getMultiplier,
    getTierStats,
    getAllowance,

    // Transaction States
    isPending,
    isConfirming,
    isSuccess,
    hash,
  }
}
