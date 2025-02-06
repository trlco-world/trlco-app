import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatEther } from 'viem'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatter(value: bigint) {
  return Intl.NumberFormat('en-Us', { maximumFractionDigits: 8 }).format(
    +formatEther(value),
  )
}
