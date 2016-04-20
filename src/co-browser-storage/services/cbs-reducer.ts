import {Reducer, Action} from '@ngrx/store'

export const ADDED_CBS_ITEMS = 'ADDED_CBS_ITEMS'
export const ADDED_CBS_ITEM = 'ADDED_CBS_ITEM'
export const UPDATE_CBS_ITEM = 'UPDATE_CBS_ITEM'
export const REMOVED_CBS_ITEM = 'REMOVED_CBS_ITEM'

export const cbsReducer = (state = [], {type, payload}) => {
  switch (type) {

    case ADDED_CBS_ITEMS:
      // Set all at once
      return payload

    case ADDED_CBS_ITEM:
      // create a new array with the previous and new items
      return state.concat([Object.assign({}, payload)])

    case UPDATE_CBS_ITEM:
      // if it's not the item being updated, just return it,
      // otherwise create a new item for it
      return state.map(item => {
        return item.key !== payload.key ?
          item :
          Object.assign({}, item, payload) // create copy of it
      })

    case REMOVED_CBS_ITEM:
      // filter out the item to remove
      return state.filter((item) => {
        return item.key !== payload.key
      })

    default:
      return state
  }
}
