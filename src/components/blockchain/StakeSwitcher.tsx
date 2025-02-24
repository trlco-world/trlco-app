'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useNavigate, useSearch } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const frameworks = [
  {
    value: 'v3',
    label: 'Staking V3',
  },
  {
    value: 'v2',
    label: 'Staking V2',
  },
  {
    value: 'v1',
    label: 'Staking V1',
  },
]

export function StakeSwitcher() {
  const navigate = useNavigate({ from: '/stake' })
  const search = useSearch({ from: '/_dashboard/stake/' })
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string>(search.version)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : 'Select Staking...'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandEmpty>No staking found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? '' : currentValue
                    setValue(newValue)
                    navigate({ search: { version: newValue } })
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === framework.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
