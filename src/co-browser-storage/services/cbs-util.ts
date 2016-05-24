import {cbsConfig, setCbsConfig} from './cbs-config'

export {
  getConfigFromLS,
  setConfigToLS,
  initializeCbs,
  getFullCbsKey,
  getInitialCbsState
}

// Serialize / deserialize and persist config to browser storage
// -------------------------------------------------------------
function getConfigFromLS () {
  let configStr = localStorage[getFullCbsKey(cbsConfig.DB_CONFIG_KEY)]
  if (typeof configStr === 'undefined') {
    return null
  } else {
    return JSON.parse(configStr)
  }
}

function setConfigToLS (configObj) {
  let configStr = JSON.stringify(configObj)
  window.localStorage[getFullCbsKey(cbsConfig.DB_CONFIG_KEY)] = configStr
}

function getInitialCbsState () {
  return getConfigFromLS()[cbsConfig.DB_MEMORY_KEY]
}

function initializeCbs (cbsConfig) {
  setCbsConfig(cbsConfig)
  var dbConfig = getConfigFromLS()
  if (!dbConfig) {
    // there is no current state stored, initialize from scratch
    initFromScratch(cbsConfig)
  } else {
    // a current state is existing, validate against schema
    initExisting(cbsConfig.namespace, dbConfig)
  }
}

// Validate each existing item from storage against the memory object
function initExisting (namespace, dbConfig) {
  let actualMemory = dbConfig[cbsConfig.DB_MEMORY_KEY].map((memoryItem) => {
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
  dbConfig[cbsConfig.DB_MEMORY_KEY] = actualMemory
  setConfigToLS(dbConfig)
  return dbConfig
}

// Initialize the storage items from scratch
function initFromScratch (options) {
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
  dbConfig[cbsConfig.DB_INITIAL_KEY] = options.initialState
  dbConfig[cbsConfig.DB_MEMORY_KEY] = stateForMemory
  setConfigToLS(dbConfig)
  return dbConfig
}

// Convenience function to prefix with namespace and dot
function getFullCbsKey (key) {
  return cbsConfig.namespace + '.' + key
}