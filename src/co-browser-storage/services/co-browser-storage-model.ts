// Handles all actions towards localStorage and sessionStorage

// The config is saved like this in localStorage
// CO_BROWSER_DB = {
//   MEMORY_STATE: [], // current state from app
//   INITIAL_SCHEMA: [] // initial state from when initializing app
// }

import {Injectable} from 'angular2/core'
import {Store} from '@ngrx/store'

import * as CoBrowserStorageActions from './co-browser-storage-reducer'

@Injectable()
export class CoBrowserStorageModel {
  private DB_CONFIG_KEY = 'CO_BROWSER_DB';
  private DB_MEMORY_KEY = 'MEMORY_STATE';
  private DB_INITIAL_KEY = 'INITIAL_SCHEMA';
  private options;
  private coBrowserStorageReducer;

  constructor (private store: Store<any>) {
    this.coBrowserStorageReducer = store.select('coBrowserStorageReducer')
  }

  saveItem (item) {
    // Save item to browser storage
    window[item.storageType]['setItem'](this.options.namespace + '.' + item.key, item.value)
    // Remove any existing item with the same key from memory object and add the new one
    let dbConfig = this.getConfigFromLS()
    dbConfig[this.DB_MEMORY_KEY] = dbConfig[this.DB_MEMORY_KEY].filter(memItem => item.key !== memItem.key)
    dbConfig[this.DB_MEMORY_KEY].push(item)
    this.setConfigToLS(dbConfig)
  }

  // CRUD
  // ----
  createItem (item) {
    this.saveItem(item)
    this.store.dispatch({
      type: CoBrowserStorageActions.ADDED_CO_STORE_ITEM,
      payload: item
    })
  }

  updateItem (item) {
    this.saveItem(item)
    this.store.dispatch({
      type: CoBrowserStorageActions.UPDATE_CO_STORE_ITEM,
      payload: item
    })
  }

  resetItem (item) {
    let resetdItem
    let schemaItem = this.options['initialState'].filter((schemaItem) => {
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

  removeItem (item) {
    // Remove item from storage
    window[item.storageType]['removeItem'](this.options.namespace + '.' + item.key)
    // Remove item from memory object
    let dbConfig = this.getConfigFromLS()
    dbConfig[this.DB_MEMORY_KEY] = dbConfig[this.DB_MEMORY_KEY].filter((memItem) => item.key !== memItem.key)
    this.setConfigToLS(dbConfig)
    this.store.dispatch({
      type: CoBrowserStorageActions.REMOVED_CO_STORE_ITEM,
      payload: item
    })
  }

  // Serialize / deserialize and persist config to browser storage
  // -------------------------------------------------------------
  getConfigFromLS () {
    let configStr = localStorage[this.options.namespace + '.' + this.DB_CONFIG_KEY]
    if (typeof configStr === 'undefined') {
      return null
    } else {
      return JSON.parse(configStr)
    }
  }

  setConfigToLS (configObj) {
    let configStr = JSON.stringify(configObj)
    window.localStorage[this.options.namespace + '.' + this.DB_CONFIG_KEY] = configStr
  }

  // Initialize component upon load
  // ------------------------------
  initialize (options) {
    this.options = options // save options to class
    var dbConfig = this.getConfigFromLS()
    let updatedConfig
    if (!dbConfig) {
      // there is no current state stored, initialize from scratch
      updatedConfig = this.initFromScratch(options)
    } else {
      // a current state is existing, validate against schema
      updatedConfig = this.initExisting(options.namespace, dbConfig)
    }
    this.store.dispatch({
      type: CoBrowserStorageActions.ADDED_CO_STORE_ITEMS,
      payload: updatedConfig[this.DB_MEMORY_KEY]
    })
    return
  }

  // Validate each existing item from storage against the memory object
  initExisting (namespace, dbConfig) {
    let actualMemory = dbConfig[this.DB_MEMORY_KEY].map((memoryItem) => {
      var storageItem = window[memoryItem.storageType][namespace + '.' + memoryItem.key]
      if (typeof storageItem === 'undefined') {
        // the item doesn't exist at all, set it
        window[memoryItem.storageType][namespace + '.' + memoryItem.key] = memoryItem.value
        return memoryItem
      } else {
        let actualValue = window[memoryItem.storageType][namespace + '.' + memoryItem.key]
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
    dbConfig[this.DB_MEMORY_KEY] = actualMemory
    this.setConfigToLS(dbConfig)
    return dbConfig
  }

  // Initialize the storage items from scratch
  initFromScratch (options) {
    let stateForMemory = options.initialState.map((schemaItem) => {
      // transform the schema to the memory type
      window[schemaItem.storageType][options.namespace + '.' + schemaItem.key] = schemaItem.default
      return {
        key: schemaItem.key,
        value: schemaItem.default, // from scratch, the default is the value
        storageType: schemaItem.storageType,
        valueType: schemaItem.valueType,
        inConfigFile: true // only the ones from the config file are here, used for 'reset' functionality
      }
    })
    let dbConfig = {}
    dbConfig[this.DB_INITIAL_KEY] = options.initialState
    dbConfig[this.DB_MEMORY_KEY] = stateForMemory
    this.setConfigToLS(dbConfig)
    return dbConfig
  }
}
