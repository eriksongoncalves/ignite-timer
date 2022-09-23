import { createContext, useContext, useReducer, useState } from 'react'
import { cycleReducer, INITIAL_CYCLE_STATE } from '../../reducers/Cycle'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction
} from '../../reducers/Cycle/actions'
import { ContextProps, CreateNewCycleDto, CycleProviderProps } from './types'

const Context = createContext({} as ContextProps)

export const CycleProvider = ({ children }: CycleProviderProps) => {
  const [cycleState, dispatch] = useReducer(cycleReducer, INITIAL_CYCLE_STATE)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cycleState

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction)
  }

  const setSecondsPassed = (value: number) => {
    setAmountSecondsPassed(value)
  }

  const createNewCycle = (data: CreateNewCycleDto) => {
    const cycleId = String(new Date().getTime())

    dispatch(
      addNewCycleAction({
        id: cycleId,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date()
      })
    )

    setAmountSecondsPassed(0)
  }

  const interruptCycle = () => {
    dispatch(interruptCurrentCycleAction())
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
