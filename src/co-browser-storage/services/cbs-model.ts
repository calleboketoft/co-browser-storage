// Handles all actions towards localStorage and sessionStorage

// The config is saved like this in localStorage
// CO_BROWSER_DB = {
//   MEMORY_STATE: [], // current state from app
//   INITIAL_SCHEMA: [] // initial state from when initializing app
// }

import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/find'

import {cbsConfig} from './cbs-config'
import * as cbsUtil from './cbs-util'

import {
  UPDATE_CBS_ITEM,
  ADDED_CBS_ITEMS
} from './cbs-reducer'

export interface IStorageItem {
  key: string,
  value?: any,
  storageType?: string,
  valueType?: string
}

@Injectable()
export class CbsModel {
  private cbsReducer$;

  constructor (private store: Store<any>) {
    this.cbsReducer$ = this.store.select('cbsReducer')
  }

  // Update
  // ------
  public updateItem (item: IStorageItem) {
    // Get current item from LS to complete missing properties.
    let dbConfig = cbsUtil.getConfigFromLS()
    let existingItem = dbConfig[cbsConfig.DB_MEMORY_KEY].filter(memItem => item.key === memItem.key)[0]
    if (!existingItem) {
      console.error('item does not exist')
    }
    let updatedItem = Object.assign({}, existingItem, item)
    this.saveItem(updatedItem)
    this.store.dispatch({
      type: UPDATE_CBS_ITEM,
      payload: updatedItem
    })
  }

  private saveItem (item: IStorageItem) {
    // Save item to browser storage
    window[item.storageType].setItem(cbsUtil.getFullCbsKey(item.key), item.value)
    // Remove any existing item with the same key from memory object and add the new one
    let dbConfig = cbsUtil.getConfigFromLS()
    dbConfig[cbsConfig.DB_MEMORY_KEY] = dbConfig[cbsConfig.DB_MEMORY_KEY].filter(memItem => item.key !== memItem.key)
    dbConfig[cbsConfig.DB_MEMORY_KEY].push(item)
    cbsUtil.setConfigToLS(dbConfig)
  }

  // Convenience functions
  // ---------------------

  public updateItems (items: Array<IStorageItem>) {
    items.forEach(i => this.updateItem(i))
  }

  public resetItem (item: IStorageItem) {
    let resetdItem
    let schemaItem = cbsConfig.initialState.filter((schemaItem) => {
      return item.key === schemaItem.key
    })[0]
    if (schemaItem) {
      resetdItem = {
        key: item.key,
        value: schemaItem.default,
        storageType: schemaItem.storageType,
        valueType: schemaItem.valueType
      }
    }

    if (resetdItem) {
      this.updateItem(resetdItem)
    }
  }

  public resetAll () {
    let initialItems = cbsConfig.initialState.map((i) => {
      return {
        storageType: i.storageType,
        value: i.default,
        key: i.key,
        valueType: i.valueType
      }
    })
    this.updateItems(initialItems)
  }

  // Get observable for one specific item
  public getItemByKey (key): Observable<any> {
    return this.cbsReducer$
      .map((browserStorageItems) => {
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
      .map(items => {
        if (items.length === 0) return false
        return items.every(item => {
          return keysArr.indexOf(item.key) === -1 || item.value === 'true'
        })
      })
  }
}