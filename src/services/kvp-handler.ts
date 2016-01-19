//counter.ts
import {Reducer, Action} from '@ngrx/store'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const RESET = 'RESET'

// Send in initial state here, defaults to number 0
export const kvpHandler: Reducer<number> = (state: number = 0, action: Action) => {

  switch (action.type) {
    case INCREMENT:
      return state + 1

    case DECREMENT:
      return state - 1

    case RESET:
      return 0

    default:
      return state
  }
}
