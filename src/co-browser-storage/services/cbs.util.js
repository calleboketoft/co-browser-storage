"use strict";
var cbs_config_1 = require('./cbs.config');
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
    // first run, no existing state in localStorage
    if (!cbsConfigFromLS) {
        resultCbsConfig = initFromScratch(cbsConfigFromFile);
    }
    else {
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
// Validate each existing item from browser storage against the memory object
function patchMemoryObjectAndStorageValues(cbsConfigFromLS) {
    var fixedMemoryObject = cbsConfigFromLS[cbs_config_1.cbsConfig.DB_MEMORY_KEY].map(function (memoryItem) {
        var storageItemValue = getItemValueFromBrowserStorage(memoryItem);
        var fixedMemoryItem;
        // the storage item has been removed, put back from memory object
        if (typeof storageItemValue === 'undefined') {
            saveItemToBrowserStorage(memoryItem);
            fixedMemoryItem = memoryItem;
        }
        else if (storageItemValue === memoryItem.value) {
            fixedMemoryItem = memoryItem;
        }
        else {
            fixedMemoryItem = Object.assign({}, memoryItem, { value: storageItemValue });
        }
        return fixedMemoryItem;
    });
    return fixedMemoryObject;
}
// Add, update, or remove items in memoryObject and browserStorage based on file
function applyCbsConfigFileUpdates(_a) {
    var fileInitialState = _a.fileInitialState, memoryInitialState = _a.memoryInitialState, memoryObject = _a.memoryObject;
    // use the current memory object as base
    var patchedMemoryObject = memoryObject.slice();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLnV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYnMudXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBR08sY0FFUCxDQUFDLENBRm9CO0FBV3JCLGdFQUFnRTtBQUNoRSxnRUFBZ0U7QUFDaEU7SUFDRSxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtJQUNwRSxFQUFFLENBQUMsQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM5QixDQUFDO0FBQ0gsQ0FBQztBQWpCQyx1QkFBZSxtQkFpQmhCO0FBRUQsdUJBQXdCLFNBQVM7SUFDL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6QyxNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxzQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFBO0FBQ3pFLENBQUM7QUFyQkMscUJBQWEsaUJBcUJkO0FBRUQ7SUFDRSxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUNuRCxDQUFDO0FBdEJDLDBCQUFrQixzQkFzQm5CO0FBRUQsdUJBQXdCLGlCQUFpQjtJQUN2Qyw2REFBNkQ7SUFDN0QseUJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQy9CLElBQUksZUFBZSxHQUFHLGVBQWUsRUFBRSxDQUFBO0lBQ3ZDLElBQUksZUFBZSxDQUFBO0lBRW5CLCtDQUErQztJQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDckIsZUFBZSxHQUFHLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBR3RELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLGVBQWUsR0FBRyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFDcEUsQ0FBQztJQUNELGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUNoQyxDQUFDO0FBekNDLHFCQUFhLGlCQXlDZDtBQUVELDRDQUE0QztBQUM1Qyx5QkFBMEIsaUJBQWlCO0lBQ3pDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFBO0lBQ2hGLE1BQU0sQ0FBQztRQUNMLEdBQUMsc0JBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRSxpQkFBaUIsQ0FBQyxZQUFZO1FBQzFELEdBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRSxpQkFBaUIsQ0FBQyxZQUFZOztLQUMxRCxDQUFBOztBQUNILENBQUM7QUFFRCxzQkFBdUIsaUJBQWlCLEVBQUUsZUFBZTtJQUN2RCxJQUFJLGlCQUFpQixHQUFHLGlDQUFpQyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzFFLElBQUksY0FBYyxHQUFHLHlCQUF5QixDQUFDO1FBQzdDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLFlBQVk7UUFDaEQsa0JBQWtCLEVBQUUsZUFBZSxDQUFDLHNCQUFTLENBQUMsY0FBYyxDQUFDO1FBQzdELFlBQVksRUFBRSxpQkFBaUI7S0FDaEMsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQTtBQUN2QixDQUFDO0FBRUQsNkVBQTZFO0FBQzdFLDJDQUE0QyxlQUFlO0lBQ3pELElBQUksaUJBQWlCLEdBQUcsZUFBZSxDQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBVTtRQUM5RSxJQUFJLGdCQUFnQixHQUFHLDhCQUE4QixDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2pFLElBQUksZUFBZSxDQUFBO1FBRW5CLGlFQUFpRTtRQUNqRSxFQUFFLENBQUMsQ0FBQyxPQUFPLGdCQUFnQixLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDNUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDcEMsZUFBZSxHQUFHLFVBQVUsQ0FBQTtRQUc5QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pELGVBQWUsR0FBRyxVQUFVLENBQUE7UUFHOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUE7UUFDNUUsQ0FBQztRQUNELE1BQU0sQ0FBQyxlQUFlLENBQUE7SUFDeEIsQ0FBQyxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsaUJBQWlCLENBQUE7QUFDMUIsQ0FBQztBQUVELGdGQUFnRjtBQUNoRixtQ0FBb0MsRUFBb0Q7UUFBbkQsc0NBQWdCLEVBQUUsMENBQWtCLEVBQUUsOEJBQVk7SUFDckYsd0NBQXdDO0lBQ3hDLElBQUksbUJBQW1CLEdBQU8sWUFBWSxRQUFDLENBQUE7SUFFM0MsMkRBQTJEO0lBQzNELElBQUksWUFBWSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU07UUFDakQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxHQUFHLEVBQTNCLENBQTJCLENBQUMsQ0FBQTtRQUNqRixNQUFNLENBQUMsV0FBVyxDQUFBO0lBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBRUYseURBQXlEO0lBQ3pELElBQUksVUFBVSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVE7UUFDL0MsSUFBSSxTQUFTLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxRQUFRLENBQUMsR0FBRyxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQTNCLENBQTJCLENBQUMsQ0FBQTtRQUMvRSxNQUFNLENBQUMsU0FBUyxDQUFBO0lBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBRUYsNERBQTREO0lBQzVELElBQUksWUFBWSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVE7UUFDakQsSUFBSSxXQUFXLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsUUFBUSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUEzQixDQUEyQixDQUFDLENBQUE7UUFDaEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxXQUFXLENBQUMsS0FBSyxDQUFBO1FBQzdDLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFDRCxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUEsV0FBVztRQUM5Qiw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN6QyxtQkFBbUIsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsS0FBSyxXQUFXLENBQUMsR0FBRyxFQUEvQixDQUErQixDQUFDLENBQUE7SUFDdkYsQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBQ0QsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7UUFDMUIsd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDbkMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3JDLENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUNELFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXO1FBQzlCLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3JDLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQyxHQUFHLEVBQS9CLENBQStCLENBQUMsQ0FBQTtRQUNyRixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDdkMsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLENBQUM7UUFDTCxHQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLEdBQUUsbUJBQW1CO1FBQzlDLEdBQUMsc0JBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRSxnQkFBZ0I7O0tBQzdDLENBQUE7O0FBQ0gsQ0FBQztBQUVELHdEQUF3RDtBQUN4RCx1QkFBd0IsR0FBRztJQUN6QixNQUFNLENBQUMsc0JBQVMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUN4QyxDQUFDO0FBaEpDLHFCQUFhLGlCQWdKZDtBQUVELHdDQUF5QyxJQUFJO0lBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUMxRCxDQUFDO0FBRUQsa0NBQW1DLElBQUk7SUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUMxRSxDQUFDO0FBdEpDLGdDQUF3Qiw0QkFzSnpCO0FBRUQsc0NBQXVDLElBQUk7SUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakUsQ0FBQyJ9