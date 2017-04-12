export const ADDED_BROWSER_STORAGE_ITEMS = 'ADDED_BROWSER_STORAGE_ITEMS'
export const UPDATE_BROWSER_STORAGE_ITEM = 'UPDATE_BROWSER_STORAGE_ITEM'

export const browserStorageReducer = (state = [], {type, payload}) => {
  switch (type) {

    case ADDED_BROWSER_STORAGE_ITEMS:
      return payload

    case UPDATE_BROWSER_STORAGE_ITEM:
      return state.map(item => {
        return item.key !== payload.key ? item : Object.assign({}, item, payload)
      })

    default:
      return state
  }
}
