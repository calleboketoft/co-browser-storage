import {Injectable} from 'angular2/core'

@Injectable()
export class PersistenceService {
  /**
   * in localStorage, the config is saved like this
   * DB_CONFIG = {
   *   MEMORY_STATE: [], // current state from app
   *   INITIAL_SCHEMA: [] // initial state from when initializing app
   * }
   */
  private DB_CONFIG_KEY = 'CO_BROWSER_DB';
  private DB_MEMORY_KEY = 'MEMORY_STATE';
  private DB_INITIAL_KEY = 'INITIAL_SCHEMA';
  private options;

  setConfigToLS (configObj) {
    let configStr = JSON.stringify(configObj)
    window.localStorage[this.DB_CONFIG_KEY] = configStr
  }

  getConfigFromLS () {
    let configStr = localStorage[this.DB_CONFIG_KEY]
    if (typeof configStr === 'undefined') {
      return null
    } else {
      return JSON.parse(configStr)
    }
  }

  removeItem (kvp) {
    window[kvp.storageType]['removeItem'](kvp.key)
  }

  // Initialize
  // ----------
  initialize (options) {
    this.options = options
    var dbConfig = this.getConfigFromLS()
    let updatedConfig
    if (!dbConfig) {
      // there is no current state stored, initialize from scratch
      updatedConfig = this.initFromScratch (options)
    } else {
      // a current state is existing, validate against schema
      updatedConfig = this.initExisting (options.namespace, dbConfig)
    }
    return updatedConfig[this.DB_MEMORY_KEY]
  }

  resetItem (itemKey) {
    let schemaItem = this.options[this.DB_INITIAL_KEY].filter((item) => {
      return itemKey === item.key
    })[0]
    if (schemaItem) {
      window[schemaItem.storageType][this.options.namespace + '.' + schemaItem.key] = schemaItem.value
    }
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
        inConfigFile: true // only the ones from the config file are here, used for 'reset' functionality
      }
    })
    let dbConfig = {}
    dbConfig[this.DB_INITIAL_KEY] = options.initialState
    dbConfig[this.DB_MEMORY_KEY] = stateForMemory
    this.setConfigToLS(dbConfig)
    return dbConfig
  }

  // Save state
  // ----------
  saveState (stateArr) {
    // Save all items like window.localStorage['coBrowserNamespace.myKey'] = 'my value'
    let that = this // how come this is needed?
    stateArr.forEach((stateItem) => {
      window[stateItem.storageType][that.options.namespace + '.' + stateItem.key] = stateItem.value
    })

    let dbConfig = this.getConfigFromLS()
    // Save the whole memory object
    dbConfig[this.DB_MEMORY_KEY] = stateArr
    this.setConfigToLS(dbConfig)
  }
}
