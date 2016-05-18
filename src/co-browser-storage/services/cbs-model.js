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
var cbs_config_1 = require('./cbs-config');
var cbsUtil = require('./cbs-util');
var cbs_reducer_1 = require('./cbs-reducer');
var CbsModel = (function () {
    function CbsModel(store) {
        this.store = store;
        this.cbsReducer = this.store.select('cbsReducer');
        this.initialize();
    }
    // Initialize component upon load
    // ------------------------------
    CbsModel.prototype.initialize = function () {
        var dbConfig = cbsUtil.getConfigFromLS();
        var updatedConfig;
        if (!dbConfig) {
            // there is no current state stored, initialize from scratch
            updatedConfig = cbsUtil.initFromScratch(cbs_config_1.cbsConfig);
        }
        else {
            // a current state is existing, validate against schema
            updatedConfig = cbsUtil.initExisting(cbs_config_1.cbsConfig.namespace, dbConfig);
        }
        this.store.dispatch({
            type: cbs_reducer_1.ADDED_CBS_ITEMS,
            payload: updatedConfig[cbs_config_1.cbsConfig.DB_MEMORY_KEY]
        });
        return;
    };
    CbsModel.prototype.saveItem = function (item) {
        // Save item to browser storage
        window[item.storageType].setItem(cbsUtil.getFullCbsKey(item.key), item.value);
        // Remove any existing item with the same key from memory object and add the new one
        var dbConfig = cbsUtil.getConfigFromLS();
        dbConfig[cbs_config_1.cbsConfig.DB_MEMORY_KEY] = dbConfig[cbs_config_1.cbsConfig.DB_MEMORY_KEY].filter(function (memItem) { return item.key !== memItem.key; });
        dbConfig[cbs_config_1.cbsConfig.DB_MEMORY_KEY].push(item);
        cbsUtil.setConfigToLS(dbConfig);
    };
    // Update
    // ------
    CbsModel.prototype.updateItem = function (item) {
        // Get current item from LS to complete missing properties.
        var dbConfig = cbsUtil.getConfigFromLS();
        var existingItem = dbConfig[cbs_config_1.cbsConfig.DB_MEMORY_KEY].filter(function (memItem) { return item.key === memItem.key; })[0];
        if (!existingItem) {
            console.error('item does not exist');
        }
        var updatedItem = Object.assign({}, existingItem, item);
        this.saveItem(updatedItem);
        this.store.dispatch({
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
        var schemaItem = cbs_config_1.cbsConfig.initialState.filter(function (schemaItem) {
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
        var initialItems = cbs_config_1.cbsConfig.initialState.map(function (i) {
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
        return this.cbsReducer
            .map(function (browserStorageItems) {
            return browserStorageItems.find(function (item) { return item.key === key; });
        });
    };
    // Assess if provided keys' values === 'true'
    // Useful for debug flags.
    // Ex: allTrue(['DEBUG', 'DEBUG_XHR'])
    CbsModel.prototype.allTrue = function (keys) {
        return this.cbsReducer
            .map(function (items) {
            if (items.length === 0)
                return false;
            return items.every(function (item) {
                return keys.indexOf(item.key) === -1 || item.value === 'true';
            });
        });
    };
    CbsModel = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Store])
    ], CbsModel);
    return CbsModel;
}());
exports.CbsModel = CbsModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2JzLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDs7Ozs7Ozs7Ozs7QUFFOUQsZ0RBQWdEO0FBQ2hELG9CQUFvQjtBQUNwQixnREFBZ0Q7QUFDaEQsbUVBQW1FO0FBQ25FLElBQUk7QUFFSixxQkFBeUIsZUFDekIsQ0FBQyxDQUR1QztBQUN4QyxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUdqQywyQkFBd0IsY0FDeEIsQ0FBQyxDQURxQztBQUN0QyxJQUFZLE9BQU8sV0FBTSxZQUV6QixDQUFDLENBRm9DO0FBRXJDLDRCQUdPLGVBRVAsQ0FBQyxDQUZxQjtBQVV0QjtJQUdFLGtCQUFxQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ25CLENBQUM7SUFFRCxpQ0FBaUM7SUFDakMsaUNBQWlDO0lBQzFCLDZCQUFVLEdBQWpCO1FBQ0UsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ3hDLElBQUksYUFBYSxDQUFBO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNkLDREQUE0RDtZQUM1RCxhQUFhLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxzQkFBUyxDQUFDLENBQUE7UUFDcEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sdURBQXVEO1lBQ3ZELGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLHNCQUFTLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3JFLENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNsQixJQUFJLEVBQUUs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