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
function getInitialCbsState() {
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
exports.getInitialCbsState = getInitialCbsState;
function initializeCbs(cbsConfigFromFile) {
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
exports.initializeCbs = initializeCbs;
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