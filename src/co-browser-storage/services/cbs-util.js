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
    if (!dbConfig) {
        // there is no current state stored, initialize from scratch
        initFromScratch(cbsConfig);
    }
    else {
        // a current state is existing, validate against schema
        initExisting(cbsConfig.namespace, dbConfig);
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
// Convenience function to prefix with namespace and dot
function getFullCbsKey(key) {
    return cbs_config_1.cbsConfig.namespace + '.' + key;
}
exports.getFullCbsKey = getFullCbsKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYnMtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXNDLGNBRXRDLENBQUMsQ0FGbUQ7QUFVcEQsZ0VBQWdFO0FBQ2hFLGdFQUFnRTtBQUNoRTtJQUNFLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO0lBQ3BFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNiLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzlCLENBQUM7QUFDSCxDQUFDO0FBaEJDLHVCQUFlLG1CQWdCaEI7QUFFRCx1QkFBd0IsU0FBUztJQUMvQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pDLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUE7QUFDekUsQ0FBQztBQXBCQyxxQkFBYSxpQkFvQmQ7QUFFRDtJQUNFLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxzQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ25ELENBQUM7QUFyQkMsMEJBQWtCLHNCQXFCbkI7QUFFRCx1QkFBd0IsU0FBUztJQUMvQix5QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3ZCLElBQUksUUFBUSxHQUFHLGVBQWUsRUFBRSxDQUFBO0lBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNkLDREQUE0RDtRQUM1RCxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUFDLElB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