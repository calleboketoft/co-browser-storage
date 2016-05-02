// Handles all actions towards localStorage and sessionStorage

// The config is saved like this in localStorage
// CO_BROWSER_DB = {
//   MEMORY_STATE: [], // current state from app
//   INITIAL_SCHEMA: [] // initial state from when initializing app
// }

import {Injectable} from 'angular2/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs/Rx'

import {UPDATE_CBS_ITEM, ADDED_CBS_ITEMS} from './cbs-reducer'

export interface IStorageItem {
  key: string,
  value?: any,
  storageType?: string,
  valueType?: string
}

@Injectable()
export class CbsModel {
  private _DB_CONFIG_KEY = 'CO_BROWSER_DB';
  private _DB_MEMORY_KEY = 'MEMORY_STATE';
  private _DB_INITIAL_KEY = 'INITIAL_SCHEMA';
  static config;
  private _cbsReducer;

  constructor (private _store: Store<any>) {
    this._cbsReducer = this._store.select('cbsReducer')
  }

  private _saveItem (item: IStorageItem) {
    // Save item to browser storage
    window[item.storageType].setItem(getFullCbsKey(item.key), item.value)
    // Remove any existing item with the same key from memory object and add the new one
    let dbConfig = this._getConfigFromLS()
    dbConfig[this._DB_MEMORY_KEY] = dbConfig[this._DB_MEMORY_KEY].filter(memItem => item.key !== memItem.key)
    dbConfig[this._DB_MEMORY_KEY].push(item)
    this._setConfigToLS(dbConfig)
  }

  // Update
  // ------
  public updateItem (item: IStorageItem) {
    // Get current item from LS to complete missing properties.
    let dbConfig = this._getConfigFromLS()
    let existingItem = dbConfig[this._DB_MEMORY_KEY].filter(memItem => item.key === memItem.key)[0]
    if (!existingItem) {
      console.error('item does not exist')
    }
    let updatedItem = Object.assign({}, existingItem, item)
    this._saveItem(updatedItem)
    this._store.dispatch({
      type: UPDATE_CBS_ITEM,
      payload: updatedItem
    })
  }

  // Convenience functions
  // ---------------------

  public updateItems (items: Array<IStorageItem>) {
    items.forEach(i => this.updateItem(i))
  }

  public resetItem (item: IStorageItem) {
    let resetdItem
    let schemaItem = CbsModel.config.initialState.filter((schemaItem) => {
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
    let initialItems = CbsModel.config.initialState.map((i) => {
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
  public getItemByKey (key) {
    return this._cbsReducer
      .map((browserStorageItems) => {
        return browserStorageItems.find(item => item.key === key)
      })
  }

  // Assess if provided keys' values === 'true'
  // Useful for debug flags.
  // Ex: allTrue(['DEBUG', 'DEBUG_XHR'])
  public allTrue (keys: [string]) {
    return this._cbsReducer
      .map(items => {
        if (items.length === 0) return false
        return items.every(item => {
          return keys.indexOf(item.key) === -1 || item.value === 'true'
        })
      })
  }

  // Serialize / deserialize and persist config to browser storage
  // -------------------------------------------------------------
  private _getConfigFromLS () {
    let configStr = localStorage[getFullCbsKey(this._DB_CONFIG_KEY)]
    if (typeof configStr === 'undefined') {
      return null
    } else {
      return JSON.parse(configStr)
    }
  }

  private _setConfigToLS (configObj) {
    let configStr = JSON.stringify(configObj)
    window.localStorage[getFullCbsKey(this._DB_CONFIG_KEY)] = configStr
  }

  // Initialize component upon load
  // ------------------------------
  public initialize () {
    var dbConfig = this._getConfigFromLS()
    let updatedConfig
    if (!dbConfig) {
      // there is no current state stored, initialize from scratch
      updatedConfig = this._initFromScratch(CbsModel.config)
    } else {
      // a current state is existing, validate against schema
      updatedConfig = this._initExisting(CbsModel.config.namespace, dbConfig)
    }
    this._store.dispatch({
      type: ADDED_CBS_ITEMS,
      payload: updatedConfig[this._DB_MEMORY_KEY]
    })
    return
  }

  // Validate each existing item from storage against the memory object
  private _initExisting (namespace, dbConfig) {
    let actualMemory = dbConfig[this._DB_MEMORY_KEY].map((memoryItem) => {
      var storageItem = window[memoryItem.storageType][getFullCbsKey(memoryItem.key)]
      if (typeof storageItem === 'undefined') {
        // the item doesn't exist at all, set it
        window[memoryItem.storageType][getFullCbsKey(memoryItem.key)] = memoryItem.value
        return memoryItem
      } else {
        let actualValue = window[memoryItem.storageType][getFullCbsKey(memoryItem.key)]
        if (actualValue === memoryItem.value) {
          // the value has not been touched outside of this GUI
          return memoryItem
        } else {
          // the value has been manually modified by a user
          let updatedMemoryItem = {
            key: memoryItem.key,
            value: actualValue,
            storageType: memoryItem.storageType,
            valueType: memoryItem.valueType
          }
          return updatedMemoryItem
        }
      }
    })
    dbConfig[this._DB_MEMORY_KEY] = actualMemory
    this._setConfigToLS(dbConfig)
    return dbConfig
  }

  // Initialize the storage items from scratch
  private _initFromScratch (options) {
    let stateForMemory = options.initialState.map((schemaItem) => {
      // transform the schema to the memory type
      window[schemaItem.storageType][getFullCbsKey(schemaItem.key)] = schemaItem.default
      return {
        key: schemaItem.key,
        value: schemaItem.default, // from scratch, the default is the value
        storageType: schemaItem.storageType,
        valueType: schemaItem.valueType
      }
    })
    let dbConfig = {}
    dbConfig[this._DB_INITIAL_KEY] = options.initialState
    dbConfig[this._DB_MEMORY_KEY] = stateForMemory
    this._setConfigToLS(dbConfig)
    return dbConfig
  }
}

export function setCbsConfig (config) {
  CbsModel.config = config
  return true
}

export function getFullCbsKey (key) {
  return CbsModel.config.namespace + '.' + key
}