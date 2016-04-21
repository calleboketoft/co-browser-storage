// Handles all actions towards localStorage and sessionStorage

// The config is saved like this in localStorage
// CO_BROWSER_DB = {
//   MEMORY_STATE: [], // current state from app
//   INITIAL_SCHEMA: [] // initial state from when initializing app
// }

import {Injectable} from 'angular2/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs/Rx'

import * as cbsActions from './cbs-reducer'

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
  private _options;
  private _cbsReducer;

  constructor (private _store: Store<any>) {
    this._cbsReducer = this._store.select('cbsReducer')
  }

  private _saveItem (item: IStorageItem) {
    // Save item to browser storage
    window[item.storageType].setItem(this.getFullKey(item.key), item.value)
    // Remove any existing item with the same key from memory object and add the new one
    let dbConfig = this._getConfigFromLS()
    dbConfig[this._DB_MEMORY_KEY] = dbConfig[this._DB_MEMORY_KEY].filter(memItem => item.key !== memItem.key)
    dbConfig[this._DB_MEMORY_KEY].push(item)
    this._setConfigToLS(dbConfig)
  }

  // CRUD
  // ----
  public createItem (item: IStorageItem) {
    let dbConfig = this._getConfigFromLS()
    let existingItem = dbConfig[this._DB_MEMORY_KEY].filter(memItem => item.key === memItem.key)[0]
    if (existingItem) {
      console.error('item already exists')
    }
    let safeItem = {
      key: item.key,
      value: item.value || '',
      storageType: item.storageType || 'localStorage',
      valueType: item.valueType || 'text'
    }
    this._saveItem(safeItem)
    this._store.dispatch({
      type: cbsActions.ADDED_CBS_ITEM,
      payload: safeItem
    })
  }

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
      type: cbsActions.UPDATE_CBS_ITEM,
      payload: updatedItem
    })
  }

  public updateItems (items: Array<IStorageItem>) {
    items.forEach(i => this.updateItem(i))
  }

  public resetItem (item: IStorageItem) {
    let resetdItem
    let schemaItem = this._options.initialState.filter((schemaItem) => {
      return item.key === schemaItem.key
    })[0]
    if (schemaItem) {
      resetdItem = {
        key: item.key,
        value: schemaItem.default,
        storageType: schemaItem.storageType,
        valueType: schemaItem.valueType,
        inConfigFile: true
      }
    }

    if (resetdItem) {
      this.updateItem(resetdItem)
    }
  }

  public resetAll () {
    let initialItems = this._options.initialState.map((i) => {
      return {
        storageType: i.storageType,
        value: i.default,
        key: i.key,
        valueType: i.valueType
      }
    })
    this.updateItems(initialItems)
  }

  public removeItem (item: IStorageItem) {
    let dbConfig = this._getConfigFromLS()
    let existingItem = dbConfig[this._DB_MEMORY_KEY].filter(memItem => item.key === memItem.key)[0]
    // Remove item from storage
    window[existingItem.storageType]['removeItem'](this.getFullKey(item.key))
    // Remove item from memory object
    dbConfig[this._DB_MEMORY_KEY] = dbConfig[this._DB_MEMORY_KEY].filter((memItem) => item.key !== memItem.key)
    this._setConfigToLS(dbConfig)
    this._store.dispatch({
      type: cbsActions.REMOVED_CBS_ITEM,
      payload: item
    })
  }

  // Returns the key including the namespace
  public getFullKey (key) {
    return this._options.namespace + '.' + key
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
    let configStr = localStorage[this.getFullKey(this._DB_CONFIG_KEY)]
    if (typeof configStr === 'undefined') {
      return null
    } else {
      return JSON.parse(configStr)
    }
  }

  private _setConfigToLS (configObj) {
    let configStr = JSON.stringify(configObj)
    window.localStorage[this.getFullKey(this._DB_CONFIG_KEY)] = configStr
  }

  // Initialize component upon load
  // ------------------------------
  public initialize (options) {
    this._options = options // save options to class
    var dbConfig = this._getConfigFromLS()
    let updatedConfig
    if (!dbConfig) {
      // there is no current state stored, initialize from scratch
      updatedConfig = this._initFromScratch(options)
    } else {
      // a current state is existing, validate against schema
      updatedConfig = this._initExisting(options.namespace, dbConfig)
    }
    this._store.dispatch({
      type: cbsActions.ADDED_CBS_ITEMS,
      payload: updatedConfig[this._DB_MEMORY_KEY]
    })
    return
  }

  // Validate each existing item from storage against the memory object
  private _initExisting (namespace, dbConfig) {
    let actualMemory = dbConfig[this._DB_MEMORY_KEY].map((memoryItem) => {
      var storageItem = window[memoryItem.storageType][this.getFullKey(memoryItem.key)]
      if (typeof storageItem === 'undefined') {
        // the item doesn't exist at all, set it
        window[memoryItem.storageType][this.getFullKey(memoryItem.key)] = memoryItem.value
        return memoryItem
      } else {
        let actualValue = window[memoryItem.storageType][this.getFullKey(memoryItem.key)]
        if (actualValue === memoryItem.value) {
          // the value has not been touched outside of this GUI
          return memoryItem
        } else {
          // the value has been manually modified by a user
          let updatedMemoryItem = {
            key: memoryItem.key,
            value: actualValue,
            storageType: memoryItem.storageType,
            valueType: memoryItem.valueType,
            inConfigFile: !!memoryItem.inConfigFile
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
      window[schemaItem.storageType][this.getFullKey(schemaItem.key)] = schemaItem.default
      return {
        key: schemaItem.key,
        value: schemaItem.default, // from scratch, the default is the value
        storageType: schemaItem.storageType,
        valueType: schemaItem.valueType,
        inConfigFile: true // only the ones from the config file are here, used for 'reset' functionality
      }
    })
    let dbConfig = {}
    dbConfig[this._DB_INITIAL_KEY] = options.initialState
    dbConfig[this._DB_MEMORY_KEY] = stateForMemory
    this._setConfigToLS(dbConfig)
    return dbConfig
  }
}
