import { Link, useLocation } from '@tanstack/react-router'
import { Icon } from '../icon'

const items = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    icon: <Icon.Dashboard />,
    iconActive: <Icon.DashboardActive />,
    href: '/dashboard',
  },
  {
    title: 'Stake',
    key: 'stake',
    icon: <Icon.Stake />,
    iconActive: <Icon.StakeActive />,
    href: '/stake',
  },
  {
    title: 'Launchpad',
    key: 'launchpad',
    icon: <Icon.Trade />,
    iconActive: <Icon.TradeActive />,
    href: '/launchpad',
  },
  {
    title: 'Marketplace',
    key: 'marketplace',
    icon: <Icon.Marketplace />,
    iconActive: <Icon.MarketplaceActive />,
    href: '/marketplace',
  },
  {
    title: 'Wallet',
    key: 'wallet',
    icon: <Icon.Wallet />,
    iconActive: <Icon.WalletActive />,
    href: '/wallet',
  },
]

export const MobileNav = () => {
  const location = useLocation()
  return (
    <div className='h-[65px] border-t grid grid-cols-5 place-items-center'>
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className='flex flex-col gap-1 justify-center items-center'
        >
          {location.pathname.includes(item.href) ? item.iconActive : item.icon}
          <span
            className={`${location.pathname.includes(item.href) ? 'text-red-500' : null}`}
          >
            {/* {item.title} */}
          </span>
        </Link>
      ))}
    </div>
  )
}
