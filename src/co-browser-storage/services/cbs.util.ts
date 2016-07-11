import {
  cbsConfig,
  setCbsConfig
} from './cbs.config'

export {
  getConfigFromLS,
  setConfigToLS,
  initializeCbs,
  getFullCbsKey,
  getInitialCbsState,
  saveItemToBrowserStorage
}

// get config from browser storage and deserialize to JSON
function getConfigFromLS () {
  let configStr = localStorage[getFullCbsKey(cbsConfig.DB_CONFIG_KEY)]
  if (typeof configStr === 'undefined') {
    return null
  } else {
    return JSON.parse(configStr)
  }
}

// serialize config and save to browser storage
function setConfigToLS (configObj) {
  let configStr = JSON.stringify(configObj)
  window.localStorage[getFullCbsKey(cbsConfig.DB_CONFIG_KEY)] = configStr
}

// go through memorized file config and get all separate browser storage values
// from keys
function getInitialCbsState () {
  let memorizedFile = getConfigFromLS()[cbsConfig.DB_INITIAL_KEY]
  return memorizedFile.map(memItem => {
    let browserStorageValue = window[memItem.storageType]['getItem'](getFullCbsKey(memItem.key))
    if (browserStorageValue) {
      return Object.assign({}, memItem, {value: browserStorageValue})
    } else {
      return memItem
    }
  })
}

function initializeCbs (cbsConfigFromFile) {
  // The "ruling" config is the one from the file, set it first. If, for
  // example, namespace has changed, it will be an initFromScratch
  setCbsConfig(cbsConfigFromFile)
  var cbsConfigFromLS = getConfigFromLS()

  // first run, no existing state in localStorage
  if (!cbsConfigFromLS) {
    initFromScratch(cbsConfigFromFile)

  // a current state is existing, validate against schema
  } else {
    initExisting(cbsConfigFromFile, cbsConfigFromLS)
  }

  // Init is done, save the config from file to localStorage
  setConfigToLS({[cbsConfig.DB_INITIAL_KEY]: cbsConfigFromFile.initialState})
}

// Initialize storage items from scratch
function initFromScratch (cbsConfigFromFile) {
  cbsConfigFromFile.initialState.forEach((item) => saveItemToBrowserStorage(item))
  return {
    [cbsConfig.DB_INITIAL_KEY]: cbsConfigFromFile.initialState
  }
}

// Initialize storage items for existing config, handle any config file updates
function initExisting (cbsConfigFromFile, cbsConfigFromLS) {

  // Restore items that have been manually removed by a user
  restoreManuallyRemovedItems(cbsConfigFromLS)

  let configFileDifferOptions = {
    fileInitialState: cbsConfigFromFile.initialState,
    memoryInitialState: cbsConfigFromLS[cbsConfig.DB_INITIAL_KEY]
  }

  handleRemovedConfigItems (configFileDifferOptions)
  handleAddedConfigItems (configFileDifferOptions)
  handleUpdatedConfigItems (configFileDifferOptions)
}

function restoreManuallyRemovedItems (cbsConfigFromLS) {
  cbsConfigFromLS[cbsConfig.DB_INITIAL_KEY].map((memoryItem) => {
    var storageItemValue = getItemValueFromBrowserStorage(memoryItem)
    // the storage item has been removed, put back from memory object
    if (typeof storageItemValue === 'undefined') {
      saveItemToBrowserStorage(memoryItem)
    }
  })
}

// handle removed items (exist in memory object but not file)
function handleRemovedConfigItems ({fileInitialState, memoryInitialState}) {
  let removedItems = memoryInitialState.filter(bsItem => {
    let removedItem = !fileInitialState.find(fileItem => bsItem.key === fileItem.key)
    return removedItem
  })

  if (removedItems.length > 0) {
    console.log('REMOVED CONFIG: ', removedItems)
  }
  removedItems.forEach(removedItem => {
    removeItemFromBrowserStorage(removedItem)
  })
}

// handle added items (exist in file but not memory object)
function handleAddedConfigItems ({fileInitialState, memoryInitialState}) {
  let addedItems = fileInitialState.filter(fileItem => {
    let addedItem = !memoryInitialState.find(bsItem => fileItem.key === bsItem.key)
    return addedItem
  })

  if (addedItems.length > 0) {
    console.log('ADDED CONFIG: ', addedItems)
  }
  addedItems.forEach(addedItem => {
    saveItemToBrowserStorage(addedItem)
  })
}

// handle updated items (exist in both but value is different)
function handleUpdatedConfigItems ({fileInitialState, memoryInitialState}) {
  let updatedItems = fileInitialState.filter(fileItem => {
    let foundBsItem = memoryInitialState.find(bsItem => fileItem.key === bsItem.key)
    if (!foundBsItem) {
      return false
    } else {
      return fileItem.value !== foundBsItem.value
    }
  })

  if (updatedItems.length > 0) {
    console.log('UPDATED CONFIG: ', updatedItems)
  }
  updatedItems.forEach(updatedItem => {
    saveItemToBrowserStorage(updatedItem)
  })
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