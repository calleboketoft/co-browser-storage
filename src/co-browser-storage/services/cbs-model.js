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
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2JzLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDs7Ozs7Ozs7Ozs7QUFFOUQsZ0RBQWdEO0FBQ2hELG9CQUFvQjtBQUNwQixnREFBZ0Q7QUFDaEQsbUVBQW1FO0FBQ25FLElBQUk7QUFFSixxQkFBeUIsZUFDekIsQ0FBQyxDQUR1QztBQUN4QyxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUdqQywyQkFBd0IsY0FDeEIsQ0FBQyxDQURxQztBQUN0QyxJQUFZLE9BQU8sV0FBTSxZQUV6QixDQUFDLENBRm9DO0FBRXJDLDRCQUdPLGVBRVAsQ0FBQyxDQUZxQjtBQVV0QjtJQUdFLGtCQUFxQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUVPLDJCQUFRLEdBQWhCLFVBQWtCLElBQWtCO1FBQ2xDLCtCQUErQjtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDN0Usb0ZBQW9GO1FBQ3BGLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUN4QyxRQUFRLENBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxRQUFRLENBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxJQUFJLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHLEVBQXhCLENBQXdCLENBQUMsQ0FBQTtRQUNqSCxRQUFRLENBQUMsc0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FB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