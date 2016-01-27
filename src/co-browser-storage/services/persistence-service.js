var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var PersistenceService = (function () {
    function PersistenceService() {
        /**
         * in localStorage, the config is saved like this
         * DB_CONFIG = {
         *   MEMORY_STATE: [], // current state from app
         *   INITIAL_SCHEMA: [] // initial state from when initializing app
         * }
         */
        this.DB_CONFIG_KEY = 'CO_BROWSER_DB';
        this.DB_MEMORY_KEY = 'MEMORY_STATE';
        this.DB_INITIAL_KEY = 'INITIAL_SCHEMA';
    }
    PersistenceService.prototype.setConfigToLS = function (configObj) {
        var configStr = JSON.stringify(configObj);
        window.localStorage[this.DB_CONFIG_KEY] = configStr;
    };
    PersistenceService.prototype.getConfigFromLS = function () {
        var configStr = localStorage[this.DB_CONFIG_KEY];
        if (typeof configStr === 'undefined') {
            return null;
        }
        else {
            return JSON.parse(configStr);
        }
    };
    PersistenceService.prototype.removeItem = function (kvp) {
        window[kvp.storageType]['removeItem'](kvp.key);
    };
    // Initialize
    // ----------
    PersistenceService.prototype.initialize = function (options) {
        this.options = options;
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
        return updatedConfig[this.DB_MEMORY_KEY];
    };
    // this function works on items that are in the schema
    PersistenceService.prototype.getItemFromSchema = function (itemKey) {
        var schemaItem = this.options['initialState'].filter(function (item) {
            return itemKey === item.key;
        })[0];
        if (schemaItem) {
            return {
                key: itemKey,
                value: schemaItem.default,
                storageType: schemaItem.storageType,
                valueType: schemaItem.valueType,
                inConfigFile: true
            };
        }
        return;
    };
    // Validate each existing item from storage against the memory
    PersistenceService.prototype.initExisting = function (namespace, dbConfig) {
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
    // Initialize the storage from scratch
    PersistenceService.prototype.initFromScratch = function (options) {
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
    // Save state
    // ----------
    PersistenceService.prototype.saveState = function (stateArr) {
        // Save all items like window.localStorage['coBrowserNamespace.myKey'] = 'my value'
        var that = this; // how come this is needed?
        stateArr.forEach(function (stateItem) {
            window[stateItem.storageType][that.options.namespace + '.' + stateItem.key] = stateItem.value;
        });
        var dbConfig = this.getConfigFromLS();
        // Save the whole memory object
        dbConfig[this.DB_MEMORY_KEY] = stateArr;
        this.setConfigToLS(dbConfig);
    };
    PersistenceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PersistenceService);
    return PersistenceService;
})();
exports.PersistenceService = PersistenceService;

//# sourceMappingURL=persistence-service.js.map
