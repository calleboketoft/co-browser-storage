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
var storage_list_component_1 = require('./components/storage-list.component');
var batch_update_component_1 = require('./components/batch-update.component');
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
    CbsComponent = __decorate([
        core_1.Component({
            selector: 'cbs-cmp',
            directives: [storage_list_component_1.StorageListComponent, batch_update_component_1.BatchUpdateComponent],
            template: "\n    <div>\n      <storage-list-cmp\n        [cbsReducer]='cbsReducer$ | async'\n        [itemsToShow]='itemsToShow'\n        (updateItem)='cbsModel.updateItem($event)'\n        (resetItem)='cbsModel.resetItem($event)'>\n      </storage-list-cmp>\n\n      <div class='row'>\n        <!-- match button position -->\n        <div class='col-lg-9 col-xs-8'>\n        </div>\n        <div class='col-lg-3 col-xs-4'>\n          <button class='btn btn-warning' (click)='resetAll()'>\n            Reset all\n          </button>\n        </div>\n      </div>\n      <br>\n\n      <batch-update-component\n        *ngIf='showBatchUpdate'\n        (batchUpdate)='batchUpdate($event)'>\n      </batch-update-component>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store, cbs_model_1.CbsModel])
    ], CbsComponent);
    return CbsComponent;
}());
exports.CbsComponent = CbsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFFBQU8sY0FFUCxDQUFDLENBRm9CO0FBRXJCLHFCQUErQixlQUMvQixDQUFDLENBRDZDO0FBQzlDLHNCQUFvQixhQUNwQixDQUFDLENBRGdDO0FBQ2pDLDBCQUF1QixzQkFDdkIsQ0FBQyxDQUQ0QztBQUM3Qyx1Q0FBbUMscUNBQ25DLENBQUMsQ0FEdUU7QUFDeEUsdUNBQW1DLHFDQUVuQyxDQUFDLENBRnVFO0FBaUN4RTtJQUtFLHNCQUNVLEtBQWlCLEVBQ2pCLFFBQWtCO1FBRGxCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUpyQixnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBS2xELENBQUM7SUFFRywrQkFBUSxHQUFmO1FBQ0UsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHVEQUF1RCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDMUIsQ0FBQztJQUNILENBQUM7SUFFTSxrQ0FBVyxHQUFsQixVQUFvQixLQUFLO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFqQkQ7UUFBQyxZQUFLLEVBQUU7O3FEQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7O3lEQUFBO0lBakNWO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFVBQVUsRUFBRSxDQUFDLDZDQUFvQixFQUFFLDZDQUFvQixDQUFDO1lBQ3hELFFBQVEsRUFBRSxzdEJBMEJUO1NBQ0YsQ0FBQzs7b0JBQUE7SUFvQkYsbUJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLG9CQUFZLGVBbUJ4QixDQUFBIn0=