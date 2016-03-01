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
var coBrowserStorageActions = require('./co-browser-storage-reducer');
var CoBrowserStorageModel = (function () {
    function CoBrowserStorageModel(_store) {
        this._store = _store;
        this._DB_CONFIG_KEY = 'CO_BROWSER_DB';
        this._DB_MEMORY_KEY = 'MEMORY_STATE';
        this._DB_INITIAL_KEY = 'INITIAL_SCHEMA';
        this._coBrowserStorageReducer = this._store.select('coBrowserStorageReducer');
    }
    CoBrowserStorageModel.prototype._saveItem = function (item) {
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
    CoBrowserStorageModel.prototype.createItem = function (item) {
        var safeItem = {
            key: item.key,
            value: item.value || '',
            storageType: item.storageType || 'localStorage',
            valueType: item.valueType || 'text'
        };
        this._saveItem(safeItem);
        this._store.dispatch({
            type: coBrowserStorageActions.ADDED_CO_STORE_ITEM,
            payload: safeItem
        });
    };
    CoBrowserStorageModel.prototype.updateItem = function (item) {
        // Get current item from LS to complete missing properties.
        var dbConfig = this._getConfigFromLS();
        var existingItem = dbConfig[this._DB_MEMORY_KEY].filter(function (memItem) { return item.key === memItem.key; })[0];
        var updatedItem = Object.assign({}, existingItem, item);
        this._saveItem(updatedItem);
        this._store.dispatch({
            type: coBrowserStorageActions.UPDATE_CO_STORE_ITEM,
            payload: updatedItem
        });
    };
    CoBrowserStorageModel.prototype.resetItem = function (item) {
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
    CoBrowserStorageModel.prototype.removeItem = function (item) {
        // Remove item from storage
        window[item.storageType].removeItem(this._options.namespace + '.' + item.key);
        // Remove item from memory object
        var dbConfig = this._getConfigFromLS();
        dbConfig[this._DB_MEMORY_KEY] = dbConfig[this._DB_MEMORY_KEY].filter(function (memItem) { return item.key !== memItem.key; });
        this._setConfigToLS(dbConfig);
        this._store.dispatch({
            type: coBrowserStorageActions.REMOVED_CO_STORE_ITEM,
            payload: item
        });
    };
    // Get observable for one specific item
    CoBrowserStorageModel.prototype.getItemByKey = function (key) {
        return this._coBrowserStorageReducer
            .map(function (browserStorageItems) {
            return browserStorageItems.find(function (item) { return item.key === key; });
        });
    };
    // Serialize / deserialize and persist config to browser storage
    // -------------------------------------------------------------
    CoBrowserStorageModel.prototype._getConfigFromLS = function () {
        var configStr = localStorage[this._options.namespace + '.' + this._DB_CONFIG_KEY];
        if (typeof configStr === 'undefined') {
            return null;
        }
        else {
            return JSON.parse(configStr);
        }
    };
    CoBrowserStorageModel.prototype._setConfigToLS = function (configObj) {
        var configStr = JSON.stringify(configObj);
        window.localStorage[this._options.namespace + '.' + this._DB_CONFIG_KEY] = configStr;
    };
    // Initialize component upon load
    // ------------------------------
    CoBrowserStorageModel.prototype.initialize = function (options) {
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
            type: coBrowserStorageActions.ADDED_CO_STORE_ITEMS,
            payload: updatedConfig[this._DB_MEMORY_KEY]
        });
        return;
    };
    // Validate each existing item from storage against the memory object
    CoBrowserStorageModel.prototype._initExisting = function (namespace, dbConfig) {
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
    CoBrowserStorageModel.prototype._initFromScratch = function (options) {
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
    CoBrowserStorageModel = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Store])
    ], CoBrowserStorageModel);
    return CoBrowserStorageModel;
}());
exports.CoBrowserStorageModel = CoBrowserStorageModel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9zZXJ2aWNlcy9jby1icm93c2VyLXN0b3JhZ2UtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOERBQThEOzs7Ozs7Ozs7OztBQUU5RCxnREFBZ0Q7QUFDaEQsb0JBQW9CO0FBQ3BCLGdEQUFnRDtBQUNoRCxtRUFBbUU7QUFDbkUsSUFBSTtBQUVKLHFCQUF5QixlQUN6QixDQUFDLENBRHVDO0FBQ3hDLHNCQUFvQixhQUVwQixDQUFDLENBRmdDO0FBRWpDLElBQVksdUJBQXVCLFdBQU0sOEJBRXpDLENBQUMsQ0FGc0U7QUFVdkU7SUFPRSwrQkFBcUIsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQU4vQixtQkFBYyxHQUFHLGVBQWUsQ0FBQztRQUNqQyxtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUNoQyxvQkFBZSxHQUFHLGdCQUFnQixDQUFDO1FBS3pDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO0lBQy9FLENBQUM7SUFFTyx5Q0FBUyxHQUFqQixVQUFtQixJQUFrQjtRQUNuQywrQkFBK0I7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3RGLG9GQUFvRjtRQUNwRixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsSUFBSSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRyxFQUF4QixDQUF3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akIsQ0FBQztJQUVELDRDQUE0QztJQUNwQyxnREFBZ0IsR0FBeEIsVUFBMEIsT0FBTztRQUMvQixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFVBQVU7WUFDdkQsMENBQTBDO1lBQzFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUE7WUFDN0YsTUFBTSxDQUFDO2dCQUNMLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRztnQkFDbkIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxPQUFPO2dCQUN6QixXQUFXLEVBQUUsVUFBVSxDQUFDLFdBQVc7Z0JBQ25DLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUztnQkFDL0IsWUFBWSxFQUFFLElBQUksQ0FBQyw4RUFBOEU7YUFDbEcsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQTtRQUNyRCxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLGNBQWMsQ0FBQTtRQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzdCLE1BQU0sQ0FBQyxRQUFRLENBQUE7SUFDakIsQ0FBQztJQWhMSDtRQUFDLGlCQUFVLEVBQUU7OzZCQUFBO0lBaUxiLDRCQUFDO0FBQUQsQ0FoTEEsQUFnTEMsSUFBQTtBQWhMWSw2QkFBcUIsd0JBZ0xqQyxDQUFBIiwiZmlsZSI6ImNvLWJyb3dzZXItc3RvcmFnZS9zZXJ2aWNlcy9jby1icm93c2VyLXN0b3JhZ2UtbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBIYW5kbGVzIGFsbCBhY3Rpb25zIHRvd2FyZHMgbG9jYWxTdG9yYWdlIGFuZCBzZXNzaW9uU3RvcmFnZVxuXG4vLyBUaGUgY29uZmlnIGlzIHNhdmVkIGxpa2UgdGhpcyBpbiBsb2NhbFN0b3JhZ2Vcbi8vIENPX0JST1dTRVJfREIgPSB7XG4vLyAgIE1FTU9SWV9TVEFURTogW10sIC8vIGN1cnJlbnQgc3RhdGUgZnJvbSBhcHBcbi8vICAgSU5JVElBTF9TQ0hFTUE6IFtdIC8vIGluaXRpYWwgc3RhdGUgZnJvbSB3aGVuIGluaXRpYWxpemluZyBhcHBcbi8vIH1cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJ1xuaW1wb3J0IHtTdG9yZX0gZnJvbSAnQG5ncngvc3RvcmUnXG5cbmltcG9ydCAqIGFzIGNvQnJvd3NlclN0b3JhZ2VBY3Rpb25zIGZyb20gJy4vY28tYnJvd3Nlci1zdG9yYWdlLXJlZHVjZXInXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0b3JhZ2VJdGVtIHtcbiAga2V5OiBzdHJpbmcsXG4gIHZhbHVlPzogYW55LFxuICBzdG9yYWdlVHlwZT86IHN0cmluZyxcbiAgdmFsdWVUeXBlPzogc3RyaW5nXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb0Jyb3dzZXJTdG9yYWdlTW9kZWwge1xuICBwcml2YXRlIF9EQl9DT05GSUdfS0VZID0gJ0NPX0JST1dTRVJfREInO1xuICBwcml2YXRlIF9EQl9NRU1PUllfS0VZID0gJ01FTU9SWV9TVEFURSc7XG4gIHByaXZhdGUgX0RCX0lOSVRJQUxfS0VZID0gJ0lOSVRJQUxfU0NIRU1BJztcbiAgcHJpdmF0ZSBfb3B0aW9ucztcbiAgcHJpdmF0ZSBfY29Ccm93c2VyU3RvcmFnZVJlZHVjZXI7XG5cbiAgY29uc3RydWN0b3IgKHByaXZhdGUgX3N0b3JlOiBTdG9yZTxhbnk+KSB7XG4gICAgdGhpcy5fY29Ccm93c2VyU3RvcmFnZVJlZHVjZXIgPSB0aGlzLl9zdG9yZS5zZWxlY3QoJ2NvQnJvd3NlclN0b3JhZ2VSZWR1Y2VyJylcbiAgfVxuXG4gIHByaXZhdGUgX3NhdmVJdGVtIChpdGVtOiBJU3RvcmFnZUl0ZW0pIHtcbiAgICAvLyBTYXZlIGl0ZW0gdG8gYnJvd3NlciBzdG9yYWdlXG4gICAgd2luZG93W2l0ZW0uc3RvcmFnZVR5cGVdLnNldEl0ZW0odGhpcy5fb3B0aW9ucy5uYW1lc3BhY2UgKyAnLicgKyBpdGVtLmtleSwgaXRlbS52YWx1ZSlcbiAgICAvLyBSZW1vdmUgYW55IGV4aXN0aW5nIGl0ZW0gd2l0aCB0aGUgc2FtZSBrZXkgZnJvbSBtZW1vcnkgb2JqZWN0IGFuZCBhZGQgdGhlIG5ldyBvbmVcbiAgICBsZXQgZGJDb25maWcgPSB0aGlzLl9nZXRDb25maWdGcm9tTFMoKVxuICAgIGRiQ29uZmlnW3RoaXMuX0RCX01FTU9SWV9LRVldID0gZGJDb25maWdbdGhpcy5fREJfTUVNT1JZX0tFWV0uZmlsdGVyKG1lbUl0ZW0gPT4gaXRlbS5rZXkgIT09IG1lbUl0ZW0ua2V5KVxuICAgIGRiQ29uZmlnW3RoaXMuX0RCX01FTU9SWV9LRVldLnB1c2goaXRlbSlcbiAgICB0aGlzLl9zZXRDb25maWdUb0xTKGRiQ29uZmlnKVxuICB9XG5cbiAgLy8gQ1JVRFxuICAvLyAtLS0tXG4gIHB1YmxpYyBjcmVhdGVJdGVtIChpdGVtOiBJU3RvcmFnZUl0ZW0pIHtcbiAgICBsZXQgc2FmZUl0ZW0gPSB7XG4gICAgICBrZXk6IGl0ZW0ua2V5LFxuICAgICAgdmFsdWU6IGl0ZW0udmFsdWUgfHwgJycsXG4gICAgICBzdG9yYWdlVHlwZTogaXRlbS5zdG9yYWdlVHlwZSB8fCAnbG9jYWxTdG9yYWdlJyxcbiAgICAgIHZhbHVlVHlwZTogaXRlbS52YWx1ZVR5cGUgfHwgJ3RleHQnXG4gICAgfVxuICAgIHRoaXMuX3NhdmVJdGVtKHNhZmVJdGVtKVxuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IGNvQnJvd3NlclN0b3JhZ2VBY3Rpb25zLkFEREVEX0NPX1NUT1JFX0lURU0sXG4gICAgICBwYXlsb2FkOiBzYWZlSXRlbVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlSXRlbSAoaXRlbTogSVN0b3JhZ2VJdGVtKSB7XG4gICAgLy8gR2V0IGN1cnJlbnQgaXRlbSBmcm9tIExTIHRvIGNvbXBsZXRlIG1pc3NpbmcgcHJvcGVydGllcy5cbiAgICBsZXQgZGJDb25maWcgPSB0aGlzLl9nZXRDb25maWdGcm9tTFMoKVxuICAgIGxldCBleGlzdGluZ0l0ZW0gPSBkYkNvbmZpZ1t0aGlzLl9EQl9NRU1PUllfS0VZXS5maWx0ZXIobWVtSXRlbSA9PiBpdGVtLmtleSA9PT0gbWVtSXRlbS5rZXkpWzBdXG4gICAgbGV0IHVwZGF0ZWRJdGVtID0gT2JqZWN0LmFzc2lnbih7fSwgZXhpc3RpbmdJdGVtLCBpdGVtKVxuICAgIHRoaXMuX3NhdmVJdGVtKHVwZGF0ZWRJdGVtKVxuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IGNvQnJvd3NlclN0b3JhZ2VBY3Rpb25zLlVQREFURV9DT19TVE9SRV9JVEVNLFxuICAgICAgcGF5bG9hZDogdXBkYXRlZEl0ZW1cbiAgICB9KVxuICB9XG5cbiAgcHVibGljIHJlc2V0SXRlbSAoaXRlbTogSVN0b3JhZ2VJdGVtKSB7XG4gICAgbGV0IHJlc2V0ZEl0ZW1cbiAgICBsZXQgc2NoZW1hSXRlbSA9IHRoaXMuX29wdGlvbnMuaW5pdGlhbFN0YXRlLmZpbHRlcigoc2NoZW1hSXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0ua2V5ID09PSBzY2hlbWFJdGVtLmtleVxuICAgIH0pWzBdXG4gICAgaWYgKHNjaGVtYUl0ZW0pIHtcbiAgICAgIHJlc2V0ZEl0ZW0gPSB7XG4gICAgICAgIGtleTogaXRlbS5rZXksXG4gICAgICAgIHZhbHVlOiBzY2hlbWFJdGVtLmRlZmF1bHQsXG4gICAgICAgIHN0b3JhZ2VUeXBlOiBzY2hlbWFJdGVtLnN0b3JhZ2VUeXBlLFxuICAgICAgICB2YWx1ZVR5cGU6IHNjaGVtYUl0ZW0udmFsdWVUeXBlLFxuICAgICAgICBpbkNvbmZpZ0ZpbGU6IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzZXRkSXRlbSkge1xuICAgICAgdGhpcy51cGRhdGVJdGVtKHJlc2V0ZEl0ZW0pXG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZUl0ZW0gKGl0ZW06IElTdG9yYWdlSXRlbSkge1xuICAgIC8vIFJlbW92ZSBpdGVtIGZyb20gc3RvcmFnZVxuICAgIHdpbmRvd1tpdGVtLnN0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKHRoaXMuX29wdGlvbnMubmFtZXNwYWNlICsgJy4nICsgaXRlbS5rZXkpXG4gICAgLy8gUmVtb3ZlIGl0ZW0gZnJvbSBtZW1vcnkgb2JqZWN0XG4gICAgbGV0IGRiQ29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnRnJvbUxTKClcbiAgICBkYkNvbmZpZ1t0aGlzLl9EQl9NRU1PUllfS0VZXSA9IGRiQ29uZmlnW3RoaXMuX0RCX01FTU9SWV9LRVldLmZpbHRlcigobWVtSXRlbSkgPT4gaXRlbS5rZXkgIT09IG1lbUl0ZW0ua2V5KVxuICAgIHRoaXMuX3NldENvbmZpZ1RvTFMoZGJDb25maWcpXG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogY29Ccm93c2VyU3RvcmFnZUFjdGlvbnMuUkVNT1ZFRF9DT19TVE9SRV9JVEVNLFxuICAgICAgcGF5bG9hZDogaXRlbVxuICAgIH0pXG4gIH1cblxuICAvLyBHZXQgb2JzZXJ2YWJsZSBmb3Igb25lIHNwZWNpZmljIGl0ZW1cbiAgcHVibGljIGdldEl0ZW1CeUtleSAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvQnJvd3NlclN0b3JhZ2VSZWR1Y2VyXG4gICAgICAubWFwKChicm93c2VyU3RvcmFnZUl0ZW1zKSA9PiB7XG4gICAgICAgIHJldHVybiBicm93c2VyU3RvcmFnZUl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmtleSA9PT0ga2V5KVxuICAgICAgfSlcbiAgfVxuXG4gIC8vIFNlcmlhbGl6ZSAvIGRlc2VyaWFsaXplIGFuZCBwZXJzaXN0IGNvbmZpZyB0byBicm93c2VyIHN0b3JhZ2VcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBwcml2YXRlIF9nZXRDb25maWdGcm9tTFMgKCkge1xuICAgIGxldCBjb25maWdTdHIgPSBsb2NhbFN0b3JhZ2VbdGhpcy5fb3B0aW9ucy5uYW1lc3BhY2UgKyAnLicgKyB0aGlzLl9EQl9DT05GSUdfS0VZXVxuICAgIGlmICh0eXBlb2YgY29uZmlnU3RyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY29uZmlnU3RyKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldENvbmZpZ1RvTFMgKGNvbmZpZ09iaikge1xuICAgIGxldCBjb25maWdTdHIgPSBKU09OLnN0cmluZ2lmeShjb25maWdPYmopXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZVt0aGlzLl9vcHRpb25zLm5hbWVzcGFjZSArICcuJyArIHRoaXMuX0RCX0NPTkZJR19LRVldID0gY29uZmlnU3RyXG4gIH1cblxuICAvLyBJbml0aWFsaXplIGNvbXBvbmVudCB1cG9uIGxvYWRcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHB1YmxpYyBpbml0aWFsaXplIChvcHRpb25zKSB7XG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnMgLy8gc2F2ZSBvcHRpb25zIHRvIGNsYXNzXG4gICAgdmFyIGRiQ29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnRnJvbUxTKClcbiAgICBsZXQgdXBkYXRlZENvbmZpZ1xuICAgIGlmICghZGJDb25maWcpIHtcbiAgICAgIC8vIHRoZXJlIGlzIG5vIGN1cnJlbnQgc3RhdGUgc3RvcmVkLCBpbml0aWFsaXplIGZyb20gc2NyYXRjaFxuICAgICAgdXBkYXRlZENvbmZpZyA9IHRoaXMuX2luaXRGcm9tU2NyYXRjaChvcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhIGN1cnJlbnQgc3RhdGUgaXMgZXhpc3RpbmcsIHZhbGlkYXRlIGFnYWluc3Qgc2NoZW1hXG4gICAgICB1cGRhdGVkQ29uZmlnID0gdGhpcy5faW5pdEV4aXN0aW5nKG9wdGlvbnMubmFtZXNwYWNlLCBkYkNvbmZpZylcbiAgICB9XG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogY29Ccm93c2VyU3RvcmFnZUFjdGlvbnMuQURERURfQ09fU1RPUkVfSVRFTVMsXG4gICAgICBwYXlsb2FkOiB1cGRhdGVkQ29uZmlnW3RoaXMuX0RCX01FTU9SWV9LRVldXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIFZhbGlkYXRlIGVhY2ggZXhpc3RpbmcgaXRlbSBmcm9tIHN0b3JhZ2UgYWdhaW5zdCB0aGUgbWVtb3J5IG9iamVjdFxuICBwcml2YXRlIF9pbml0RXhpc3RpbmcgKG5hbWVzcGFjZSwgZGJDb25maWcpIHtcbiAgICBsZXQgYWN0dWFsTWVtb3J5ID0gZGJDb25maWdbdGhpcy5fREJfTUVNT1JZX0tFWV0ubWFwKChtZW1vcnlJdGVtKSA9PiB7XG4gICAgICB2YXIgc3RvcmFnZUl0ZW0gPSB3aW5kb3dbbWVtb3J5SXRlbS5zdG9yYWdlVHlwZV1bbmFtZXNwYWNlICsgJy4nICsgbWVtb3J5SXRlbS5rZXldXG4gICAgICBpZiAodHlwZW9mIHN0b3JhZ2VJdGVtID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyB0aGUgaXRlbSBkb2Vzbid0IGV4aXN0IGF0IGFsbCwgc2V0IGl0XG4gICAgICAgIHdpbmRvd1ttZW1vcnlJdGVtLnN0b3JhZ2VUeXBlXVtuYW1lc3BhY2UgKyAnLicgKyBtZW1vcnlJdGVtLmtleV0gPSBtZW1vcnlJdGVtLnZhbHVlXG4gICAgICAgIHJldHVybiBtZW1vcnlJdGVtXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYWN0dWFsVmFsdWUgPSB3aW5kb3dbbWVtb3J5SXRlbS5zdG9yYWdlVHlwZV1bbmFtZXNwYWNlICsgJy4nICsgbWVtb3J5SXRlbS5rZXldXG4gICAgICAgIGlmIChhY3R1YWxWYWx1ZSA9PT0gbWVtb3J5SXRlbS52YWx1ZSkge1xuICAgICAgICAgIC8vIHRoZSB2YWx1ZSBoYXMgbm90IGJlZW4gdG91Y2hlZCBvdXRzaWRlIG9mIHRoaXMgR1VJXG4gICAgICAgICAgcmV0dXJuIG1lbW9yeUl0ZW1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGUgdmFsdWUgaGFzIGJlZW4gbWFudWFsbHkgbW9kaWZpZWQgYnkgYSB1c2VyXG4gICAgICAgICAgbGV0IHVwZGF0ZWRNZW1vcnlJdGVtID0ge1xuICAgICAgICAgICAga2V5OiBtZW1vcnlJdGVtLmtleSxcbiAgICAgICAgICAgIHZhbHVlOiBhY3R1YWxWYWx1ZSxcbiAgICAgICAgICAgIHN0b3JhZ2VUeXBlOiBtZW1vcnlJdGVtLnN0b3JhZ2VUeXBlLFxuICAgICAgICAgICAgdmFsdWVUeXBlOiBtZW1vcnlJdGVtLnZhbHVlVHlwZSxcbiAgICAgICAgICAgIGluQ29uZmlnRmlsZTogISFtZW1vcnlJdGVtLmluQ29uZmlnRmlsZVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdXBkYXRlZE1lbW9yeUl0ZW1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgZGJDb25maWdbdGhpcy5fREJfTUVNT1JZX0tFWV0gPSBhY3R1YWxNZW1vcnlcbiAgICB0aGlzLl9zZXRDb25maWdUb0xTKGRiQ29uZmlnKVxuICAgIHJldHVybiBkYkNvbmZpZ1xuICB9XG5cbiAgLy8gSW5pdGlhbGl6ZSB0aGUgc3RvcmFnZSBpdGVtcyBmcm9tIHNjcmF0Y2hcbiAgcHJpdmF0ZSBfaW5pdEZyb21TY3JhdGNoIChvcHRpb25zKSB7XG4gICAgbGV0IHN0YXRlRm9yTWVtb3J5ID0gb3B0aW9ucy5pbml0aWFsU3RhdGUubWFwKChzY2hlbWFJdGVtKSA9PiB7XG4gICAgICAvLyB0cmFuc2Zvcm0gdGhlIHNjaGVtYSB0byB0aGUgbWVtb3J5IHR5cGVcbiAgICAgIHdpbmRvd1tzY2hlbWFJdGVtLnN0b3JhZ2VUeXBlXVtvcHRpb25zLm5hbWVzcGFjZSArICcuJyArIHNjaGVtYUl0ZW0ua2V5XSA9IHNjaGVtYUl0ZW0uZGVmYXVsdFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBzY2hlbWFJdGVtLmtleSxcbiAgICAgICAgdmFsdWU6IHNjaGVtYUl0ZW0uZGVmYXVsdCwgLy8gZnJvbSBzY3JhdGNoLCB0aGUgZGVmYXVsdCBpcyB0aGUgdmFsdWVcbiAgICAgICAgc3RvcmFnZVR5cGU6IHNjaGVtYUl0ZW0uc3RvcmFnZVR5cGUsXG4gICAgICAgIHZhbHVlVHlwZTogc2NoZW1hSXRlbS52YWx1ZVR5cGUsXG4gICAgICAgIGluQ29uZmlnRmlsZTogdHJ1ZSAvLyBvbmx5IHRoZSBvbmVzIGZyb20gdGhlIGNvbmZpZyBmaWxlIGFyZSBoZXJlLCB1c2VkIGZvciAncmVzZXQnIGZ1bmN0aW9uYWxpdHlcbiAgICAgIH1cbiAgICB9KVxuICAgIGxldCBkYkNvbmZpZyA9IHt9XG4gICAgZGJDb25maWdbdGhpcy5fREJfSU5JVElBTF9LRVldID0gb3B0aW9ucy5pbml0aWFsU3RhdGVcbiAgICBkYkNvbmZpZ1t0aGlzLl9EQl9NRU1PUllfS0VZXSA9IHN0YXRlRm9yTWVtb3J5XG4gICAgdGhpcy5fc2V0Q29uZmlnVG9MUyhkYkNvbmZpZylcbiAgICByZXR1cm4gZGJDb25maWdcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvbm9kZV9tb2R1bGVzIn0=
