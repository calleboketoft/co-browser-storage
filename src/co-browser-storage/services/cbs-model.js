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
require('rxjs/add/operator/map');
require('rxjs/add/operator/find');
var cbs_config_1 = require('./cbs-config');
var cbsUtil = require('./cbs-util');
var cbs_reducer_1 = require('./cbs-reducer');
var CbsModel = (function () {
    function CbsModel(store) {
        this.store = store;
        this.cbsReducer$ = this.store.select('cbsReducer');
    }
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
    CbsModel.prototype.saveItem = function (item) {
        // Save item to browser storage
        window[item.storageType].setItem(cbsUtil.getFullCbsKey(item.key), item.value);
        // Remove any existing item with the same key from memory object and add the new one
        var dbConfig = cbsUtil.getConfigFromLS();
        dbConfig[cbs_config_1.cbsConfig.DB_MEMORY_KEY] = dbConfig[cbs_config_1.cbsConfig.DB_MEMORY_KEY].filter(function (memItem) { return item.key !== memItem.key; });
        dbConfig[cbs_config_1.cbsConfig.DB_MEMORY_KEY].push(item);
        cbsUtil.setConfigToLS(dbConfig);
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
        return this.cbsReducer$
            .map(function (browserStorageItems) {
            return browserStorageItems.find(function (item) { return item.key === key; });
        });
    };
    // Assess if provided keys' values === 'true'
    // Useful for debug flags.
    // Ex: truthy ('debugMode')
    // Ex: truthy(['debugMode', 'offlineMode'])
    CbsModel.prototype.truthy = function (keys) {
        var keysArr;
        if (Array.isArray(keys)) {
            keysArr = keys;
        }
        else if (typeof keys === 'string') {
            keysArr = [keys];
        }
        return this.cbsReducer$
            .map(function (items) {
            if (items.length === 0)
                return false;
            return items.every(function (item) {
                return keysArr.indexOf(item.key) === -1 || item.value === 'true';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2JzLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDs7Ozs7Ozs7Ozs7QUFFOUQsZ0RBQWdEO0FBQ2hELG9CQUFvQjtBQUNwQixnREFBZ0Q7QUFDaEQsbUVBQW1FO0FBQ25FLElBQUk7QUFFSixxQkFBeUIsZUFDekIsQ0FBQyxDQUR1QztBQUN4QyxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUVqQyxRQUFPLHVCQUNQLENBQUMsQ0FENkI7QUFDOUIsUUFBTyx3QkFFUCxDQUFDLENBRjhCO0FBRS9CLDJCQUF3QixjQUN4QixDQUFDLENBRHFDO0FBQ3RDLElBQVksT0FBTyxXQUFNLFlBRXpCLENBQUMsQ0FGb0M7QUFFckMsNEJBR08sZUFFUCxDQUFDLENBRnFCO0FBVXRCO0lBR0Usa0JBQXFCLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBRUQsU0FBUztJQUNULFNBQVM7SUFDRiw2QkFBVSxHQUFqQixVQUFtQixJQUFrQjtRQUNuQywyREFBMkQ7UUFDM0QsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ3hDLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxzQkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25HLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDdEMsQ0FBQztRQUNE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