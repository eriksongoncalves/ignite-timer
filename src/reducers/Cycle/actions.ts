import { ActionsCycle, Cycle } from './types'

export const addNewCycleAction = (
  data: Omit<Cycle, 'interruptedDate' | 'fineshedDate'>
) => ({
  type: ActionsCycle.ADD_NEW_CYCLE,
  payload: data
})

export const markCurrentCycleAsFinishedAction = () => ({
  type: ActionsCycle.MARK_CURRENT_CYCLE_AS_FINISHED
})

export const interruptCurrentCycleAction = () => ({
  type: ActionsCycle.INTERRUPT_CURRENT_CYCLE
})
