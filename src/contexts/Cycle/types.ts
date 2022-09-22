import { ReactNode } from 'react'

export type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  fineshedDate?: Date
}

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
  children: ReactNode
}

export type CreateNewCycleDto = {
  task: string
  minutesAmount: number
}
