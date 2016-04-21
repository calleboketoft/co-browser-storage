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
        window[item.storageType].setItem(this._options.namespace + '.' + item.key, item.value);
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
    CbsModel.prototype.updateItems = function (items) {
        var _this = this;
        items.forEach(function (i) { return _this.updateItem(i); });
    };
    CbsModel.prototype.resetItem = function (item) {
        var resetdItem;
        var schemaItem = this._options.initialState.filter(function (schemaItem) {
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
        var initialItems = this._options.initialState.map(function (i) {
            return {
                storageType: i.storageType,
                value: i.default,
                key: i.key,
                valueType: i.valueType
            };
        });
        this.updateItems(initialItems);
    };
    CbsModel.prototype.removeItem = function (item) {
        var dbConfig = this._getConfigFromLS();
        var existingItem = dbConfig[this._DB_MEMORY_KEY].filter(function (memItem) { return item.key === memItem.key; })[0];
        // Remove item from storage
        window[existingItem.storageType]['removeItem'](this._options.namespace + '.' + item.key);
        // Remove item from memory object
        dbConfig[this._DB_MEMORY_KEY] = dbConfig[this._DB_MEMORY_KEY].filter(function (memItem) { return item.key !== memItem.key; });
        this._setConfigToLS(dbConfig);
        this._store.dispatch({
            type: cbsActions.REMOVED_CBS_ITEM,
            payload: item
        });
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
        var configStr = localStorage[this._options.namespace + '.' + this._DB_CONFIG_KEY];
        if (typeof configStr === 'undefined') {
            return null;
        }
        else {
            return JSON.parse(configStr);
        }
    };
    CbsModel.prototype._setConfigToLS = function (configObj) {
        var configStr = JSON.stringify(configObj);
        window.localStorage[this._options.namespace + '.' + this._DB_CONFIG_KEY] = configStr;
    };
    // Initialize component upon load
    // ------------------------------
    CbsModel.prototype.initialize = function (options) {
        this._options = options; // save options to class
        var dbConfig = this._getConfigFromLS();
        var updatedConfig;
        if (!dbConfig) {
            // there is no current state stored, initialize from scratch
            updatedConfig = this._initFromScratch(options);
        }
        else {
            // a current state is existing, validate against schema
            updatedConfig = this._initExisting(options.namespace, dbConfig);
        }
        this._store.dispatch({
            type: cbsActions.ADDED_CBS_ITEMS,
            payload: updatedConfig[this._DB_MEMORY_KEY]
        });
        return;
    };
    // Validate each existing item from storage against the memory object
    CbsModel.prototype._initExisting = function (namespace, dbConfig) {
        var actualMemory = dbConfig[this._DB_MEMORY_KEY].map(function (memoryItem) {
            var storageItem = window[memoryItem.storageType][namespace + '.' + memoryItem.key];
            if (typeof storageItem === 'undefined') {
                // the item doesn't exist at all, set it
                window[memoryItem.storageType][namespace + '.' + memoryItem.key] = memoryItem.value;
                return memoryItem;
            }
            else {
                var actualValue = window[memoryItem.storageType][namespace + '.' + memoryItem.key];
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
        var stateForMemory = options.initialState.map(function (schemaItem) {
            // transform the schema to the memory type
            window[schemaItem.storageType][options.namespace + '.' + schemaItem.key] = schemaItem.default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2JzLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDs7Ozs7Ozs7Ozs7QUFFOUQsZ0RBQWdEO0FBQ2hELG9CQUFvQjtBQUNwQixnREFBZ0Q7QUFDaEQsbUVBQW1FO0FBQ25FLElBQUk7QUFFSixxQkFBeUIsZUFDekIsQ0FBQyxDQUR1QztBQUN4QyxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUdqQyxJQUFZLFVBQVUsV0FBTSxlQUU1QixDQUFDLENBRjBDO0FBVTNDO0lBT0Usa0JBQXFCLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFOL0IsbUJBQWMsR0FBRyxlQUFlLENBQUM7UUFDakMsbUJBQWMsR0FBRyxjQUFjLENBQUM7UUFDaEMsb0JBQWUsR0FBRyxnQkFBZ0IsQ0FBQztRQUt6QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFFTyw0QkFBUyxHQUFqQixVQUFtQixJQUFrQjtRQUNuQywrQkFBK0I7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3RGLG9GQUFvRjtRQUNwRixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsSUFBSSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRyxFQUF4QixDQUF3QixDQUFDLENBQUE7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