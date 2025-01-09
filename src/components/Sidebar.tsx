import { Link, useLocation } from '@tanstack/react-router'
import { Icon } from './icon'
import logo from '/logo.svg'

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
    title: 'Buy',
    key: 'buy',
    icon: <Icon.Trade />,
    iconActive: <Icon.TradeActive />,
    href: '/buy',
  },
  {
    title: 'Wallet',
    key: 'wallet',
    icon: <Icon.Wallet />,
    iconActive: <Icon.WalletActive />,
    href: '/wallet',
  },
  {
    title: 'Marketplace',
    key: 'marketplace',
    icon: <Icon.Marketplace />,
    iconActive: <Icon.MarketplaceActive />,
    href: '/marketplace',
  },
  // {
  //   title: 'Secondary Marketplace',
  //   key: 'trade',
  //   icon: <Icon.Trade />,
  //   iconActive: <Icon.TradeActive />,
  //   href: '/trade',
  // },
]

// const profileItems = [
//   {
//     title: 'Portfolio',
//     key: 'portfolio',
//     icon: <Icon.Portfolio />,
//     iconActive: <Icon.PortfolioActive />,
//     href: '/portfolio',
//   },
//   {
//     title: 'Preferences',
//     key: 'preferences',
//     icon: <Icon.Preference />,
//     iconActive: <Icon.PreferenceActive />,
//     href: '/preference',
//   },
// ]

export default function Sidebar() {
  const location = useLocation()
  return (
    <div className='min-w-[270px] h-full rounded-r-[40px] bg-white'>
      <div className='p-5'>
        <img src={logo} width={58.78} height={40} alt='TRL' />
      </div>
      <div className='grid gap-5 py-5 pl-5'>
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`relative pl-5 py-3 font-medium rounded-l-full flex items-center space-x-3 ${
              location.pathname.includes(item.href)
                ? 'menu-active'
                : 'text-gray-700'
            }`}
          >
            {location.pathname.includes(item.href)
              ? item.iconActive
              : item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      {/* Divider */}
      {/* <div className='mx-5 my-5 border-t border-gray-300'></div> */}

      {/* Profile Label */}
      {/* <div className='pb-2 pl-5 text-sm font-light text-gray-500'>
        My profile
      </div> */}

      {/* <div className='grid gap-5 pl-5'>
        {profileItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`relative pl-5 py-3 font-medium rounded-l-full flex items-center space-x-3 ${
              location.pathname.includes(item.href)
                ? 'menu-active'
                : 'text-gray-700'
            }`}
          >
            {location.pathname.includes(item.href)
              ? item.iconActive
              : item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div> */}
    </div>
  )
}
