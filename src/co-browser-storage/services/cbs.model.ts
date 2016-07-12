import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/find'

import {cbsConfig} from './cbs.config'
import * as cbsUtil from './cbs.util'

import {UPDATE_CBS_ITEM} from './cbs.reducer'

export interface IStorageItem {
  key: string,
  value?: any,
  storageType?: string,
  valueType?: string
}

@Injectable()
export class CbsModel {
  private cbsReducer$ = this.store.select('cbsReducer');

  constructor (private store: Store<any>) {}

  // Update in @ngrx/store and in browser storage
  public updateItem (updatedItem: IStorageItem) {
    // Get current item from LS to complete missing properties.
    let dbConfig = cbsUtil.getConfigFromLS()
    let existingItem = dbConfig[cbsConfig.DB_INITIAL_KEY].find(initialItem => {
      return updatedItem.key === initialItem.key
    })
    let updatedItemPatched = Object.assign({}, existingItem, updatedItem)
    cbsUtil.saveItemToBrowserStorage(updatedItemPatched)
    this.store.dispatch({
      type: UPDATE_CBS_ITEM,
      payload: updatedItemPatched
    })
  }

  // Update a list of items
  public updateItems (items: Array<IStorageItem>) {
    items.forEach(i => this.updateItem(i))
  }

  // Reset item to original value
  public resetItem (itemToReset: IStorageItem) {
    let initialItem = cbsConfig.initialState.find((schemaItem) => {
      return itemToReset.key === schemaItem.key
    })

    if (initialItem) {
      this.updateItem(initialItem)
    }
  }

  // Reset all items to original value
  public resetAll () {
    this.updateItems(cbsConfig.initialState)
  }

  // Get observable for one specific item
  public getItemByKey (key): Observable<any> {
    return this.cbsReducer$
      .map((browserStorageItems:[any]) => {
        return browserStorageItems.find(item => item.key === key)
      })
  }

  // Assess if provided keys' values === 'true'
  // Useful for debug flags.
  // Ex: truthy ('debugMode')
  // Ex: truthy(['debugMode', 'offlineMode'])
  public truthy (keys: [string] | string): Observable<any> {
    let keysArr
    if (Array.isArray(keys)) {
      keysArr = keys
    } else if (typeof keys === 'string') {
      keysArr = [keys]
    }
    return this.cbsReducer$
      .map((items:[any]) => {
        if (items.length === 0) {
          return false
        }
        return items.every(item => {
          return keysArr.indexOf(item.key) === -1 || item.value === 'true'
        })
      })
  }
}
