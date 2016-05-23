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
function initializeCbs(cbsConfig) {
    cbs_config_1.setCbsConfig(cbsConfig);
    var dbConfig = getConfigFromLS();
    var updatedConfig;
    if (!dbConfig) {
        // there is no current state stored, initialize from scratch
        updatedConfig = initFromScratch(cbsConfig);
    }
    else {
        // a current state is existing, validate against schema
        updatedConfig = initExisting(cbsConfig.namespace, dbConfig);
    }
}
exports.initializeCbs = initializeCbs;
// Validate each existing item from storage against the memory object
function initExisting(namespace, dbConfig) {
    var actualMemory = dbConfig[cbs_config_1.cbsConfig.DB_MEMORY_KEY].map(function (memoryItem) {
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
    dbConfig[cbs_config_1.cbsConfig.DB_MEMORY_KEY] = actualMemory;
    setConfigToLS(dbConfig);
    return dbConfig;
}
// Initialize the storage items from scratch
function initFromScratch(options) {
    var stateForMemory = options.initialState.map(function (schemaItem) {
        // transform the schema to the memory type
        window[schemaItem.storageType][getFullCbsKey(schemaItem.key)] = schemaItem.default;
        return {
            key: schemaItem.key,
            value: schemaItem.default,
            storageType: schemaItem.storageType,
            valueType: schemaItem.valueType
        };
    });
    var dbConfig = {};
    dbConfig[cbs_config_1.cbsConfig.DB_INITIAL_KEY] = options.initialState;
    dbConfig[cbs_config_1.cbsConfig.DB_MEMORY_KEY] = stateForMemory;
    setConfigToLS(dbConfig);
    return dbConfig;
}
function getFullCbsKey(key) {
    return cbs_config_1.cbsConfig.namespace + '.' + key;
}
exports.getFullCbsKey = getFullCbsKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYnMtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXNDLGNBRXRDLENBQUMsQ0FGbUQ7QUFVcEQsZ0VBQWdFO0FBQ2hFLGdFQUFnRTtBQUNoRTtJQUNFLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO0lBQ3BFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNiLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzlCLENBQUM7QUFDSCxDQUFDO0FBaEJDLHVCQUFlLG1CQWdCaEI7QUFFRCx1QkFBd0IsU0FBUztJQUMvQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pDLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUE7QUFDekUsQ0FBQztBQXBCQyxxQkFBYSxpQkFvQmQ7QUFFRDtJQUNFLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxzQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ25ELENBQUM7QUFyQkMsMEJBQWtCLHNCQXFCbkI7QUFFRCx1QkFBd0IsU0FBUztJQUMvQix5QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3ZCLElBQUksUUFBUSxHQUFHLGVBQWUsRUFBRSxDQUFBO0lBQ2hDLElBQUksYUFBYSxDQUFBO0lBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNkLDREQUE0RDtRQUM1RCxhQUFhLEdBQUcsZUFBZSxDQUFDLFNB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