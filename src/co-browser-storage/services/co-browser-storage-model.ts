// Handles all actions towards localStorage and sessionStorage

import {Injectable} from 'angular2/core'
import {Store} from '@ngrx/store'

import * as CoBrowserStorageActions from './co-browser-storage-reducer'

@Injectable()
export class CoBrowserStorageModel {
  /**
   * in localStorage, the config is saved like this
   * CO_BROWSER_DB = {
   *   MEMORY_STATE: [], // current state from app
   *   INITIAL_SCHEMA: [] // initial state from when initializing app
   * }
   */
  private DB_CONFIG_KEY = 'CO_BROWSER_DB';
  private DB_MEMORY_KEY = 'MEMORY_STATE';
  private DB_INITIAL_KEY = 'INITIAL_SCHEMA';
  private options;
  private coBrowserStorageReducer;

  constructor (private store: Store<any>) {
    this.coBrowserStorageReducer = store.select('coBrowserStorageReducer')
  }

  saveItem (item) {
    // First save individual storage item
    window[item.storageType]['setItem'](this.options.namespace + '.' + item.key, item.value)
    // Update memory object
    let dbConfig = this.getConfigFromLS()
    // Remove item if its already in memory object
    let updDbConfig = dbConfig[this.DB_MEMORY_KEY].filter((memItem) => item.key !== memItem.key)
    // then add the updated item
    updDbConfig.push(item)
    this.setConfigToLS(updDbConfig)
  }

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
    let resettedItem = this.getItemFromSchema(item.key)
    if (resettedItem) {
      this.updateItem(item)
    }
  }

  removeItem (item) {
    // Remove item from storage
    window[item.storageType]['removeItem'](this.options.namespace + '.' + item.key)
    // Remove item from memory object
    let dbConfig = this.getConfigFromLS()
    let updDbConfig = dbConfig[this.DB_MEMORY_KEY].filter((memItem) => item.key !== memItem.key)
    this.setConfigToLS(updDbConfig)
    this.store.dispatch({
      type: CoBrowserStorageActions.REMOVED_CO_STORE_ITEM,
      payload: item
    })
  }

  // Serialize / Deserialize storage data
  // ------------------------------------
  setConfigToLS (configObj) {
    let configStr = JSON.stringify(configObj)
    window.localStorage[this.options.namespace + '.' + this.DB_CONFIG_KEY] = configStr
  }

  getConfigFromLS () {
    let configStr = localStorage[this.options.namespace + '.' + this.DB_CONFIG_KEY]
    if (typeof configStr === 'undefined') {
      return null
    } else {
      return JSON.parse(configStr)
    }
  }

  // Initialize
  // ----------
  initialize (options) {
    this.options = options
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
      type: CoBrowserStorageActions.INIT_CO_STORE_ITEMS,
      payload: updatedConfig[this.DB_MEMORY_KEY]
    })
    return
  }

  // this function works on items that are in the schema
  getItemFromSchema (itemKey) {
    let schemaItem = this.options['initialState'].filter((item) => {
      return itemKey === item.key
    })[0]
    if (schemaItem) {
      return {
        key: itemKey,
        value: schemaItem.default,
        storageType: schemaItem.storageType,
        valueType: schemaItem.valueType,
        inConfigFile: true
      }
    }
    return
  }

  // Validate each existing item from storage against the memory
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

  // Initialize the storage from scratch
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
