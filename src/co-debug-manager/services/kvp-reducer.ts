import {Reducer, Action} from '@ngrx/store'

export const ADD_KVP = 'ADD_KVP'
export const UPDATE_KVP = 'UPDATE_KVP'
export const REMOVE_KVP = 'REMOVE_KVP'
export const INIT_KVPS = 'INIT_KVPS'

// Send in initial state here, defaults to an empty array of kvp:s
// Actions come with a type and payload (destructuring second arg to 'type' and 'payload')
export const kvpReducer = (state = [], {type, payload}) => {
  console.log('ACTION:', type, payload)
  switch (type) {

    case INIT_KVPS:
      // Set all at once
      return payload

    case ADD_KVP:
      // create a new array with the previous and new kvp:s
      return state.concat([Object.assign({}, payload)])

    case UPDATE_KVP:
      // if it's not the interesting kvp, just return it,
      // otherwise create a new kvp for it
      return state.map(kvp => {
        return kvp.key !== payload.key ?
          kvp :
          Object.assign({}, kvp, payload) // create copy of it
      })

    case REMOVE_KVP:
      // filter out the kvp to remove
      return state.filter((kvp) => {
        return kvp.key !== payload.key
      })

    default:
      return state
  }
}
