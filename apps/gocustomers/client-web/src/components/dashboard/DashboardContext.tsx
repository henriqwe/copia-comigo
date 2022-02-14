import { createContext, ReactNode, useContext, useState } from 'react'

type DashboardContextProps = {
  test: undefined
}

type ProviderProps = {
  children: ReactNode
}
export const DashboardContext = createContext<DashboardContextProps>(
  {} as DashboardContextProps
)

export const DashboardProvider = ({ children }: ProviderProps) => {
  const [test, setTest] = useState()
  return (
    <DashboardContext.Provider value={test}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => {
  return useContext(DashboardContext)
}
