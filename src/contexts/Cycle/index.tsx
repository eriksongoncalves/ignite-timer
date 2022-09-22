import { createContext, useContext, useState } from 'react'
import {
  ContextProps,
  CreateNewCycleDto,
  Cycle,
  CycleProviderProps
} from './types'

const Context = createContext({} as ContextProps)

export const CycleProvider = ({ children }: CycleProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string>()
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const markCurrentCycleAsFinished = () => {
    setCycles(prevCycles =>
      prevCycles.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            fineshedDate: new Date()
          }
        }

        return cycle
      })
    )
  }

  const setSecondsPassed = (value: number) => {
    setAmountSecondsPassed(value)
  }

  const createNewCycle = (data: CreateNewCycleDto) => {
    const cycleId = String(new Date().getTime())

    const newCycle = {
      id: cycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles(state => [...state, newCycle])
    setActiveCycleId(cycleId)
    setAmountSecondsPassed(0)
  }

  const interruptCycle = () => {
    setActiveCycleId(undefined)
    setCycles(prevCycles =>
      prevCycles.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date()
          }
        }

        return cycle
      })
    )
  }

  return (
    <Context.Provider
      value={{
        cycles,
        activeCycleId,
        activeCycle,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCycle
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useCycleContext = () => {
  const context = useContext(Context)

  return context
}
