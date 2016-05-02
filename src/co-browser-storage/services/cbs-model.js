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
var core_1 = require('angular2/core');
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
        window[item.storageType].setItem(CbsModel.getFullKey(item.key), item.value);
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
    // Returns the key including the namespace
    CbsModel.getFullKey = function (key) {
        return CbsModel.config.namespace + '.' + key;
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
        var configStr = localStorage[CbsModel.getFullKey(this._DB_CONFIG_KEY)];
        if (typeof configStr === 'undefined') {
            return null;
        }
        else {
            return JSON.parse(configStr);
        }
    };
    CbsModel.prototype._setConfigToLS = function (configObj) {
        var configStr = JSON.stringify(configObj);
        window.localStorage[CbsModel.getFullKey(this._DB_CONFIG_KEY)] = configStr;
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
            var storageItem = window[memoryItem.storageType][CbsModel.getFullKey(memoryItem.key)];
            if (typeof storageItem === 'undefined') {
                // the item doesn't exist at all, set it
                window[memoryItem.storageType][CbsModel.getFullKey(memoryItem.key)] = memoryItem.value;
                return memoryItem;
            }
            else {
                var actualValue = window[memoryItem.storageType][CbsModel.getFullKey(memoryItem.key)];
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
            window[schemaItem.storageType][CbsModel.getFullKey(schemaItem.key)] = schemaItem.default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2JzLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDs7Ozs7Ozs7Ozs7QUFFOUQsZ0RBQWdEO0FBQ2hELG9CQUFvQjtBQUNwQixnREFBZ0Q7QUFDaEQsbUVBQW1FO0FBQ25FLElBQUk7QUFFSixxQkFBeUIsZUFDekIsQ0FBQyxDQUR1QztBQUN4QyxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUdqQyw0QkFBK0MsZUFFL0MsQ0FBQyxDQUY2RDtBQVU5RDtJQU9FLGtCQUFxQixNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBTi9CLG1CQUFjLEdBQUcsZUFBZSxDQUFDO1FBQ2pDLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ2hDLG9CQUFlLEdBQUcsZ0JBQWdCLENBQUM7UUFLekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRU8sNEJBQVMsR0FBakIsVUFBbUIsSUFBa0I7UUFDbkMsK0JBQStCO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMzRSxvRkFBb0Y7UUFDcEYsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7UUFDdEMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFBO1FBQ3pHLFFBQVEsQ0FBQyxJQUFJLENB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