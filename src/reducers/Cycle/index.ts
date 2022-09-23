import { produce } from 'immer'
import { ActionsCycle, CyclesState } from './types'

export const INITIAL_CYCLE_STATE: CyclesState = {
  cycles: [],
  activeCycleId: null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cycleReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case ActionsCycle.ADD_NEW_CYCLE:
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionsCycle.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        cycle => cycle.id === state.activeCycleId
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.cycles[currentCycleIndex].fineshedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionsCycle.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        cycle => cycle.id === state.activeCycleId
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}
