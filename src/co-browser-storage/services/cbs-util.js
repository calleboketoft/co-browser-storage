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
    var stateForMemory = cbsConfigFromFile.initialState.map(function (schemaItem) {
        // save each item to browserStorage
        window[schemaItem.storageType][getFullCbsKey(schemaItem.key)] = schemaItem.default;
        // transform the schema to the memory type
        return {
            key: schemaItem.key,
            value: schemaItem.default,
            storageType: schemaItem.storageType,
            valueType: schemaItem.valueType
        };
    });
    return (_a = {},
        _a[cbs_config_1.cbsConfig.DB_INITIAL_KEY] = cbsConfigFromFile.initialState,
        _a[cbs_config_1.cbsConfig.DB_MEMORY_KEY] = stateForMemory,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYnMtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBR08sY0FFUCxDQUFDLENBRm9CO0FBVXJCLGdFQUFnRTtBQUNoRSxnRUFBZ0U7QUFDaEU7SUFDRSxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtJQUNwRSxFQUFFLENBQUMsQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM5QixDQUFDO0FBQ0gsQ0FBQztBQWhCQyx1QkFBZSxtQkFnQmhCO0FBRUQsdUJBQXdCLFNBQVM7SUFDL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6QyxNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxzQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFBO0FBQ3pFLENBQUM7QUFwQkMscUJBQWEsaUJBb0JkO0FBRUQ7SUFDRSxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUNuRCxDQUFDO0FBckJDLDBCQUFrQixzQkFxQm5CO0FBRUQsdUJBQXdCLGlCQUFpQjtJQUN2Qyw2REFBNkQ7SUFDN0QseUJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQy9CLElBQUksZUFBZSxHQUFHLGVBQWUsRUFBRSxDQUFBO0lBQ3ZDLElBQUksZUFBZSxDQUFBO0lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNyQiwrQ0FBK0M7UUFDL0MsZUFBZSxH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