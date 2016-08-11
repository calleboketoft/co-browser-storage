"use strict";
var browser_storage_config_1 = require('./browser-storage.config');
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
    return (_a = {},
        _a[browser_storage_config_1.browserStorageConfig.DB_INITIAL_KEY] = cbsConfigFromFile.initialState,
        _a
    );
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1zdG9yYWdlLnV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJicm93c2VyLXN0b3JhZ2UudXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUNBR08sMEJBRVAsQ0FBQyxDQUZnQztBQVdqQywwREFBMEQ7QUFDMUQ7SUFDRSxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLDZDQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7SUFDOUUsRUFBRSxDQUFDLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDOUIsQ0FBQztBQUNILENBQUM7QUFoQkMsdUJBQWUsbUJBZ0JoQjtBQUVELCtDQUErQztBQUMvQyx1QkFBd0IsU0FBUztJQUMvQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLDZDQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFBO0FBQ25GLENBQUM7QUFyQkMscUJBQWEsaUJBcUJkO0FBRUQsK0VBQStFO0FBQy9FLFlBQVk7QUFDWjtJQUNFLElBQUksYUFBYSxHQUFHLGVBQWUsRUFBRSxDQUFDLDZDQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQzFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztRQUM5QixJQUFJLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQzNGLEVBQUUs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