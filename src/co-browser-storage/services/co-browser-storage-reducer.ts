import {Reducer, Action} from '@ngrx/store'

export const ADDED_CO_STORE_ITEM = 'ADDED_CO_STORE_ITEM'
export const UPDATE_CO_STORE_ITEM = 'UPDATE_CO_STORE_ITEM'
export const REMOVED_CO_STORE_ITEM = 'REMOVED_CO_STORE_ITEM'
export const INIT_CO_STORE_ITEMS = 'INIT_CO_STORE_ITEMS'

// Send in initial state here, defaults to an empty array of kvp:s
// Actions come with a type and payload (destructuring second arg to 'type' and 'payload')
export const coBrowserStorageReducer = (state = [], {type, payload}) => {
  switch (type) {

    case INIT_CO_STORE_ITEMS:
      // Set all at once
      return payload

    case ADDED_CO_STORE_ITEM:
      // create a new array with the previous and new kvp:s
      return state.concat([Object.assign({}, payload)])

    case UPDATE_CO_STORE_ITEM:
      // if it's not the interesting kvp, just return it,
      // otherwise create a new kvp for it
      return state.map(kvp => {
        return kvp.key !== payload.key ?
          kvp :
          Object.assign({}, kvp, payload) // create copy of it
      })

    case REMOVED_CO_STORE_ITEM:
      // filter out the kvp to remove
      return state.filter((kvp) => {
        return kvp.key !== payload.key
      })

    default:
      return state
  }
}
