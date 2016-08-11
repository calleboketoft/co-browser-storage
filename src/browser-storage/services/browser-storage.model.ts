import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/find'

import { browserStorageConfig } from './browser-storage.config'
import * as browserStorageUtil from './browser-storage.util'

import { UPDATE_BROWSER_STORAGE_ITEM } from './browser-storage.reducer'

export interface IStorageItem {
  key: string,
  value?: any,
  storageType?: string,
  valueType?: string
}

@Injectable()
export class BrowserStorageModel {
  private browserStorageReducer$ = this.store.select('browserStorageReducer');

  constructor (private store: Store<any>) {}

  // Update in @ngrx/store and in browser storage
  public updateItem (updatedItem: IStorageItem) {
    // Get current item from LS to complete missing properties.
    let dbConfig = browserStorageUtil.getConfigFromLS()
    let existingItem = dbConfig[browserStorageConfig.DB_INITIAL_KEY].find(initialItem => {
      return updatedItem.key === initialItem.key
    })
    let updatedItemPatched = Object.assign({}, existingItem, updatedItem)
    browserStorageUtil.saveItemToBrowserStorage(updatedItemPatched)
    this.store.dispatch({
      type: UPDATE_BROWSER_STORAGE_ITEM,
      payload: updatedItemPatched
    })
  }

  // Update a list of items
  public updateItems (items: Array<IStorageItem>) {
    items.forEach(i => this.updateItem(i))
  }

  // Reset item to original value
  public resetItem (itemToReset: IStorageItem) {
    let initialItem = browserStorageConfig.initialState.find((schemaItem) => {
      return itemToReset.key === schemaItem.key
    })

    if (initialItem) {
      this.updateItem(initialItem)
    }
  }

  // Reset all items to original value
  public resetAll () {
    this.updateItems(browserStorageConfig.initialState)
  }

  // Get observable for one specific item
  public getItemByKey (key): Observable<any> {
    return this.browserStorageReducer$
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
    return this.browserStorageReducer$
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
