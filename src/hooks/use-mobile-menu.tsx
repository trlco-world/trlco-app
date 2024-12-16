import React from 'react'

type MobileMenuContext = {
  isProfileOpen: boolean
  toggleProfile: () => void
}

const MobileMenuContext = React.createContext<MobileMenuContext | undefined>(
  undefined,
)

export const MobileMenuProvider = ({ children }: React.PropsWithChildren) => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false)

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev)
  }

  return (
    <MobileMenuContext.Provider value={{ isProfileOpen, toggleProfile }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

export const useMobileMenu = () => {
  const context = React.useContext(MobileMenuContext)
  if (!context) {
    throw new Error('useMobileMenu must be used within a UserMenuProvider')
  }
  return context
}
