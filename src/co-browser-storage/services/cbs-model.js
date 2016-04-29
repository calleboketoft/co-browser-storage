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
var cbsActions = require('./cbs-reducer');
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
        window[item.storageType].setItem(this.getFullKey(item.key), item.value);
        // Remove any existing item with the same key from memory object and add the new one
        var dbConfig = this._getConfigFromLS();
        dbConfig[this._DB_MEMORY_KEY] = dbConfig[this._DB_MEMORY_KEY].filter(function (memItem) { return item.key !== memItem.key; });
        dbConfig[this._DB_MEMORY_KEY].push(item);
        this._setConfigToLS(dbConfig);
    };
    // CRUD
    // ----
    CbsModel.prototype.createItem = function (item) {
        var dbConfig = this._getConfigFromLS();
        var existingItem = dbConfig[this._DB_MEMORY_KEY].filter(function (memItem) { return item.key === memItem.key; })[0];
        if (existingItem) {
            console.error('item already exists');
        }
        var safeItem = {
            key: item.key,
            value: item.value || '',
            storageType: item.storageType || 'localStorage',
            valueType: item.valueType || 'text'
        };
        this._saveItem(safeItem);
        this._store.dispatch({
            type: cbsActions.ADDED_CBS_ITEM,
            payload: safeItem
        });
    };
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
            type: cbsActions.UPDATE_CBS_ITEM,
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
                valueType: schemaItem.valueType,
                inConfigFile: true
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
    CbsModel.prototype.getFullKey = function (key) {
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
        var configStr = localStorage[this.getFullKey(this._DB_CONFIG_KEY)];
        if (typeof configStr === 'undefined') {
            return null;
        }
        else {
            return JSON.parse(configStr);
        }
    };
    CbsModel.prototype._setConfigToLS = function (configObj) {
        var configStr = JSON.stringify(configObj);
        window.localStorage[this.getFullKey(this._DB_CONFIG_KEY)] = configStr;
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
            type: cbsActions.ADDED_CBS_ITEMS,
            payload: updatedConfig[this._DB_MEMORY_KEY]
        });
        return;
    };
    // Validate each existing item from storage against the memory object
    CbsModel.prototype._initExisting = function (namespace, dbConfig) {
        var _this = this;
        var actualMemory = dbConfig[this._DB_MEMORY_KEY].map(function (memoryItem) {
            var storageItem = window[memoryItem.storageType][_this.getFullKey(memoryItem.key)];
            if (typeof storageItem === 'undefined') {
                // the item doesn't exist at all, set it
                window[memoryItem.storageType][_this.getFullKey(memoryItem.key)] = memoryItem.value;
                return memoryItem;
            }
            else {
                var actualValue = window[memoryItem.storageType][_this.getFullKey(memoryItem.key)];
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
                        valueType: memoryItem.valueType,
                        inConfigFile: !!memoryItem.inConfigFile
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
        var _this = this;
        var stateForMemory = options.initialState.map(function (schemaItem) {
            // transform the schema to the memory type
            window[schemaItem.storageType][_this.getFullKey(schemaItem.key)] = schemaItem.default;
            return {
                key: schemaItem.key,
                value: schemaItem.default,
                storageType: schemaItem.storageType,
                valueType: schemaItem.valueType,
                inConfigFile: true // only the ones from the config file are here, used for 'reset' functionality
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2JzLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDs7Ozs7Ozs7Ozs7QUFFOUQsZ0RBQWdEO0FBQ2hELG9CQUFvQjtBQUNwQixnREFBZ0Q7QUFDaEQsbUVBQW1FO0FBQ25FLElBQUk7QUFFSixxQkFBeUIsZUFDekIsQ0FBQyxDQUR1QztBQUN4QyxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUdqQyxJQUFZLFVBQVUsV0FBTSxlQUU1QixDQUFDLENBRjBDO0FBVTNDO0lBT0Usa0JBQXFCLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFOL0IsbUJBQWMsR0FBRyxlQUFlLENBQUM7UUFDakMsbUJBQWMsR0FBRyxjQUFjLENBQUM7UUFDaEMsb0JBQWUsR0FBRyxnQkFBZ0IsQ0FBQztRQUt6QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFFTyw0QkFBUyxHQUFqQixVQUFtQixJQUFrQjtRQUNuQywrQkFBK0I7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZFLG9GQUFvRjtRQUNwRixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsSUFBSSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRyxFQUF4QixDQUF3QixDQUFDLENBQUE7UUFDekcsUUFBUSxDQUFD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