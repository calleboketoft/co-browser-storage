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
var cbs_config_1 = require('./cbs.config');
var cbsUtil = require('./cbs.util');
var cbs_reducer_1 = require('./cbs.reducer');
var CbsModel = (function () {
    function CbsModel(store) {
        this.store = store;
        this.cbsReducer$ = this.store.select('cbsReducer');
    }
    // Update in @ngrx/store and in browser storage
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
    // Update a list of items
    CbsModel.prototype.updateItems = function (items) {
        var _this = this;
        items.forEach(function (i) { return _this.updateItem(i); });
    };
    // Reset item to original value
    CbsModel.prototype.resetItem = function (itemToReset) {
        var initialItem = cbs_config_1.cbsConfig.initialState.find(function (schemaItem) {
            return itemToReset.key === schemaItem.key;
        });
        if (initialItem) {
            this.updateItem(initialItem);
        }
    };
    // Reset all items to original value
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2JzLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFDekIsQ0FBQyxDQUR1QztBQUN4QyxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUVqQyxRQUFPLHVCQUNQLENBQUMsQ0FENkI7QUFDOUIsUUFBTyx3QkFFUCxDQUFDLENBRjhCO0FBRS9CLDJCQUF3QixjQUN4QixDQUFDLENBRHFDO0FBQ3RDLElBQVksT0FBTyxXQUFNLFlBRXpCLENBQUMsQ0FGb0M7QUFFckMsNEJBQThCLGVBRTlCLENBQUMsQ0FGNEM7QUFVN0M7SUFHRSxrQkFBcUIsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUY5QixnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRWIsQ0FBQztJQUUxQywrQ0FBK0M7SUFDeEMsNkJBQVUsR0FBakIsVUFBbUIsV0FBeUI7UUFDMUMsMkRBQTJEO1FBQzNELElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUN4QyxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsc0JBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxXQUFXO1lBQ3BFLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQyxHQUFHLENBQUE7UUFDNUMsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUNyRSxPQUFPLENBQUMsd0JBQXdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNsQixJQUFJLEVBQUUsNkJBQWU7WUFDckIsT0FBTyxFQUFFLGtC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