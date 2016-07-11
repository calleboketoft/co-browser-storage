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