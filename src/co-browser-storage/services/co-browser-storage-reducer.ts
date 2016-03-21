import {Reducer, Action} from '@ngrx/store'

export const ADDED_CO_STORE_ITEMS = 'ADDED_CO_STORE_ITEMS'
export const ADDED_CO_STORE_ITEM = 'ADDED_CO_STORE_ITEM'
export const UPDATE_CO_STORE_ITEM = 'UPDATE_CO_STORE_ITEM'
export const REMOVED_CO_STORE_ITEM = 'REMOVED_CO_STORE_ITEM'

export const coBrowserStorageReducer = (state = [], {type, payload}) => {
  switch (type) {

    case ADDED_CO_STORE_ITEMS:
      // Set all at once
      return payload

    case ADDED_CO_STORE_ITEM:
      // create a new array with the previous and new items
      return state.concat([Object.assign({}, payload)])

    case UPDATE_CO_STORE_ITEM:
      // if it's not the item being updated, just return it,
      // otherwise create a new item for it
      return state.map(item => {
        return item.key !== payload.key ?
          item :
          Object.assign({}, item, payload) // create copy of it
      })

    case REMOVED_CO_STORE_ITEM:
      // filter out the item to remove
      return state.filter((item) => {
        return item.key !== payload.key
      })

    default:
      return state
  }
}
