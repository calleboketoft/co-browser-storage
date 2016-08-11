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
require('../polyfills');
var core_1 = require('@angular/core');
var store_1 = require('@ngrx/store');
var browser_storage_model_1 = require('./services/browser-storage.model');
var BrowserStorageManagerComponent = (function () {
    function BrowserStorageManagerComponent(store, browserStorageModel) {
        this.store = store;
        this.browserStorageModel = browserStorageModel;
        this.browserStorageReducer$ = this.store.select('browserStorageReducer');
    }
    BrowserStorageManagerComponent.prototype.resetAll = function () {
        if (confirm('Are you sure you want to reset all values to default?')) {
            this.browserStorageModel.resetAll();
        }
    };
    BrowserStorageManagerComponent.prototype.batchUpdate = function (items) {
        this.browserStorageModel.updateItems(items);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BrowserStorageManagerComponent.prototype, "itemsToShow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BrowserStorageManagerComponent.prototype, "showResetAll", void 0);
    BrowserStorageManagerComponent = __decorate([
        core_1.Component({
            selector: 'browser-storage-manager',
            template: "\n    <div>\n      <browser-storage-list\n        [browserStorageReducer]=\"browserStorageReducer$ | async\"\n        [itemsToShow]=\"itemsToShow\"\n        (updateItem)=\"browserStorageModel.updateItem($event)\"\n        (resetItem)=\"browserStorageModel.resetItem($event)\">\n      </browser-storage-list>\n\n      <div class=\"row\" *ngIf=\"showResetAll\">\n        <!-- match button position -->\n        <div class=\"col-lg-9 col-xs-8\">\n        </div>\n        <div class=\"col-lg-3 col-xs-4\">\n          <button class=\"btn btn-outline-warning\" (click)=\"resetAll()\">\n            Reset all\n          </button>\n        </div>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store, browser_storage_model_1.BrowserStorageModel])
    ], BrowserStorageManagerComponent);
    return BrowserStorageManagerComponent;
}());
exports.BrowserStorageManagerComponent = BrowserStorageManagerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1zdG9yYWdlLW1hbmFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnJvd3Nlci1zdG9yYWdlLW1hbmFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxRQUFPLGNBRVAsQ0FBQyxDQUZvQjtBQUVyQixxQkFBaUMsZUFDakMsQ0FBQyxDQUQrQztBQUNoRCxzQkFBc0IsYUFDdEIsQ0FBQyxDQURrQztBQUNuQyxzQ0FBb0Msa0NBRXBDLENBQUMsQ0FGcUU7QUEwQnRFO0lBS0Usd0NBQ1UsS0FBaUIsRUFDakIsbUJBQXdDO1FBRHhDLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUozQywyQkFBc0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBS3hFLENBQUM7SUFFRyxpREFBUSxHQUFmO1FBQ0UsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHVEQUF1RCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUVNLG9EQUFXLEdBQWxCLFVBQW9CLEtBQUs7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBakJEO1FBQUMsWUFBSyxFQUFFOzt1RUFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzt3RUFBQTtJQTFCVjtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSw4cEJBb0JUO1NBQ0YsQ0FBQzs7c0NBQUE7SUFvQkYscUNBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLHNDQUE4QixpQ0FtQjFDLENBQUEifQ==