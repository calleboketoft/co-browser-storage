import {Injectable} from 'angular2/core'

@Injectable()
export class PersistanceService {
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
    // Note: TS complained about window[storageType].removeItem(key)
    switch (kvp.storageType) {
      case 'localStorage':
        window.localStorage.removeItem(this.options.namespace + '.' + kvp.key)
        break;
      case 'sessionStorage':
        window.sessionStorage.removeItem(this.options.namespace + '.' + kvp.key)
        break;
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
      updatedConfig = this.initFromScratch (options)
    } else {
      // a current state is existing, validate against schema
      updatedConfig = this.initExisting (options.namespace, dbConfig)
    }
    return updatedConfig[this.DB_MEMORY_KEY]
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
          return {
            key: memoryItem.key,
            value: actualValue,
            type: 'string', // Tampered item defaults to type 'string'
            storageType: memoryItem.storageType
          }
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
      // format the schema to the memory type, simply set the memory value to the default form schema
      window[schemaItem.storageType][options.namespace + '.' + schemaItem.key] = schemaItem.default
      return {
        key: schemaItem.key,
        value: schemaItem.default,
        type: schemaItem.type,
        storageType: schemaItem.storageType
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
    dbConfig[this.DB_MEMORY_KEY] = stateArr
    this.setConfigToLS(dbConfig)
  }
}
