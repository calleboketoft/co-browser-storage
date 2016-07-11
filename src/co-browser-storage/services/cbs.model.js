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
var cbs_config_1 = require('./cbs.config');
var cbsUtil = require('./cbs.util');
var cbs_reducer_1 = require('./cbs.reducer');
var CbsModel = (function () {
    function CbsModel(store) {
        this.store = store;
        this.cbsReducer$ = this.store.select('cbsReducer');
    }
    // Update
    // ------
    CbsModel.prototype.updateItem = function (updatedItem) {
        // Get current item from LS to complete missing properties.
        var dbConfig = cbsUtil.getConfigFromLS();
        var existingItem = dbConfig[cbs_config_1.cbsConfig.DB_INITIAL_KEY].find(function (initialItem) {
            return updatedItem.key === initialItem.key;
        });
        var updatedItemPatched = Object.assign({}, existingItem, updatedItem);
        cbsUtil.saveItemToBrowserStorage(updatedItemPatched);
        this.store.dispatch({
            type: cbs_reducer_1.UPDATE_CBS_ITEM,
            payload: updatedItemPatched
        });
    };
    // Convenience functions
    // ---------------------
    CbsModel.prototype.updateItems = function (items) {
        var _this = this;
        items.forEach(function (i) { return _this.updateItem(i); });
    };
    CbsModel.prototype.resetItem = function (itemToReset) {
        var initialItem = cbs_config_1.cbsConfig.initialState.find(function (schemaItem) {
            return itemToReset.key === schemaItem.key;
        });
        if (initialItem) {
            this.updateItem(initialItem);
        }
    };
    CbsModel.prototype.resetAll = function () {
        this.updateItems(cbs_config_1.cbsConfig.initialState);
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
            if (items.length === 0) {
                return false;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2JzLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDs7Ozs7Ozs7Ozs7QUFFOUQsZ0RBQWdEO0FBQ2hELG9CQUFvQjtBQUNwQixnREFBZ0Q7QUFDaEQsbUVBQW1FO0FBQ25FLElBQUk7QUFFSixxQkFBeUIsZUFDekIsQ0FBQyxDQUR1QztBQUN4QyxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUVqQyxRQUFPLHVCQUNQLENBQUMsQ0FENkI7QUFDOUIsUUFBTyx3QkFFUCxDQUFDLENBRjhCO0FBRS9CLDJCQUF3QixjQUN4QixDQUFDLENBRHFDO0FBQ3RDLElBQVksT0FBTyxXQUFNLFlBRXpCLENBQUMsQ0FGb0M7QUFFckMsNEJBR08sZUFFUCxDQUFDLENBRnFCO0FBVXRCO0lBR0Usa0JBQXFCLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFGOUIsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUViLENBQUM7SUFFMUMsU0FBUztJQUNULFNBQVM7SUFDRiw2QkFBVSxHQUFqQixVQUFtQixXQUF5QjtRQUMxQywyREFBMkQ7UUFDM0QsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ3hDLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxzQkFBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFdBQVc7WUFDcEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssV0FBVyxDQUFDLEdBQUcsQ0FBQTtRQUM1QyxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksa0JBQWtCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQ3JFLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxD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