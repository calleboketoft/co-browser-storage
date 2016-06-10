import {
  cbsConfig,
  setCbsConfig
} from './cbs-config'

export {
  getConfigFromLS,
  setConfigToLS,
  initializeCbs,
  getFullCbsKey,
  getInitialCbsState,
  saveItemToBrowserStorage
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

function initializeCbs (cbsConfigFromFile) {
  // The "ruling" config is the one from the file, set it first
  setCbsConfig(cbsConfigFromFile)
  var cbsConfigFromLS = getConfigFromLS()
  var resultCbsConfig
  if (!cbsConfigFromLS) {
    // first run, no existing state in localStorage
    resultCbsConfig = initFromScratch(cbsConfigFromFile)
  } else {
    // a current state is existing, validate against schema
    resultCbsConfig = initExisting(cbsConfigFromFile.namespace, cbsConfigFromLS)
  }
  setConfigToLS(resultCbsConfig)
}

// Initialize the storage items from scratch
function initFromScratch (cbsConfigFromFile) {
  cbsConfigFromFile.initialState.forEach((item) => saveItemToBrowserStorage(item))
  return {
    [cbsConfig.DB_INITIAL_KEY]: cbsConfigFromFile.initialState,
    [cbsConfig.DB_MEMORY_KEY]: cbsConfigFromFile.initialState
  }
}

// Validate each existing item from storage against the memory object
function initExisting (cbsConfigFromFile, cbsConfigFromLS) {
  let actualMemory = cbsConfigFromLS[cbsConfig.DB_MEMORY_KEY].map((memoryItem) => {
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
  cbsConfigFromLS[cbsConfig.DB_MEMORY_KEY] = actualMemory
  setConfigToLS(cbsConfigFromLS)
  return cbsConfigFromLS
}

// Convenience function to prefix with namespace and dot
function getFullCbsKey (key) {
  return cbsConfig.namespace + '.' + key
}

function saveItemToBrowserStorage (item) {
  window[item.storageType]['setItem'](getFullCbsKey(item.key), item.value)
}