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
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
require("rxjs/add/operator/map");
require("rxjs/add/operator/find");
var browser_storage_config_1 = require("./browser-storage.config");
var browserStorageUtil = require("./browser-storage.util");
var browser_storage_reducer_1 = require("./browser-storage.reducer");
var BrowserStorageModel = (function () {
    function BrowserStorageModel(store) {
        this.store = store;
        this.browserStorageReducer$ = this.store.select('browserStorageReducer');
    }
    // Update in @ngrx/store and in browser storage
    BrowserStorageModel.prototype.updateItem = function (updatedItem) {
        // Get current item from LS to complete missing properties.
        var dbConfig = browserStorageUtil.getConfigFromLS();
        var existingItem = dbConfig[browser_storage_config_1.browserStorageConfig.DB_INITIAL_KEY].find(function (initialItem) {
            return updatedItem.key === initialItem.key;
        });
        var updatedItemPatched = Object.assign({}, existingItem, updatedItem);
        browserStorageUtil.saveItemToBrowserStorage(updatedItemPatched);
        this.store.dispatch({
            type: browser_storage_reducer_1.UPDATE_BROWSER_STORAGE_ITEM,
            payload: updatedItemPatched
        });
    };
    // Update a list of items
    BrowserStorageModel.prototype.updateItems = function (items) {
        var _this = this;
        items.forEach(function (i) { return _this.updateItem(i); });
    };
    // Reset item to original value
    BrowserStorageModel.prototype.resetItem = function (itemToReset) {
        var initialItem = browser_storage_config_1.browserStorageConfig.initialState.find(function (schemaItem) {
            return itemToReset.key === schemaItem.key;
        });
        if (initialItem) {
            this.updateItem(initialItem);
        }
    };
    // Reset all items to original value
    BrowserStorageModel.prototype.resetAll = function () {
        this.updateItems(browser_storage_config_1.browserStorageConfig.initialState);
    };
    // Get observable for one specific item
    BrowserStorageModel.prototype.getItemByKey = function (key) {
        return this.browserStorageReducer$
            .map(function (browserStorageItems) {
            return browserStorageItems.find(function (item) { return item.key === key; });
        });
    };
    // Assess if provided keys' values === 'true'
    // Useful for debug flags.
    // Ex: truthy ('debugMode')
    // Ex: truthy(['debugMode', 'offlineMode'])
    BrowserStorageModel.prototype.truthy = function (keys) {
        var keysArr;
        if (Array.isArray(keys)) {
            keysArr = keys;
        }
        else if (typeof keys === 'string') {
            keysArr = [keys];
        }
        return this.browserStorageReducer$
            .map(function (items) {
            if (items.length === 0) {
                return false;
            }
            return items.every(function (item) {
                return keysArr.indexOf(item.key) === -1 || item.value === 'true';
            });
        });
    };
    return BrowserStorageModel;
}());
BrowserStorageModel = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [store_1.Store])
], BrowserStorageModel);
exports.BrowserStorageModel = BrowserStorageModel;
//# sourceMappingURL=browser-storage.model.js.map