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
var core_1 = require('@angular/core');
var store_1 = require('@ngrx/store');
require('rxjs/add/operator/map');
require('rxjs/add/operator/find');
var browser_storage_config_1 = require('./browser-storage.config');
var browserStorageUtil = require('./browser-storage.util');
var browser_storage_reducer_1 = require('./browser-storage.reducer');
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
    BrowserStorageModel = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Store])
    ], BrowserStorageModel);
    return BrowserStorageModel;
}());
exports.BrowserStorageModel = BrowserStorageModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1zdG9yYWdlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnJvd3Nlci1zdG9yYWdlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkIsZUFDM0IsQ0FBQyxDQUR5QztBQUMxQyxzQkFBc0IsYUFDdEIsQ0FBQyxDQURrQztBQUVuQyxRQUFPLHVCQUNQLENBQUMsQ0FENkI7QUFDOUIsUUFBTyx3QkFFUCxDQUFDLENBRjhCO0FBRS9CLHVDQUFxQywwQkFDckMsQ0FBQyxDQUQ4RDtBQUMvRCxJQUFZLGtCQUFrQixXQUFNLHdCQUVwQyxDQUFDLENBRjJEO0FBRTVELHdDQUE0QywyQkFFNUMsQ0FBQyxDQUZzRTtBQVV2RTtJQUdFLDZCQUFxQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBRjlCLDJCQUFzQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFFbkMsQ0FBQztJQUUxQywrQ0FBK0M7SUFDeEMsd0NBQVUsR0FBakIsVUFBbUIsV0FBeUI7UUFDMUMsMkRBQTJEO1FBQzNELElBQUksUUFBUSxHQUFHLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ25ELElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyw2Q0FBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxXQUFXO1lBQy9FLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQyxHQUFHLENBQUE7UUFDNUMsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUNyRSxrQkFBa0IsQ0FBQyx3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQy9ELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lB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