import { createContext, useContext } from 'react'
import { ContextProps, CycleProviderProps } from './types'

const Context = createContext({} as ContextProps)

export const CycleProvider = ({ children, ...values }: CycleProviderProps) => {
  return <Context.Provider value={values}>{children}</Context.Provider>
}

export const useCycleContext = () => {
  const context = useContext(Context)

  return context
}
