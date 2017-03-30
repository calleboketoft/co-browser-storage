"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_storage_config_1 = require("./browser-storage.config");
// get config from browser storage and deserialize to JSON
function getConfigFromLS() {
    var configStr = localStorage[getFullBSKey(browser_storage_config_1.browserStorageConfig.DB_CONFIG_KEY)];
    if (typeof configStr === 'undefined') {
        return null;
    }
    else {
        return JSON.parse(configStr);
    }
}
exports.getConfigFromLS = getConfigFromLS;
// serialize config and save to browser storage
function setConfigToLS(configObj) {
    var configStr = JSON.stringify(configObj);
    window.localStorage[getFullBSKey(browser_storage_config_1.browserStorageConfig.DB_CONFIG_KEY)] = configStr;
}
exports.setConfigToLS = setConfigToLS;
// go through memorized file config and get all separate browser storage values
// from keys
function getInitialBrowserStorageState() {
    var memorizedFile = getConfigFromLS()[browser_storage_config_1.browserStorageConfig.DB_INITIAL_KEY];
    return memorizedFile.map(function (memItem) {
        var browserStorageValue = window[memItem.storageType]['getItem'](getFullBSKey(memItem.key));
        if (browserStorageValue) {
            return Object.assign({}, memItem, { value: browserStorageValue });
        }
        else {
            return memItem;
        }
    });
}
exports.getInitialBrowserStorageState = getInitialBrowserStorageState;
function initializeBrowserStorage(cbsConfigFromFile) {
    // The "ruling" config is the one from the file, set it first. If, for
    // example, namespace has changed, it will be an initFromScratch
    browser_storage_config_1.setBrowserStorageConfig(cbsConfigFromFile);
    var cbsConfigFromLS = getConfigFromLS();
    // first run, no existing state in localStorage
    if (!cbsConfigFromLS) {
        initFromScratch(cbsConfigFromFile);
        // a current state is existing, validate against schema
    }
    else {
        initExisting(cbsConfigFromFile, cbsConfigFromLS);
    }
    // Init is done, save the config from file to localStorage
    setConfigToLS((_a = {}, _a[browser_storage_config_1.browserStorageConfig.DB_INITIAL_KEY] = cbsConfigFromFile.initialState, _a));
    var _a;
}
exports.initializeBrowserStorage = initializeBrowserStorage;
// Initialize storage items from scratch
function initFromScratch(cbsConfigFromFile) {
    cbsConfigFromFile.initialState.forEach(function (item) { return saveItemToBrowserStorage(item); });
    return _a = {},
        _a[browser_storage_config_1.browserStorageConfig.DB_INITIAL_KEY] = cbsConfigFromFile.initialState,
        _a;
    var _a;
}
// Initialize storage items for existing config, handle any config file updates
function initExisting(cbsConfigFromFile, cbsConfigFromLS) {
    // Restore items that have been manually removed by a user
    restoreManuallyRemovedItems(cbsConfigFromLS);
    var configFileDifferOptions = {
        fileInitialState: cbsConfigFromFile.initialState,
        memoryInitialState: cbsConfigFromLS[browser_storage_config_1.browserStorageConfig.DB_INITIAL_KEY]
    };
    handleRemovedConfigItems(configFileDifferOptions);
    handleAddedConfigItems(configFileDifferOptions);
    handleUpdatedConfigItems(configFileDifferOptions);
}
// if an item has been manually removed from browser storage, restore it
function restoreManuallyRemovedItems(cbsConfigFromLS) {
    cbsConfigFromLS[browser_storage_config_1.browserStorageConfig.DB_INITIAL_KEY].map(function (memoryItem) {
        var storageItemValue = getItemValueFromBrowserStorage(memoryItem);
        // the storage item has been removed, put back from memory object
        if (typeof storageItemValue === 'undefined') {
            saveItemToBrowserStorage(memoryItem);
        }
    });
}
// handle removed items (exist in memory object but not file)
function handleRemovedConfigItems(_a) {
    var fileInitialState = _a.fileInitialState, memoryInitialState = _a.memoryInitialState;
    var removedItems = memoryInitialState.filter(function (bsItem) {
        var removedItem = !fileInitialState.find(function (fileItem) { return bsItem.key === fileItem.key; });
        return removedItem;
    });
    if (removedItems.length > 0) {
        console.log('REMOVED CONFIG: ', removedItems);
    }
    removedItems.forEach(function (removedItem) {
        removeItemFromBrowserStorage(removedItem);
    });
}
// handle added items (exist in file but not memory object)
function handleAddedConfigItems(_a) {
    var fileInitialState = _a.fileInitialState, memoryInitialState = _a.memoryInitialState;
    var addedItems = fileInitialState.filter(function (fileItem) {
        var addedItem = !memoryInitialState.find(function (bsItem) { return fileItem.key === bsItem.key; });
        return addedItem;
    });
    if (addedItems.length > 0) {
        console.log('ADDED CONFIG: ', addedItems);
    }
    addedItems.forEach(function (addedItem) {
        saveItemToBrowserStorage(addedItem);
    });
}
// handle updated items (exist in both but value is different)
function handleUpdatedConfigItems(_a) {
    var fileInitialState = _a.fileInitialState, memoryInitialState = _a.memoryInitialState;
    var updatedItems = fileInitialState.filter(function (fileItem) {
        var foundBsItem = memoryInitialState.find(function (bsItem) { return fileItem.key === bsItem.key; });
        if (!foundBsItem) {
            return false;
        }
        else {
            return fileItem.value !== foundBsItem.value;
        }
    });
    if (updatedItems.length > 0) {
        console.log('UPDATED CONFIG: ', updatedItems);
    }
    updatedItems.forEach(function (updatedItem) {
        saveItemToBrowserStorage(updatedItem);
    });
}
// Convenience function to prefix with namespace and dot
function getFullBSKey(key) {
    return browser_storage_config_1.browserStorageConfig.namespace + '.' + key;
}
exports.getFullBSKey = getFullBSKey;
function getItemValueFromBrowserStorage(item) {
    return window[item.storageType][getFullBSKey(item.key)];
}
function saveItemToBrowserStorage(item) {
    window[item.storageType]['setItem'](getFullBSKey(item.key), item.value);
}
exports.saveItemToBrowserStorage = saveItemToBrowserStorage;
function removeItemFromBrowserStorage(item) {
    window[item.storageType]['removeItem'](getFullBSKey(item.key));
}
//# sourceMappingURL=browser-storage.util.js.map