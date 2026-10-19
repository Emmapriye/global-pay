'use client'

import { createContext, useContext, useState } from 'react'

type BalanceVisibility = {
  hidden: boolean
  toggle: () => void
}

const BalanceVisibilityContext = createContext<BalanceVisibility>({ hidden: false, toggle: () => {} })

export function BalanceVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false)
  return (
    <BalanceVisibilityContext.Provider value={{ hidden, toggle: () => setHidden((value) => !value) }}>
      {children}
    </BalanceVisibilityContext.Provider>
  )
}

export function useBalanceVisibility() {
  return useContext(BalanceVisibilityContext)
}
