// Handles all actions towards localStorage and sessionStorage
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
var CoBrowserStorageActions = require('./co-browser-storage-reducer');
var CoBrowserStorageModel = (function () {
    function CoBrowserStorageModel(store) {
        this.store = store;
        this.DB_CONFIG_KEY = 'CO_BROWSER_DB';
        this.DB_MEMORY_KEY = 'MEMORY_STATE';
        this.DB_INITIAL_KEY = 'INITIAL_SCHEMA';
        this.coBrowserStorageReducer = store.select('coBrowserStorageReducer');
    }
    CoBrowserStorageModel.prototype.saveItem = function (item) {
        // Save item to browser storage
        window[item.storageType]['setItem'](this.options.namespace + '.' + item.key, item.value);
        // Remove any existing item with the same key from memory object and add the new one
        var dbConfig = this.getConfigFromLS();
        dbConfig[this.DB_MEMORY_KEY] = dbConfig[this.DB_MEMORY_KEY].filter(function (memItem) { return item.key !== memItem.key; });
        dbConfig[this.DB_MEMORY_KEY].push(item);
        this.setConfigToLS(dbConfig);
    };
    // CRUD
    // ----
    CoBrowserStorageModel.prototype.createItem = function (item) {
        this.saveItem(item);
        this.store.dispatch({
            type: CoBrowserStorageActions.ADDED_CO_STORE_ITEM,
            payload: item
        });
    };
    CoBrowserStorageModel.prototype.updateItem = function (item) {
        this.saveItem(item);
        this.store.dispatch({
            type: CoBrowserStorageActions.UPDATE_CO_STORE_ITEM,
            payload: item
        });
    };
    CoBrowserStorageModel.prototype.resetItem = function (item) {
        var resetdItem;
        var schemaItem = this.options['initialState'].filter(function (schemaItem) {
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
        window[item.storageType]['removeItem'](this.options.namespace + '.' + item.key);
        // Remove item from memory object
        var dbConfig = this.getConfigFromLS();
        dbConfig[this.DB_MEMORY_KEY] = dbConfig[this.DB_MEMORY_KEY].filter(function (memItem) { return item.key !== memItem.key; });
        this.setConfigToLS(dbConfig);
        this.store.dispatch({
            type: CoBrowserStorageActions.REMOVED_CO_STORE_ITEM,
            payload: item
        });
    };
    // Serialize / deserialize and persist config to browser storage
    // -------------------------------------------------------------
    CoBrowserStorageModel.prototype.getConfigFromLS = function () {
        var configStr = localStorage[this.options.namespace + '.' + this.DB_CONFIG_KEY];
        if (typeof configStr === 'undefined') {
            return null;
        }
        else {
            return JSON.parse(configStr);
        }
    };
    CoBrowserStorageModel.prototype.setConfigToLS = function (configObj) {
        var configStr = JSON.stringify(configObj);
        window.localStorage[this.options.namespace + '.' + this.DB_CONFIG_KEY] = configStr;
    };
    // Initialize component upon load
    // ------------------------------
    CoBrowserStorageModel.prototype.initialize = function (options) {
        this.options = options; // save options to class
        var dbConfig = this.getConfigFromLS();
        var updatedConfig;
        if (!dbConfig) {
            // there is no current state stored, initialize from scratch
            updatedConfig = this.initFromScratch(options);
        }
        else {
            // a current state is existing, validate against schema
            updatedConfig = this.initExisting(options.namespace, dbConfig);
        }
        this.store.dispatch({
            type: CoBrowserStorageActions.ADDED_CO_STORE_ITEMS,
            payload: updatedConfig[this.DB_MEMORY_KEY]
        });
        return;
    };
    // Validate each existing item from storage against the memory object
    CoBrowserStorageModel.prototype.initExisting = function (namespace, dbConfig) {
        var actualMemory = dbConfig[this.DB_MEMORY_KEY].map(function (memoryItem) {
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
        dbConfig[this.DB_MEMORY_KEY] = actualMemory;
        this.setConfigToLS(dbConfig);
        return dbConfig;
    };
    // Initialize the storage items from scratch
    CoBrowserStorageModel.prototype.initFromScratch = function (options) {
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
        dbConfig[this.DB_INITIAL_KEY] = options.initialState;
        dbConfig[this.DB_MEMORY_KEY] = stateForMemory;
        this.setConfigToLS(dbConfig);
        return dbConfig;
    };
    CoBrowserStorageModel = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Store])
    ], CoBrowserStorageModel);
    return CoBrowserStorageModel;
})();
exports.CoBrowserStorageModel = CoBrowserStorageModel;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9zZXJ2aWNlcy9jby1icm93c2VyLXN0b3JhZ2UtbW9kZWwudHMiXSwibmFtZXMiOlsiQ29Ccm93c2VyU3RvcmFnZU1vZGVsIiwiQ29Ccm93c2VyU3RvcmFnZU1vZGVsLmNvbnN0cnVjdG9yIiwiQ29Ccm93c2VyU3RvcmFnZU1vZGVsLnNhdmVJdGVtIiwiQ29Ccm93c2VyU3RvcmFnZU1vZGVsLmNyZWF0ZUl0ZW0iLCJDb0Jyb3dzZXJTdG9yYWdlTW9kZWwudXBkYXRlSXRlbSIsIkNvQnJvd3NlclN0b3JhZ2VNb2RlbC5yZXNldEl0ZW0iLCJDb0Jyb3dzZXJTdG9yYWdlTW9kZWwucmVtb3ZlSXRlbSIsIkNvQnJvd3NlclN0b3JhZ2VNb2RlbC5nZXRDb25maWdGcm9tTFMiLCJDb0Jyb3dzZXJTdG9yYWdlTW9kZWwuc2V0Q29uZmlnVG9MUyIsIkNvQnJvd3NlclN0b3JhZ2VNb2RlbC5pbml0aWFsaXplIiwiQ29Ccm93c2VyU3RvcmFnZU1vZGVsLmluaXRFeGlzdGluZyIsIkNvQnJvd3NlclN0b3JhZ2VNb2RlbC5pbml0RnJvbVNjcmF0Y2giXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDs7Ozs7Ozs7OztBQUU5RCxnREFBZ0Q7QUFDaEQsb0JBQW9CO0FBQ3BCLGdEQUFnRDtBQUNoRCxtRUFBbUU7QUFDbkUsSUFBSTtBQUVKLHFCQUF5QixlQUN6QixDQUFDLENBRHVDO0FBQ3hDLHNCQUFvQixhQUVwQixDQUFDLENBRmdDO0FBRWpDLElBQVksdUJBQXVCLFdBQU0sOEJBRXpDLENBQUMsQ0FGc0U7QUFFdkU7SUFRRUEsK0JBQXFCQSxLQUFpQkE7UUFBakJDLFVBQUtBLEdBQUxBLEtBQUtBLENBQVlBO1FBTjlCQSxrQkFBYUEsR0FBR0EsZUFBZUEsQ0FBQ0E7UUFDaENBLGtCQUFhQSxHQUFHQSxjQUFjQSxDQUFDQTtRQUMvQkEsbUJBQWNBLEdBQUdBLGdCQUFnQkEsQ0FBQ0E7UUFLeENBLElBQUlBLENBQUNBLHVCQUF1QkEsR0FBR0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EseUJBQXlCQSxDQUFDQSxDQUFBQTtJQUN4RUEsQ0FBQ0E7SUFFREQsd0NBQVFBLEdBQVJBLFVBQVVBLElBQUlBO1FBQ1pFLCtCQUErQkE7UUFDL0JBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUFBO1FBQ3hGQSxvRkFBb0ZBO1FBQ3BGQSxJQUFJQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFBQTtRQUNyQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBQUEsT0FBT0EsSUFBSUEsT0FBQUEsSUFBSUEsQ0FBQ0EsR0FBR0EsS0FBS0EsT0FBT0EsQ0FBQ0EsR0FBR0EsRUFBeEJBLENBQXdCQSxDQUFDQSxDQUFBQTtRQUN2R0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQUE7UUFDdkNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLENBQUFBO0lBQzlCQSxDQUFDQTtJQUVERixPQUFPQTtJQUNQQSxPQUFPQTtJQUNQQSwwQ0FBVUEsR0FBVkEsVUFBWUEsSUFBSUE7UUFDZEcsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQUE7UUFDbkJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBO1lBQ2xCQSxJQUFJQSxFQUFFQSx1QkFBdUJBLENBQUNBLG1CQUFtQkE7WUFDakRBLE9BQU9BLEVBQUVBLElBQUlBO1NBQ2RBLENBQUNBLENBQUFBO0lBQ0pBLENBQUNBO0lBRURILDBDQUFVQSxHQUFWQSxVQUFZQSxJQUFJQTtRQUNkSSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFBQTtRQUNuQkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDbEJBLElBQUlBLEVBQUVBLHVCQUF1QkEsQ0FBQ0Esb0JBQW9CQTtZQUNsREEsT0FBT0EsRUFBRUEsSUFBSUE7U0FDZEEsQ0FBQ0EsQ0FBQUE7SUFDSkEsQ0FBQ0E7SUFFREoseUNBQVNBLEdBQVRBLFVBQVdBLElBQUlBO1FBQ2JLLElBQUlBLFVBQVVBLENBQUFBO1FBQ2RBLElBQUlBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLFVBQUNBLFVBQVVBO1lBQzlEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFBQTtRQUNwQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDTEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsVUFBVUEsR0FBR0E7Z0JBQ1hBLEdBQUdBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBO2dCQUNiQSxLQUFLQSxFQUFFQSxVQUFVQSxDQUFDQSxPQUFPQTtnQkFDekJBLFdBQVdBLEVBQUVBLFVBQVVBLENBQUNBLFdBQVdBO2dCQUNuQ0EsU0FBU0EsRUFBRUEsVUFBVUEsQ0FBQ0EsU0FBU0E7Z0JBQy9CQSxZQUFZQSxFQUFFQSxJQUFJQTthQUNuQkEsQ0FBQUE7UUFDSEEsQ0FBQ0E7UUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQUE7UUFDN0JBLENBQUNBO0lBQ0hBLENBQUNBO0lBRURMLDBDQUFVQSxHQUFWQSxVQUFZQSxJQUFJQTtRQUNkTSwyQkFBMkJBO1FBQzNCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxHQUFHQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFBQTtRQUMvRUEsaUNBQWlDQTtRQUNqQ0EsSUFBSUEsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQUE7UUFDckNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLFVBQUNBLE9BQU9BLElBQUtBLE9BQUFBLElBQUlBLENBQUNBLEdBQUdBLEtBQUtBLE9BQU9BLENBQUNBLEdBQUdBLEVBQXhCQSxDQUF3QkEsQ0FBQ0EsQ0FBQUE7UUFDekdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLENBQUFBO1FBQzVCQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUNsQkEsSUFBSUEsRUFBRUEsdUJBQXVCQSxDQUFDQSxxQkFBcUJBO1lBQ25EQSxPQUFPQSxFQUFFQSxJQUFJQTtTQUNkQSxDQUFDQSxDQUFBQTtJQUNKQSxDQUFDQTtJQUVETixnRUFBZ0VBO0lBQ2hFQSxnRUFBZ0VBO0lBQ2hFQSwrQ0FBZUEsR0FBZkE7UUFDRU8sSUFBSUEsU0FBU0EsR0FBR0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsR0FBR0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQUE7UUFDL0VBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLFNBQVNBLEtBQUtBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFBQTtRQUNiQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNOQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFBQTtRQUM5QkEsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFFRFAsNkNBQWFBLEdBQWJBLFVBQWVBLFNBQVNBO1FBQ3RCUSxJQUFJQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFBQTtRQUN6Q0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsR0FBR0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQUE7SUFDcEZBLENBQUNBO0lBRURSLGlDQUFpQ0E7SUFDakNBLGlDQUFpQ0E7SUFDakNBLDBDQUFVQSxHQUFWQSxVQUFZQSxPQUFPQTtRQUNqQlMsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsT0FBT0EsQ0FBQUEsQ0FBQ0Esd0JBQXdCQTtRQUMvQ0EsSUFBSUEsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQUE7UUFDckNBLElBQUlBLGFBQWFBLENBQUFBO1FBQ2pCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNkQSw0REFBNERBO1lBQzVEQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFBQTtRQUMvQ0EsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDTkEsdURBQXVEQTtZQUN2REEsYUFBYUEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQUE7UUFDaEVBLENBQUNBO1FBQ0RBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBO1lBQ2xCQSxJQUFJQSxFQUFFQSx1QkFBdUJBLENBQUNBLG9CQUFvQkE7WUFDbERBLE9BQU9BLEVBQUVBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBO1NBQzNDQSxDQUFDQSxDQUFBQTtRQUNGQSxNQUFNQSxDQUFBQTtJQUNSQSxDQUFDQTtJQUVEVCxxRUFBcUVBO0lBQ3JFQSw0Q0FBWUEsR0FBWkEsVUFBY0EsU0FBU0EsRUFBRUEsUUFBUUE7UUFDL0JVLElBQUlBLFlBQVlBLEdBQUdBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLFVBQUNBLFVBQVVBO1lBQzdEQSxJQUFJQSxXQUFXQSxHQUFHQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxTQUFTQSxHQUFHQSxHQUFHQSxHQUFHQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFBQTtZQUNsRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsV0FBV0EsS0FBS0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZDQSx3Q0FBd0NBO2dCQUN4Q0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsR0FBR0EsR0FBR0EsR0FBR0EsVUFBVUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQUE7Z0JBQ25GQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFBQTtZQUNuQkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ05BLElBQUlBLFdBQVdBLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLENBQUFBO2dCQUNsRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsS0FBS0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3JDQSxxREFBcURBO29CQUNyREEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQUE7Z0JBQ25CQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ05BLGlEQUFpREE7b0JBQ2pEQSxJQUFJQSxpQkFBaUJBLEdBQUdBO3dCQUN0QkEsR0FBR0EsRUFBRUEsVUFBVUEsQ0FBQ0EsR0FBR0E7d0JBQ25CQSxLQUFLQSxFQUFFQSxXQUFXQTt3QkFDbEJBLFdBQVdBLEVBQUVBLFVBQVVBLENBQUNBLFdBQVdBO3dCQUNuQ0EsU0FBU0EsRUFBRUEsVUFBVUEsQ0FBQ0EsU0FBU0E7d0JBQy9CQSxZQUFZQSxFQUFFQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxZQUFZQTtxQkFDeENBLENBQUFBO29CQUNEQSxNQUFNQSxDQUFDQSxpQkFBaUJBLENBQUFBO2dCQUMxQkEsQ0FBQ0E7WUFDSEEsQ0FBQ0E7UUFDSEEsQ0FBQ0EsQ0FBQ0EsQ0FBQUE7UUFDRkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsWUFBWUEsQ0FBQUE7UUFDM0NBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLENBQUFBO1FBQzVCQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFBQTtJQUNqQkEsQ0FBQ0E7SUFFRFYsNENBQTRDQTtJQUM1Q0EsK0NBQWVBLEdBQWZBLFVBQWlCQSxPQUFPQTtRQUN0QlcsSUFBSUEsY0FBY0EsR0FBR0EsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQ0EsVUFBVUE7WUFDdkRBLDBDQUEwQ0E7WUFDMUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLEdBQUdBLEdBQUdBLEdBQUdBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLFVBQVVBLENBQUNBLE9BQU9BLENBQUFBO1lBQzdGQSxNQUFNQSxDQUFDQTtnQkFDTEEsR0FBR0EsRUFBRUEsVUFBVUEsQ0FBQ0EsR0FBR0E7Z0JBQ25CQSxLQUFLQSxFQUFFQSxVQUFVQSxDQUFDQSxPQUFPQTtnQkFDekJBLFdBQVdBLEVBQUVBLFVBQVVBLENBQUNBLFdBQVdBO2dCQUNuQ0EsU0FBU0EsRUFBRUEsVUFBVUEsQ0FBQ0EsU0FBU0E7Z0JBQy9CQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSw4RUFBOEVBO2FBQ2xHQSxDQUFBQTtRQUNIQSxDQUFDQSxDQUFDQSxDQUFBQTtRQUNGQSxJQUFJQSxRQUFRQSxHQUFHQSxFQUFFQSxDQUFBQTtRQUNqQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQUE7UUFDcERBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLEdBQUdBLGNBQWNBLENBQUFBO1FBQzdDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFBQTtRQUM1QkEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQUE7SUFDakJBLENBQUNBO0lBOUpIWDtRQUFDQSxpQkFBVUEsRUFBRUE7OzhCQStKWkE7SUFBREEsNEJBQUNBO0FBQURBLENBL0pBLEFBK0pDQSxJQUFBO0FBOUpZLDZCQUFxQix3QkE4SmpDLENBQUEiLCJmaWxlIjoiY28tYnJvd3Nlci1zdG9yYWdlL3NlcnZpY2VzL2NvLWJyb3dzZXItc3RvcmFnZS1tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEhhbmRsZXMgYWxsIGFjdGlvbnMgdG93YXJkcyBsb2NhbFN0b3JhZ2UgYW5kIHNlc3Npb25TdG9yYWdlXG5cbi8vIFRoZSBjb25maWcgaXMgc2F2ZWQgbGlrZSB0aGlzIGluIGxvY2FsU3RvcmFnZVxuLy8gQ09fQlJPV1NFUl9EQiA9IHtcbi8vICAgTUVNT1JZX1NUQVRFOiBbXSwgLy8gY3VycmVudCBzdGF0ZSBmcm9tIGFwcFxuLy8gICBJTklUSUFMX1NDSEVNQTogW10gLy8gaW5pdGlhbCBzdGF0ZSBmcm9tIHdoZW4gaW5pdGlhbGl6aW5nIGFwcFxuLy8gfVxuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnXG5pbXBvcnQge1N0b3JlfSBmcm9tICdAbmdyeC9zdG9yZSdcblxuaW1wb3J0ICogYXMgQ29Ccm93c2VyU3RvcmFnZUFjdGlvbnMgZnJvbSAnLi9jby1icm93c2VyLXN0b3JhZ2UtcmVkdWNlcidcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvQnJvd3NlclN0b3JhZ2VNb2RlbCB7XG4gIHByaXZhdGUgREJfQ09ORklHX0tFWSA9ICdDT19CUk9XU0VSX0RCJztcbiAgcHJpdmF0ZSBEQl9NRU1PUllfS0VZID0gJ01FTU9SWV9TVEFURSc7XG4gIHByaXZhdGUgREJfSU5JVElBTF9LRVkgPSAnSU5JVElBTF9TQ0hFTUEnO1xuICBwcml2YXRlIG9wdGlvbnM7XG4gIHByaXZhdGUgY29Ccm93c2VyU3RvcmFnZVJlZHVjZXI7XG5cbiAgY29uc3RydWN0b3IgKHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4pIHtcbiAgICB0aGlzLmNvQnJvd3NlclN0b3JhZ2VSZWR1Y2VyID0gc3RvcmUuc2VsZWN0KCdjb0Jyb3dzZXJTdG9yYWdlUmVkdWNlcicpXG4gIH1cblxuICBzYXZlSXRlbSAoaXRlbSkge1xuICAgIC8vIFNhdmUgaXRlbSB0byBicm93c2VyIHN0b3JhZ2VcbiAgICB3aW5kb3dbaXRlbS5zdG9yYWdlVHlwZV1bJ3NldEl0ZW0nXSh0aGlzLm9wdGlvbnMubmFtZXNwYWNlICsgJy4nICsgaXRlbS5rZXksIGl0ZW0udmFsdWUpXG4gICAgLy8gUmVtb3ZlIGFueSBleGlzdGluZyBpdGVtIHdpdGggdGhlIHNhbWUga2V5IGZyb20gbWVtb3J5IG9iamVjdCBhbmQgYWRkIHRoZSBuZXcgb25lXG4gICAgbGV0IGRiQ29uZmlnID0gdGhpcy5nZXRDb25maWdGcm9tTFMoKVxuICAgIGRiQ29uZmlnW3RoaXMuREJfTUVNT1JZX0tFWV0gPSBkYkNvbmZpZ1t0aGlzLkRCX01FTU9SWV9LRVldLmZpbHRlcihtZW1JdGVtID0+IGl0ZW0ua2V5ICE9PSBtZW1JdGVtLmtleSlcbiAgICBkYkNvbmZpZ1t0aGlzLkRCX01FTU9SWV9LRVldLnB1c2goaXRlbSlcbiAgICB0aGlzLnNldENvbmZpZ1RvTFMoZGJDb25maWcpXG4gIH1cblxuICAvLyBDUlVEXG4gIC8vIC0tLS1cbiAgY3JlYXRlSXRlbSAoaXRlbSkge1xuICAgIHRoaXMuc2F2ZUl0ZW0oaXRlbSlcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IENvQnJvd3NlclN0b3JhZ2VBY3Rpb25zLkFEREVEX0NPX1NUT1JFX0lURU0sXG4gICAgICBwYXlsb2FkOiBpdGVtXG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUl0ZW0gKGl0ZW0pIHtcbiAgICB0aGlzLnNhdmVJdGVtKGl0ZW0pXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiBDb0Jyb3dzZXJTdG9yYWdlQWN0aW9ucy5VUERBVEVfQ09fU1RPUkVfSVRFTSxcbiAgICAgIHBheWxvYWQ6IGl0ZW1cbiAgICB9KVxuICB9XG5cbiAgcmVzZXRJdGVtIChpdGVtKSB7XG4gICAgbGV0IHJlc2V0ZEl0ZW1cbiAgICBsZXQgc2NoZW1hSXRlbSA9IHRoaXMub3B0aW9uc1snaW5pdGlhbFN0YXRlJ10uZmlsdGVyKChzY2hlbWFJdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5rZXkgPT09IHNjaGVtYUl0ZW0ua2V5XG4gICAgfSlbMF1cbiAgICBpZiAoc2NoZW1hSXRlbSkge1xuICAgICAgcmVzZXRkSXRlbSA9IHtcbiAgICAgICAga2V5OiBpdGVtLmtleSxcbiAgICAgICAgdmFsdWU6IHNjaGVtYUl0ZW0uZGVmYXVsdCxcbiAgICAgICAgc3RvcmFnZVR5cGU6IHNjaGVtYUl0ZW0uc3RvcmFnZVR5cGUsXG4gICAgICAgIHZhbHVlVHlwZTogc2NoZW1hSXRlbS52YWx1ZVR5cGUsXG4gICAgICAgIGluQ29uZmlnRmlsZTogdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXNldGRJdGVtKSB7XG4gICAgICB0aGlzLnVwZGF0ZUl0ZW0ocmVzZXRkSXRlbSlcbiAgICB9XG4gIH1cblxuICByZW1vdmVJdGVtIChpdGVtKSB7XG4gICAgLy8gUmVtb3ZlIGl0ZW0gZnJvbSBzdG9yYWdlXG4gICAgd2luZG93W2l0ZW0uc3RvcmFnZVR5cGVdWydyZW1vdmVJdGVtJ10odGhpcy5vcHRpb25zLm5hbWVzcGFjZSArICcuJyArIGl0ZW0ua2V5KVxuICAgIC8vIFJlbW92ZSBpdGVtIGZyb20gbWVtb3J5IG9iamVjdFxuICAgIGxldCBkYkNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnRnJvbUxTKClcbiAgICBkYkNvbmZpZ1t0aGlzLkRCX01FTU9SWV9LRVldID0gZGJDb25maWdbdGhpcy5EQl9NRU1PUllfS0VZXS5maWx0ZXIoKG1lbUl0ZW0pID0+IGl0ZW0ua2V5ICE9PSBtZW1JdGVtLmtleSlcbiAgICB0aGlzLnNldENvbmZpZ1RvTFMoZGJDb25maWcpXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiBDb0Jyb3dzZXJTdG9yYWdlQWN0aW9ucy5SRU1PVkVEX0NPX1NUT1JFX0lURU0sXG4gICAgICBwYXlsb2FkOiBpdGVtXG4gICAgfSlcbiAgfVxuXG4gIC8vIFNlcmlhbGl6ZSAvIGRlc2VyaWFsaXplIGFuZCBwZXJzaXN0IGNvbmZpZyB0byBicm93c2VyIHN0b3JhZ2VcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBnZXRDb25maWdGcm9tTFMgKCkge1xuICAgIGxldCBjb25maWdTdHIgPSBsb2NhbFN0b3JhZ2VbdGhpcy5vcHRpb25zLm5hbWVzcGFjZSArICcuJyArIHRoaXMuREJfQ09ORklHX0tFWV1cbiAgICBpZiAodHlwZW9mIGNvbmZpZ1N0ciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGNvbmZpZ1N0cilcbiAgICB9XG4gIH1cblxuICBzZXRDb25maWdUb0xTIChjb25maWdPYmopIHtcbiAgICBsZXQgY29uZmlnU3RyID0gSlNPTi5zdHJpbmdpZnkoY29uZmlnT2JqKVxuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2VbdGhpcy5vcHRpb25zLm5hbWVzcGFjZSArICcuJyArIHRoaXMuREJfQ09ORklHX0tFWV0gPSBjb25maWdTdHJcbiAgfVxuXG4gIC8vIEluaXRpYWxpemUgY29tcG9uZW50IHVwb24gbG9hZFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgaW5pdGlhbGl6ZSAob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgLy8gc2F2ZSBvcHRpb25zIHRvIGNsYXNzXG4gICAgdmFyIGRiQ29uZmlnID0gdGhpcy5nZXRDb25maWdGcm9tTFMoKVxuICAgIGxldCB1cGRhdGVkQ29uZmlnXG4gICAgaWYgKCFkYkNvbmZpZykge1xuICAgICAgLy8gdGhlcmUgaXMgbm8gY3VycmVudCBzdGF0ZSBzdG9yZWQsIGluaXRpYWxpemUgZnJvbSBzY3JhdGNoXG4gICAgICB1cGRhdGVkQ29uZmlnID0gdGhpcy5pbml0RnJvbVNjcmF0Y2gob3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYSBjdXJyZW50IHN0YXRlIGlzIGV4aXN0aW5nLCB2YWxpZGF0ZSBhZ2FpbnN0IHNjaGVtYVxuICAgICAgdXBkYXRlZENvbmZpZyA9IHRoaXMuaW5pdEV4aXN0aW5nKG9wdGlvbnMubmFtZXNwYWNlLCBkYkNvbmZpZylcbiAgICB9XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiBDb0Jyb3dzZXJTdG9yYWdlQWN0aW9ucy5BRERFRF9DT19TVE9SRV9JVEVNUyxcbiAgICAgIHBheWxvYWQ6IHVwZGF0ZWRDb25maWdbdGhpcy5EQl9NRU1PUllfS0VZXVxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBWYWxpZGF0ZSBlYWNoIGV4aXN0aW5nIGl0ZW0gZnJvbSBzdG9yYWdlIGFnYWluc3QgdGhlIG1lbW9yeSBvYmplY3RcbiAgaW5pdEV4aXN0aW5nIChuYW1lc3BhY2UsIGRiQ29uZmlnKSB7XG4gICAgbGV0IGFjdHVhbE1lbW9yeSA9IGRiQ29uZmlnW3RoaXMuREJfTUVNT1JZX0tFWV0ubWFwKChtZW1vcnlJdGVtKSA9PiB7XG4gICAgICB2YXIgc3RvcmFnZUl0ZW0gPSB3aW5kb3dbbWVtb3J5SXRlbS5zdG9yYWdlVHlwZV1bbmFtZXNwYWNlICsgJy4nICsgbWVtb3J5SXRlbS5rZXldXG4gICAgICBpZiAodHlwZW9mIHN0b3JhZ2VJdGVtID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyB0aGUgaXRlbSBkb2Vzbid0IGV4aXN0IGF0IGFsbCwgc2V0IGl0XG4gICAgICAgIHdpbmRvd1ttZW1vcnlJdGVtLnN0b3JhZ2VUeXBlXVtuYW1lc3BhY2UgKyAnLicgKyBtZW1vcnlJdGVtLmtleV0gPSBtZW1vcnlJdGVtLnZhbHVlXG4gICAgICAgIHJldHVybiBtZW1vcnlJdGVtXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYWN0dWFsVmFsdWUgPSB3aW5kb3dbbWVtb3J5SXRlbS5zdG9yYWdlVHlwZV1bbmFtZXNwYWNlICsgJy4nICsgbWVtb3J5SXRlbS5rZXldXG4gICAgICAgIGlmIChhY3R1YWxWYWx1ZSA9PT0gbWVtb3J5SXRlbS52YWx1ZSkge1xuICAgICAgICAgIC8vIHRoZSB2YWx1ZSBoYXMgbm90IGJlZW4gdG91Y2hlZCBvdXRzaWRlIG9mIHRoaXMgR1VJXG4gICAgICAgICAgcmV0dXJuIG1lbW9yeUl0ZW1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGUgdmFsdWUgaGFzIGJlZW4gbWFudWFsbHkgbW9kaWZpZWQgYnkgYSB1c2VyXG4gICAgICAgICAgbGV0IHVwZGF0ZWRNZW1vcnlJdGVtID0ge1xuICAgICAgICAgICAga2V5OiBtZW1vcnlJdGVtLmtleSxcbiAgICAgICAgICAgIHZhbHVlOiBhY3R1YWxWYWx1ZSxcbiAgICAgICAgICAgIHN0b3JhZ2VUeXBlOiBtZW1vcnlJdGVtLnN0b3JhZ2VUeXBlLFxuICAgICAgICAgICAgdmFsdWVUeXBlOiBtZW1vcnlJdGVtLnZhbHVlVHlwZSxcbiAgICAgICAgICAgIGluQ29uZmlnRmlsZTogISFtZW1vcnlJdGVtLmluQ29uZmlnRmlsZVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdXBkYXRlZE1lbW9yeUl0ZW1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgZGJDb25maWdbdGhpcy5EQl9NRU1PUllfS0VZXSA9IGFjdHVhbE1lbW9yeVxuICAgIHRoaXMuc2V0Q29uZmlnVG9MUyhkYkNvbmZpZylcbiAgICByZXR1cm4gZGJDb25maWdcbiAgfVxuXG4gIC8vIEluaXRpYWxpemUgdGhlIHN0b3JhZ2UgaXRlbXMgZnJvbSBzY3JhdGNoXG4gIGluaXRGcm9tU2NyYXRjaCAob3B0aW9ucykge1xuICAgIGxldCBzdGF0ZUZvck1lbW9yeSA9IG9wdGlvbnMuaW5pdGlhbFN0YXRlLm1hcCgoc2NoZW1hSXRlbSkgPT4ge1xuICAgICAgLy8gdHJhbnNmb3JtIHRoZSBzY2hlbWEgdG8gdGhlIG1lbW9yeSB0eXBlXG4gICAgICB3aW5kb3dbc2NoZW1hSXRlbS5zdG9yYWdlVHlwZV1bb3B0aW9ucy5uYW1lc3BhY2UgKyAnLicgKyBzY2hlbWFJdGVtLmtleV0gPSBzY2hlbWFJdGVtLmRlZmF1bHRcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogc2NoZW1hSXRlbS5rZXksXG4gICAgICAgIHZhbHVlOiBzY2hlbWFJdGVtLmRlZmF1bHQsIC8vIGZyb20gc2NyYXRjaCwgdGhlIGRlZmF1bHQgaXMgdGhlIHZhbHVlXG4gICAgICAgIHN0b3JhZ2VUeXBlOiBzY2hlbWFJdGVtLnN0b3JhZ2VUeXBlLFxuICAgICAgICB2YWx1ZVR5cGU6IHNjaGVtYUl0ZW0udmFsdWVUeXBlLFxuICAgICAgICBpbkNvbmZpZ0ZpbGU6IHRydWUgLy8gb25seSB0aGUgb25lcyBmcm9tIHRoZSBjb25maWcgZmlsZSBhcmUgaGVyZSwgdXNlZCBmb3IgJ3Jlc2V0JyBmdW5jdGlvbmFsaXR5XG4gICAgICB9XG4gICAgfSlcbiAgICBsZXQgZGJDb25maWcgPSB7fVxuICAgIGRiQ29uZmlnW3RoaXMuREJfSU5JVElBTF9LRVldID0gb3B0aW9ucy5pbml0aWFsU3RhdGVcbiAgICBkYkNvbmZpZ1t0aGlzLkRCX01FTU9SWV9LRVldID0gc3RhdGVGb3JNZW1vcnlcbiAgICB0aGlzLnNldENvbmZpZ1RvTFMoZGJDb25maWcpXG4gICAgcmV0dXJuIGRiQ29uZmlnXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL25vZGVfbW9kdWxlcyJ9
