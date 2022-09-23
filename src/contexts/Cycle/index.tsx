import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { cycleReducer, INITIAL_CYCLE_STATE } from '../../reducers/Cycle'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction
} from '../../reducers/Cycle/actions'
import { ContextProps, CreateNewCycleDto, CycleProviderProps } from './types'

const STORAGE_KEY = '@igniteTimer:cyclesState-1.0.0'
const Context = createContext({} as ContextProps)

export const CycleProvider = ({ children }: CycleProviderProps) => {
  const [cycleState, dispatch] = useReducer(
    cycleReducer,
    INITIAL_CYCLE_STATE,
    () => {
      const storageAsJson = localStorage.getItem(STORAGE_KEY)

      if (storageAsJson) {
        return JSON.parse(storageAsJson)
      }

      return INITIAL_CYCLE_STATE
    }
  )

  const { cycles, activeCycleId } = cycleState
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJson = JSON.stringify(cycleState)

    localStorage.setItem(STORAGE_KEY, stateJson)
  }, [cycleState])

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
