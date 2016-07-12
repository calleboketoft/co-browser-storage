"use strict";
var cbs_config_1 = require('./cbs.config');
// get config from browser storage and deserialize to JSON
function getConfigFromLS() {
    var configStr = localStorage[getFullCbsKey(cbs_config_1.cbsConfig.DB_CONFIG_KEY)];
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
    window.localStorage[getFullCbsKey(cbs_config_1.cbsConfig.DB_CONFIG_KEY)] = configStr;
}
exports.setConfigToLS = setConfigToLS;
// go through memorized file config and get all separate browser storage values
// from keys
function getInitialCbsState() {
    var memorizedFile = getConfigFromLS()[cbs_config_1.cbsConfig.DB_INITIAL_KEY];
    return memorizedFile.map(function (memItem) {
        var browserStorageValue = window[memItem.storageType]['getItem'](getFullCbsKey(memItem.key));
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
    cbs_config_1.setCbsConfig(cbsConfigFromFile);
    var cbsConfigFromLS = getConfigFromLS();
    // first run, no existing state in localStorage
    if (!cbsConfigFromLS) {
        initFromScratch(cbsConfigFromFile);
    }
    else {
        initExisting(cbsConfigFromFile, cbsConfigFromLS);
    }
    // Init is done, save the config from file to localStorage
    setConfigToLS((_a = {}, _a[cbs_config_1.cbsConfig.DB_INITIAL_KEY] = cbsConfigFromFile.initialState, _a));
    var _a;
}
exports.initializeCbs = initializeCbs;
// Initialize storage items from scratch
function initFromScratch(cbsConfigFromFile) {
    cbsConfigFromFile.initialState.forEach(function (item) { return saveItemToBrowserStorage(item); });
    return (_a = {},
        _a[cbs_config_1.cbsConfig.DB_INITIAL_KEY] = cbsConfigFromFile.initialState,
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
        memoryInitialState: cbsConfigFromLS[cbs_config_1.cbsConfig.DB_INITIAL_KEY]
    };
    handleRemovedConfigItems(configFileDifferOptions);
    handleAddedConfigItems(configFileDifferOptions);
    handleUpdatedConfigItems(configFileDifferOptions);
}
// if an item has been manually removed from browser storage, restore it
function restoreManuallyRemovedItems(cbsConfigFromLS) {
    cbsConfigFromLS[cbs_config_1.cbsConfig.DB_INITIAL_KEY].map(function (memoryItem) {
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
function getFullCbsKey(key) {
    return cbs_config_1.cbsConfig.namespace + '.' + key;
}
exports.getFullCbsKey = getFullCbsKey;
function getItemValueFromBrowserStorage(item) {
    return window[item.storageType][getFullCbsKey(item.key)];
}
function saveItemToBrowserStorage(item) {
    window[item.storageType]['setItem'](getFullCbsKey(item.key), item.value);
}
exports.saveItemToBrowserStorage = saveItemToBrowserStorage;
function removeItemFromBrowserStorage(item) {
    window[item.storageType]['removeItem'](getFullCbsKey(item.key));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLnV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYnMudXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBR08sY0FFUCxDQUFDLENBRm9CO0FBV3JCLDBEQUEwRDtBQUMxRDtJQUNFLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO0lBQ3BFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNiLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzlCLENBQUM7QUFDSCxDQUFDO0FBaEJDLHVCQUFlLG1CQWdCaEI7QUFFRCwrQ0FBK0M7QUFDL0MsdUJBQXdCLFNBQVM7SUFDL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6QyxNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxzQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFBO0FBQ3pFLENBQUM7QUFyQkMscUJBQWEsaUJBcUJkO0FBRUQsK0VBQStFO0FBQy9FLFlBQVk7QUFDWjtJQUNFLElBQUksYUFBYSxHQUFHLGVBQWUsRUFBRSxDQUFDLHNCQUFTLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDL0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO1FBQzlCLElBQUksbUJBQW1CLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDNUYsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxD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