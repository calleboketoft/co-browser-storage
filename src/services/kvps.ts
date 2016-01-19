//counter.ts
import {Reducer, Action} from '@ngrx/store'

export const ADD_KVP = 'ADD_KVP'
export const UPDATE_KVP = 'UPDATE_KVP'
export const REMOVE_KVP = 'REMOVE_KVP'

// Send in initial state here, defaults to an empty array of kvp:s
// Actions come with a type and payload (destructuring second arg to 'type' and 'payload')
export const kvps = (state = [], {type, payload}) => {
  // console.log('ACTION:', type, payload)
  switch (type) {
    case ADD_KVP:
      // create a new array with the previous and new kvp:s
      return state.concat([Object.assign({}, payload, {id: state.length + 1})])

    case UPDATE_KVP:
      return

    case REMOVE_KVP:
      // return filtered kvp:s
      return state.map((kvp) => {
        return kvp.id !== payload.id
      })

    default:
      return state
  }
}
