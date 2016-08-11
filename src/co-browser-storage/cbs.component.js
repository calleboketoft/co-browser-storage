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
var cbs_model_1 = require('./services/cbs.model');
var CbsComponent = (function () {
    function CbsComponent(store, cbsModel) {
        this.store = store;
        this.cbsModel = cbsModel;
        this.cbsReducer$ = this.store.select('cbsReducer');
    }
    CbsComponent.prototype.resetAll = function () {
        if (confirm('Are you sure you want to reset all values to default?')) {
            this.cbsModel.resetAll();
        }
    };
    CbsComponent.prototype.batchUpdate = function (items) {
        this.cbsModel.updateItems(items);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CbsComponent.prototype, "itemsToShow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CbsComponent.prototype, "showBatchUpdate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CbsComponent.prototype, "showResetAll", void 0);
    CbsComponent = __decorate([
        core_1.Component({
            selector: 'cbs-cmp',
            template: "\n    <div>\n      <storage-list-cmp\n        [cbsReducer]=\"cbsReducer$ | async\"\n        [itemsToShow]=\"itemsToShow\"\n        (updateItem)=\"cbsModel.updateItem($event)\"\n        (resetItem)=\"cbsModel.resetItem($event)\">\n      </storage-list-cmp>\n\n      <div class=\"row\" *ngIf=\"showResetAll\">\n        <!-- match button position -->\n        <div class=\"col-lg-9 col-xs-8\">\n        </div>\n        <div class=\"col-lg-3 col-xs-4\">\n          <button class=\"btn btn-outline-warning\" (click)=\"resetAll()\">\n            Reset all\n          </button>\n        </div>\n      </div>\n      <br>\n\n      <batch-update-component\n        *ngIf=\"showBatchUpdate\"\n        (batchUpdate)=\"batchUpdate($event)\">\n      </batch-update-component>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store, cbs_model_1.CbsModel])
    ], CbsComponent);
    return CbsComponent;
}());
exports.CbsComponent = CbsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFFBQU8sY0FFUCxDQUFDLENBRm9CO0FBRXJCLHFCQUFpQyxlQUNqQyxDQUFDLENBRCtDO0FBQ2hELHNCQUFzQixhQUN0QixDQUFDLENBRGtDO0FBQ25DLDBCQUF5QixzQkFFekIsQ0FBQyxDQUY4QztBQWdDL0M7SUFNRSxzQkFDVSxLQUFpQixFQUNqQixRQUFrQjtRQURsQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFKckIsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUtsRCxDQUFDO0lBRUcsK0JBQVEsR0FBZjtRQUNFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx1REFBdUQsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQzFCLENBQUM7SUFDSCxDQUFDO0lBRU0sa0NBQVcsR0FBbEIsVUFBb0IsS0FBSztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBbEJEO1FBQUMsWUFBSyxFQUFFOztxREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzt5REFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOztzREFBQTtJQWpDVjtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsMndCQTBCVDtTQUNGLENBQUM7O29CQUFBO0lBcUJGLG1CQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQXBCWSxvQkFBWSxlQW9CeEIsQ0FBQSJ9