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
    resultCbsConfig = initExisting(cbsConfigFromFile, cbsConfigFromLS)
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

function initExisting (cbsConfigFromFile, cbsConfigFromLS) {
  let fixedMemoryObject = patchMemoryObjectAndStorageValues(cbsConfigFromLS)
  let fixedCbsConfig = applyCbsConfigFileUpdates({
    fileInitialState: cbsConfigFromFile.initialState,
    memoryInitialState: cbsConfigFromLS[cbsConfig.DB_INITIAL_KEY],
    memoryObject: fixedMemoryObject
  })
  return fixedCbsConfig
}

// Validate each existing item from storage against the memory object
function patchMemoryObjectAndStorageValues (cbsConfigFromLS) {
  let fixedMemoryObject = cbsConfigFromLS[cbsConfig.DB_MEMORY_KEY].map((memoryItem) => {
    var storageItemValue = getItemValueFromBrowserStorage(memoryItem)
    let fixedMemoryItem
    if (typeof storageItemValue === 'undefined') {
      // the storage item has been removed, put back from memory object
      saveItemToBrowserStorage(memoryItem)
      fixedMemoryItem = memoryItem
    } else if (storageItemValue === memoryItem.value) {
      // the value in the memory object is the same as in browser storage
      fixedMemoryItem = memoryItem
    } else {
      // the storage value has been manually modified by a user, update the memory object
      fixedMemoryItem = Object.assign({}, memoryItem, {value: storageItemValue})
    }
    return fixedMemoryItem
  })
  return fixedMemoryObject
}

// Add, update, or remove items in memoryObject and browserStorage based on file
function applyCbsConfigFileUpdates ({fileInitialState, memoryInitialState, memoryObject}) {
  // find untouched items, adde them to the patchedMemoryObject
  let patchedMemoryObject = memoryObject.filter(bsItem => {
    return fileInitialState.find(fileItem => {
      return bsItem.key === fileItem.key && bsItem.value === fileItem.value
    })
  })

  // find removed items (exist in memory object but not file)
  let removedItems = memoryInitialState.filter(bsItem => {
    let removedItem = !fileInitialState.find(fileItem => bsItem.key === fileItem.key)
    return removedItem
  })
  // find added items (exist in file but not memory object)
  let addedItems = fileInitialState.filter(fileItem => {
    let addedItem = !memoryInitialState.find(bsItem => fileItem.key === bsItem.key)
    return addedItem
  })
  // find updated items (exist in both but value is different)
  let updatedItems = fileInitialState.filter(fileItem => {
    let foundBsItem = memoryInitialState.find(bsItem => fileItem.key === bsItem.key)
    if (!foundBsItem) {
      return false
    } else {
      return fileItem.value !== foundBsItem.value
    }
  })

  if (removedItems.length > 0) {
    console.log('REMOVED CONFIG: ', removedItems)
  }
  removedItems.forEach(removedItem => {
    removeItemFromBrowserStorage(removedItem)
    patchedMemoryObject = memoryObject.filter(memItem => memItem.key !== removedItem.key)
  })
  if (addedItems.length > 0) {
    console.log('ADDED CONFIG: ', addedItems)
  }
  addedItems.forEach(addedItem => {
    saveItemToBrowserStorage(addedItem)
    patchedMemoryObject.push(addedItem)
  })
  if (updatedItems.length > 0) {
    console.log('UPDATED CONFIG: ', updatedItems)
  }
  updatedItems.forEach(updatedItem => {
    saveItemToBrowserStorage(updatedItem)
    patchedMemoryObject = memoryObject.filter(memItem => memItem.key !== updatedItem.key)
    patchedMemoryObject.push(updatedItem)
  })

  return {
    [cbsConfig.DB_MEMORY_KEY]: patchedMemoryObject,
    [cbsConfig.DB_INITIAL_KEY]: fileInitialState
  }
}

// Convenience function to prefix with namespace and dot
function getFullCbsKey (key) {
  return cbsConfig.namespace + '.' + key
}

function getItemValueFromBrowserStorage (item) {
  return window[item.storageType][getFullCbsKey(item.key)]
}

function saveItemToBrowserStorage (item) {
  window[item.storageType]['setItem'](getFullCbsKey(item.key), item.value)
}

function removeItemFromBrowserStorage (item) {
  window[item.storageType]['removeItem'](getFullCbsKey(item.key))
}