import { Cycle } from '../../reducers/Cycle/types'

export type ContextProps = {
  cycles: Cycle[]
  activeCycle?: Cycle
  activeCycleId?: string
  amountSecondsPassed: number
  markCurrentCycleAsFinished(): void
  setSecondsPassed(value: number): void
  createNewCycle(data: CreateNewCycleDto): void
  interruptCycle(): void
}

export type CycleProviderProps = {
  children: React.ReactNode
}

export type CreateNewCycleDto = {
  task: string
  minutesAmount: number
}
