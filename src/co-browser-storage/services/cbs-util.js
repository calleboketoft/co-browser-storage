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
exports.initExisting = initExisting;
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
exports.initFromScratch = initFromScratch;
function getFullCbsKey(key) {
    return cbs_config_1.cbsConfig.namespace + '.' + key;
}
exports.getFullCbsKey = getFullCbsKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYnMtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXdCLGNBRXhCLENBQUMsQ0FGcUM7QUFVdEMsZ0VBQWdFO0FBQ2hFLGdFQUFnRTtBQUNoRTtJQUNFLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO0lBQ3BFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNiLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzlCLENBQUM7QUFDSCxDQUFDO0FBaEJDLHVCQUFlLG1CQWdCaEI7QUFFRCx1QkFBd0IsU0FBUztJQUMvQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pDLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUE7QUFDekUsQ0FBQztBQXBCQyxxQkFBYSxpQkFvQmQ7QUFFRCxxRUFBcUU7QUFDckUsc0JBQXVCLFNBQVMsRUFBRSxRQUFRO0lBQ3hDLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxzQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFVBQVU7UUFDbEUsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDL0UsRUFBRSxDQUFDLENBQUMsT0FBTyxXQUFXLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN2Qyx3Q0FBd0M7WUFDeEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQTtZQUNoRixNQUFNLENBQUMsVUFBVSxDQUFBO1FBQ25CLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQy9FLEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDckMscURBQXFEO2dCQUNyRCxNQUFNLENBQUMsVUFBVSxDQUFBO1lBQ25CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixpREFBaUQ7Z0JBQ2pELElBQUksaUJBQWlCLEdBQUc7b0JBQ3RCLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRztvQkFDbkIsS0FBSyxFQUFFLFdBQVc7b0JBQ2xCLFdBQVcsRUFBRSxVQUFVLENBQUMsV0FBVztvQkFDbkMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTO2lCQUNoQyxDQUFBO2dCQUNELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQTtZQUMxQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0YsUUFBUSxDQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsWUFBWSxDQUFBO0lBQ2hELGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN2QixNQUFNLENBQUMsUUFBUSxDQUFBO0FBQ2pCLENBQUM7QUFqREMsb0JBQVksZ0JBaURiO0FBRUQsNENBQTRDO0FBQzVDLHlCQUEwQixPQUFPO0lBQy9CLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBVTtRQUN2RCwwQ0FBMEM7UUFDMUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQTtRQUNsRixNQUFNLENBQUM7WUFDTCxHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUc7WUFDbkIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxPQUFPO1lBQ3pCLFdBQVcsRUFBRSxVQUFVLENBQUMsV0FBVztZQUNuQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVM7U0FDaEMsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0YsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO0lBQ2pCLFFBQVEsQ0FBQyxzQkFBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUE7SUFDekQsUUFBUSxDQUFDLHNCQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsY0FBYyxDQUFBO0lBQ2xELGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN2QixNQUFNLENBQUMsUUFBUSxDQUFBO0FBQ2pCLENBQUM7QUFuRUMsdUJBQWUsbUJBbUVoQjtBQUVELHVCQUF3QixHQUFHO0lBQ3pCLE1BQU0sQ0FBQyxzQkFBUyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBO0FBQ3hDLENBQUM7QUF0RUMscUJBQWEsaUJBc0VkIn0=