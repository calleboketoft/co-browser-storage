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
        resultCbsConfig = initExisting(cbsConfigFromFile.namespace, cbsConfigFromLS);
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
// Validate each existing item from storage against the memory object
function initExisting(cbsConfigFromFile, cbsConfigFromLS) {
    var actualMemory = cbsConfigFromLS[cbs_config_1.cbsConfig.DB_MEMORY_KEY].map(function (memoryItem) {
        var storageItem = window[memoryItem.storageType][getFullCbsKey(memoryItem.key)];
        if (typeof storageItem === 'undefined') {
            // the item doesn't exist at all, set it
            window[memoryItem.storageType][getFullCbsKey(memoryItem.key)] = memoryItem.value;
            return memoryItem;
        }
        else {
            var actualValue = window[memoryItem.storageType][getFullCbsKey(memoryItem.key)];
            if (actualValue === memoryItem.value) {
                // the value has not been touched outside of this GUI
                return memoryItem;
            }
            else {
                // the value has been manually modified by a user
                var updatedMemoryItem = {
                    key: memoryItem.key,
                    value: actualValue,
                    storageType: memoryItem.storageType,
                    valueType: memoryItem.valueType
                };
                return updatedMemoryItem;
            }
        }
    });
    cbsConfigFromLS[cbs_config_1.cbsConfig.DB_MEMORY_KEY] = actualMemory;
    setConfigToLS(cbsConfigFromLS);
    return cbsConfigFromLS;
}
// Convenience function to prefix with namespace and dot
function getFullCbsKey(key) {
    return cbs_config_1.cbsConfig.namespace + '.' + key;
}
exports.getFullCbsKey = getFullCbsKey;
function saveItemToBrowserStorage(item) {
    window[item.storageType]['setItem'](getFullCbsKey(item.key), item.value);
}
exports.saveItemToBrowserStorage = saveItemToBrowserStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYnMtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBR08sY0FFUCxDQUFDLENBRm9CO0FBV3JCLGdFQUFnRTtBQUNoRSxnRUFBZ0U7QUFDaEU7SUFDRSxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtJQUNwRSxFQUFFLENBQUMsQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM5QixDQUFDO0FBQ0gsQ0FBQztBQWpCQyx1QkFBZSxtQkFpQmhCO0FBRUQsdUJBQXdCLFNBQVM7SUFDL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6QyxNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxzQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFBO0FBQ3pFLENBQUM7QUFyQkMscUJBQWEsaUJBcUJkO0FBRUQ7SUFDRSxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUNuRCxDQUFDO0FBdEJDLDBCQUFrQixzQkFzQm5CO0FBRUQsdUJBQXdCLGlCQUFpQjtJQUN2Qyw2REFBNkQ7SUFDN0QseUJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQy9CLElBQUksZUFBZSxHQUFHLGVBQWUsRUFBRSxDQUFBO0lBQ3ZDLElBQUksZUFBZSxDQUFBO0lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNyQiwrQ0FBK0M7UUFDL0MsZUFBZSxH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