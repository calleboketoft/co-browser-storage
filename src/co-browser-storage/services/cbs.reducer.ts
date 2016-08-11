import { Reducer, Action } from '@ngrx/store'

export const ADDED_CBS_ITEMS = 'ADDED_CBS_ITEMS'
export const UPDATE_CBS_ITEM = 'UPDATE_CBS_ITEM'

export const cbsReducer = (state = [], {type, payload}) => {
  switch (type) {

    case ADDED_CBS_ITEMS:
      return payload

    case UPDATE_CBS_ITEM:
      return state.map(item => {
        return item.key !== payload.key ? item : Object.assign({}, item, payload)
      })

    default:
      return state
  }
}
