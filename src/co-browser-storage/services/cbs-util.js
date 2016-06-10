"use strict";
var cbs_config_1 = require('./cbs-config');
// Serialize / deserialize and persist config to browser storage
// -------------------------------------------------------------
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
function setConfigToLS(configObj) {
    var configStr = JSON.stringify(configObj);
    window.localStorage[getFullCbsKey(cbs_config_1.cbsConfig.DB_CONFIG_KEY)] = configStr;
}
exports.setConfigToLS = setConfigToLS;
function getInitialCbsState() {
    return getConfigFromLS()[cbs_config_1.cbsConfig.DB_MEMORY_KEY];
}
exports.getInitialCbsState = getInitialCbsState;
function initializeCbs(cbsConfigFromFile) {
    // The "ruling" config is the one from the file, set it first
    cbs_config_1.setCbsConfig(cbsConfigFromFile);
    var cbsConfigFromLS = getConfigFromLS();
    var resultCbsConfig;
    if (!cbsConfigFromLS) {
        // first run, no existing state in localStorage
        resultCbsConfig = initFromScratch(cbsConfigFromFile);
    }
    else {
        // a current state is existing, validate against schema
        resultCbsConfig = initExisting(cbsConfigFromFile, cbsConfigFromLS);
    }
    setConfigToLS(resultCbsConfig);
}
exports.initializeCbs = initializeCbs;
// Initialize the storage items from scratch
function initFromScratch(cbsConfigFromFile) {
    cbsConfigFromFile.initialState.forEach(function (item) { return saveItemToBrowserStorage(item); });
    return (_a = {},
        _a[cbs_config_1.cbsConfig.DB_INITIAL_KEY] = cbsConfigFromFile.initialState,
        _a[cbs_config_1.cbsConfig.DB_MEMORY_KEY] = cbsConfigFromFile.initialState,
        _a
    );
    var _a;
}
function initExisting(cbsConfigFromFile, cbsConfigFromLS) {
    var fixedMemoryObject = patchMemoryObjectAndStorageValues(cbsConfigFromLS);
    var fixedCbsConfig = applyCbsConfigFileUpdates({
        fileInitialState: cbsConfigFromFile.initialState,
        memoryInitialState: cbsConfigFromLS[cbs_config_1.cbsConfig.DB_INITIAL_KEY],
        memoryObject: fixedMemoryObject
    });
    return fixedCbsConfig;
}
// Validate each existing item from storage against the memory object
function patchMemoryObjectAndStorageValues(cbsConfigFromLS) {
    var fixedMemoryObject = cbsConfigFromLS[cbs_config_1.cbsConfig.DB_MEMORY_KEY].map(function (memoryItem) {
        var storageItemValue = getItemValueFromBrowserStorage(memoryItem);
        var fixedMemoryItem;
        if (typeof storageItemValue === 'undefined') {
            // the storage item has been removed, put back from memory object
            saveItemToBrowserStorage(memoryItem);
            fixedMemoryItem = memoryItem;
        }
        else if (storageItemValue === memoryItem.value) {
            // the value in the memory object is the same as in browser storage
            fixedMemoryItem = memoryItem;
        }
        else {
            // the storage value has been manually modified by a user, update the memory object
            fixedMemoryItem = Object.assign({}, memoryItem, { value: storageItemValue });
        }
        return fixedMemoryItem;
    });
    return fixedMemoryObject;
}
// Add, update, or remove items in memoryObject and browserStorage based on file
function applyCbsConfigFileUpdates(_a) {
    var fileInitialState = _a.fileInitialState, memoryInitialState = _a.memoryInitialState, memoryObject = _a.memoryObject;
    // find untouched items, adde them to the patchedMemoryObject
    var patchedMemoryObject = memoryObject.filter(function (bsItem) {
        return fileInitialState.find(function (fileItem) {
            return bsItem.key === fileItem.key && bsItem.value === fileItem.value;
        });
    });
    // find removed items (exist in memory object but not file)
    var removedItems = memoryInitialState.filter(function (bsItem) {
        var removedItem = !fileInitialState.find(function (fileItem) { return bsItem.key === fileItem.key; });
        return removedItem;
    });
    // find added items (exist in file but not memory object)
    var addedItems = fileInitialState.filter(function (fileItem) {
        var addedItem = !memoryInitialState.find(function (bsItem) { return fileItem.key === bsItem.key; });
        return addedItem;
    });
    // find updated items (exist in both but value is different)
    var updatedItems = fileInitialState.filter(function (fileItem) {
        var foundBsItem = memoryInitialState.find(function (bsItem) { return fileItem.key === bsItem.key; });
        if (!foundBsItem) {
            return false;
        }
        else {
            return fileItem.value !== foundBsItem.value;
        }
    });
    if (removedItems.length > 0) {
        console.log('REMOVED CONFIG: ', removedItems);
    }
    removedItems.forEach(function (removedItem) {
        removeItemFromBrowserStorage(removedItem);
        patchedMemoryObject = memoryObject.filter(function (memItem) { return memItem.key !== removedItem.key; });
    });
    if (addedItems.length > 0) {
        console.log('ADDED CONFIG: ', addedItems);
    }
    addedItems.forEach(function (addedItem) {
        saveItemToBrowserStorage(addedItem);
        patchedMemoryObject.push(addedItem);
    });
    if (updatedItems.length > 0) {
        console.log('UPDATED CONFIG: ', updatedItems);
    }
    updatedItems.forEach(function (updatedItem) {
        saveItemToBrowserStorage(updatedItem);
        patchedMemoryObject = memoryObject.filter(function (memItem) { return memItem.key !== updatedItem.key; });
        patchedMemoryObject.push(updatedItem);
    });
    return (_b = {},
        _b[cbs_config_1.cbsConfig.DB_MEMORY_KEY] = patchedMemoryObject,
        _b[cbs_config_1.cbsConfig.DB_INITIAL_KEY] = fileInitialState,
        _b
    );
    var _b;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYnMtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBR08sY0FFUCxDQUFDLENBRm9CO0FBV3JCLGdFQUFnRTtBQUNoRSxnRUFBZ0U7QUFDaEU7SUFDRSxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtJQUNwRSxFQUFFLENBQUMsQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM5QixDQUFDO0FBQ0gsQ0FBQztBQWpCQyx1QkFBZSxtQkFpQmhCO0FBRUQsdUJBQXdCLFNBQVM7SUFDL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6QyxNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxzQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFBO0FBQ3pFLENBQUM7QUFyQkMscUJBQWEsaUJBcUJkO0FBRUQ7SUFDRSxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUNuRCxDQUFDO0FBdEJDLDBCQUFrQixzQkFzQm5CO0FBRUQsdUJBQXdCLGlCQUFpQjtJQUN2Qyw2REFBNkQ7SUFDN0QseUJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQy9CLElBQUksZUFBZSxHQUFHLGVBQWUsRUFBRSxDQUFBO0lBQ3ZDLElBQUksZUFBZSxDQUFBO0lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNyQiwrQ0FBK0M7UUFDL0MsZUFBZSxH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