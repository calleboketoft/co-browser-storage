// Handles all actions towards localStorage and sessionStorage
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// The config is saved like this in localStorage
// CO_BROWSER_DB = {
//   MEMORY_STATE: [], // current state from app
//   INITIAL_SCHEMA: [] // initial state from when initializing app
// }
var core_1 = require('@angular/core');
var store_1 = require('@ngrx/store');
var cbs_reducer_1 = require('./cbs-reducer');
var CbsModel = (function () {
    function CbsModel(_store) {
        this._store = _store;
        this._DB_CONFIG_KEY = 'CO_BROWSER_DB';
        this._DB_MEMORY_KEY = 'MEMORY_STATE';
        this._DB_INITIAL_KEY = 'INITIAL_SCHEMA';
        this._cbsReducer = this._store.select('cbsReducer');
    }
    CbsModel.prototype._saveItem = function (item) {
        // Save item to browser storage
        window[item.storageType].setItem(getFullCbsKey(item.key), item.value);
        // Remove any existing item with the same key from memory object and add the new one
        var dbConfig = this._getConfigFromLS();
        dbConfig[this._DB_MEMORY_KEY] = dbConfig[this._DB_MEMORY_KEY].filter(function (memItem) { return item.key !== memItem.key; });
        dbConfig[this._DB_MEMORY_KEY].push(item);
        this._setConfigToLS(dbConfig);
    };
    // Update
    // ------
    CbsModel.prototype.updateItem = function (item) {
        // Get current item from LS to complete missing properties.
        var dbConfig = this._getConfigFromLS();
        var existingItem = dbConfig[this._DB_MEMORY_KEY].filter(function (memItem) { return item.key === memItem.key; })[0];
        if (!existingItem) {
            console.error('item does not exist');
        }
        var updatedItem = Object.assign({}, existingItem, item);
        this._saveItem(updatedItem);
        this._store.dispatch({
            type: cbs_reducer_1.UPDATE_CBS_ITEM,
            payload: updatedItem
        });
    };
    // Convenience functions
    // ---------------------
    CbsModel.prototype.updateItems = function (items) {
        var _this = this;
        items.forEach(function (i) { return _this.updateItem(i); });
    };
    CbsModel.prototype.resetItem = function (item) {
        var resetdItem;
        var schemaItem = CbsModel.config.initialState.filter(function (schemaItem) {
            return item.key === schemaItem.key;
        })[0];
        if (schemaItem) {
            resetdItem = {
                key: item.key,
                value: schemaItem.default,
                storageType: schemaItem.storageType,
                valueType: schemaItem.valueType
            };
        }
        if (resetdItem) {
            this.updateItem(resetdItem);
        }
    };
    CbsModel.prototype.resetAll = function () {
        var initialItems = CbsModel.config.initialState.map(function (i) {
            return {
                storageType: i.storageType,
                value: i.default,
                key: i.key,
                valueType: i.valueType
            };
        });
        this.updateItems(initialItems);
    };
    // Get observable for one specific item
    CbsModel.prototype.getItemByKey = function (key) {
        return this._cbsReducer
            .map(function (browserStorageItems) {
            return browserStorageItems.find(function (item) { return item.key === key; });
        });
    };
    // Assess if provided keys' values === 'true'
    // Useful for debug flags.
    // Ex: allTrue(['DEBUG', 'DEBUG_XHR'])
    CbsModel.prototype.allTrue = function (keys) {
        return this._cbsReducer
            .map(function (items) {
            if (items.length === 0)
                return false;
            return items.every(function (item) {
                return keys.indexOf(item.key) === -1 || item.value === 'true';
            });
        });
    };
    // Serialize / deserialize and persist config to browser storage
    // -------------------------------------------------------------
    CbsModel.prototype._getConfigFromLS = function () {
        var configStr = localStorage[getFullCbsKey(this._DB_CONFIG_KEY)];
        if (typeof configStr === 'undefined') {
            return null;
        }
        else {
            return JSON.parse(configStr);
        }
    };
    CbsModel.prototype._setConfigToLS = function (configObj) {
        var configStr = JSON.stringify(configObj);
        window.localStorage[getFullCbsKey(this._DB_CONFIG_KEY)] = configStr;
    };
    // Initialize component upon load
    // ------------------------------
    CbsModel.prototype.initialize = function () {
        var dbConfig = this._getConfigFromLS();
        var updatedConfig;
        if (!dbConfig) {
            // there is no current state stored, initialize from scratch
            updatedConfig = this._initFromScratch(CbsModel.config);
        }
        else {
            // a current state is existing, validate against schema
            updatedConfig = this._initExisting(CbsModel.config.namespace, dbConfig);
        }
        this._store.dispatch({
            type: cbs_reducer_1.ADDED_CBS_ITEMS,
            payload: updatedConfig[this._DB_MEMORY_KEY]
        });
        return;
    };
    // Validate each existing item from storage against the memory object
    CbsModel.prototype._initExisting = function (namespace, dbConfig) {
        var actualMemory = dbConfig[this._DB_MEMORY_KEY].map(function (memoryItem) {
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
        dbConfig[this._DB_MEMORY_KEY] = actualMemory;
        this._setConfigToLS(dbConfig);
        return dbConfig;
    };
    // Initialize the storage items from scratch
    CbsModel.prototype._initFromScratch = function (options) {
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
        dbConfig[this._DB_INITIAL_KEY] = options.initialState;
        dbConfig[this._DB_MEMORY_KEY] = stateForMemory;
        this._setConfigToLS(dbConfig);
        return dbConfig;
    };
    CbsModel = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Store])
    ], CbsModel);
    return CbsModel;
}());
exports.CbsModel = CbsModel;
function setCbsConfig(config) {
    CbsModel.config = config;
    return true;
}
exports.setCbsConfig = setCbsConfig;
function getFullCbsKey(key) {
    return CbsModel.config.namespace + '.' + key;
}
exports.getFullCbsKey = getFullCbsKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2JzLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDs7Ozs7Ozs7Ozs7QUFFOUQsZ0RBQWdEO0FBQ2hELG9CQUFvQjtBQUNwQixnREFBZ0Q7QUFDaEQsbUVBQW1FO0FBQ25FLElBQUk7QUFFSixxQkFBeUIsZUFDekIsQ0FBQyxDQUR1QztBQUN4QyxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUdqQyw0QkFBK0MsZUFFL0MsQ0FBQyxDQUY2RDtBQVU5RDtJQU9FLGtCQUFxQixNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBTi9CLG1CQUFjLEdBQUcsZUFBZSxDQUFDO1FBQ2pDLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ2hDLG9CQUFlLEdBQUcsZ0JBQWdCLENBQUM7UUFLekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRU8sNEJBQVMsR0FBakIsVUFBbUIsSUFBa0I7UUFDbkMsK0JBQStCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3JFLG9GQUFvRjtRQUNwRixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsSUFBSSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRyxFQUF4QixDQUF3QixDQUFDLENBQUE7UUFDekcsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQsU0FBUztJQUNULFNBQVM7SUFDRiw2QkFBVSxHQUFqQixVQUFtQixJQUFrQjtRQUNuQywyREFBMkQ7UUFDM0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7UUFDdEMsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxJQUFJLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHLEVBQXhCLENBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMvRixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBQ3RDLENBQUM7UUFDRCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNuQixJQUFJLEVBQUUsNkJBQWU7WUFDckIsT0FBTyxFQUFFLFdBQVc7U0FDckIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELHdCQUF3QjtJQUN4Qix3QkFBd0I7SUFFakIsOEJBQVcsR0FBbEIsVUFBb0IsS0FBMEI7UUFBOUMsaUJBRUM7UUFEQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFTSw0QkFBUyxHQUFoQixVQUFrQixJQUFrQjtRQUNsQyxJQUFJLFVBQVUsQ0FBQTtRQUNkLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFVBQVU7WUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLEdBQUcsQ0FBQTtRQUNwQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNMLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZixVQUFVLEdBQUc7Z0JBQ1gsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUNiLEtBQUssRUFBRSxVQUFVLENBQUMsT0FBTztnQkFDekIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXO2dCQUNuQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVM7YUFDaEMsQ0FBQTtRQUNILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQUVNLDJCQUFRLEdBQWY7UUFDRSxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQztnQkFDTCxXQUFXLEVBQUUsQ0FBQyxDQUFDLFdBQVc7Z0JBQzFCLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTztnQkFDaEIsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHO2dCQUNWLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUzthQUN2QixDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFRCx1Q0FBdUM7SUFDaEMsK0JBQVksR0FBbkIsVUFBcUIsR0FBRztRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVc7YUFDcEIsR0FBRyxDQUFDLFVBQUMsbUJBQW1CO1lBQ3ZCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFBO1FBQzNELENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELDZDQUE2QztJQUM3QywwQkFBMEI7SUFDMUIsc0NBQXNDO0lBQy9CLDBCQUFPLEdBQWQsVUFBZ0IsSUFBYztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVc7YUFDcEIsR0FBRyxDQUFDLFVBQUEsS0FBSztZQUNSLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUE7WUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBQSxJQUFJO2dCQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUE7WUFDL0QsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUsZ0VBQWdFO0lBQ3hELG1DQUFnQixHQUF4QjtRQUNFLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUE7UUFDaEUsRUFBRSxDQUFDLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFFTyxpQ0FBYyxHQUF0QixVQUF3QixTQUFTO1FBQy9CLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDekMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFBO0lBQ3JFLENBQUM7SUFFRCxpQ0FBaUM7SUFDakMsaUNBQWlDO0lBQzFCLDZCQUFVLEdBQWpCO1FBQ0UsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7UUFDdEMsSUFBSSxhQUFhLENBQUE7UUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2QsNERBQTREO1lBQzVELGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3hELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLHVEQUF1RDtZQUN2RCxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN6RSxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDbkIsSUFBSSxFQUFFLDZCQUFlO1lBQ3JCLE9BQU8sRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUM1QyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUE7SUFDUixDQUFDO0lBRUQscUVBQXFFO0lBQzdELGdDQUFhLEdBQXJCLFVBQXVCLFNBQVMsRUFBRSxRQUFRO1FBQ3hDLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBVTtZQUM5RCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUMvRSxFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVcsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN2Qyx3Q0FBd0M7Z0JBQ3hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUE7Z0JBQ2hGLE1BQU0sQ0FBQyxVQUFVLENBQUE7WUFDbkIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2dCQUMvRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLHFEQUFxRDtvQkFDckQsTUFBTSxDQUFDLFVBQVUsQ0FBQTtnQkFDbkIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixpREFBaUQ7b0JBQ2pELElBQUksaUJBQWlCLEdBQUc7d0JBQ3RCLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRzt3QkFDbkIsS0FBSyxFQUFFLFdBQVc7d0JBQ2xCLFdBQVcsRUFBRSxVQUFVLENBQUMsV0FBVzt3QkFDbkMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTO3FCQUNoQyxDQUFBO29CQUNELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQTtnQkFDMUIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsWUFBWSxDQUFBO1FBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQTtJQUNqQixDQUFDO0lBRUQsNENBQTRDO0lBQ3BDLG1DQUFnQixHQUF4QixVQUEwQixPQUFPO1FBQy9CLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBVTtZQUN2RCwwQ0FBMEM7WUFDMUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQTtZQUNsRixNQUFNLENBQUM7Z0JBQ0wsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHO2dCQUNuQixLQUFLLEVBQUUsVUFBVSxDQUFDLE9BQU87Z0JBQ3pCLFdBQVcsRUFBRSxVQUFVLENBQUMsV0FBVztnQkFDbkMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTO2FBQ2hDLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUE7UUFDckQsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxjQUFjLENBQUE7UUFDOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM3QixNQUFNLENBQUMsUUFBUSxDQUFBO0lBQ2pCLENBQUM7SUFwTEg7UUFBQyxpQkFBVSxFQUFFOztnQkFBQTtJQXFMYixlQUFDO0FBQUQsQ0FBQyxBQXBMRCxJQW9MQztBQXBMWSxnQkFBUSxXQW9McEIsQ0FBQTtBQUVELHNCQUE4QixNQUFNO0lBQ2xDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUE7QUFDYixDQUFDO0FBSGUsb0JBQVksZUFHM0IsQ0FBQTtBQUVELHVCQUErQixHQUFHO0lBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBO0FBQzlDLENBQUM7QUFGZSxxQkFBYSxnQkFFNUIsQ0FBQSJ9