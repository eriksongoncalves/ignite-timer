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
  activeCycle?: Cycle
  activeCycleId?: string
  amountSecondsPassed: number
  markCurrentCycleAsFinished(): void
  setSecondsPassed(value: number): void
}

export type CycleProviderProps = {
  children: ReactNode
} & ContextProps
