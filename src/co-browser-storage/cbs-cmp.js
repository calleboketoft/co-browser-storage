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
var core_1 = require('angular2/core');
var store_1 = require('@ngrx/store');
var cbs_model_1 = require('./services/cbs-model');
var storage_list_cmp_1 = require('./components/storage-list-cmp');
var new_item_cmp_1 = require('./components/new-item-cmp');
var CbsCmp = (function () {
    function CbsCmp(store, cbsModel) {
        this.store = store;
        this.cbsModel = cbsModel;
        this.cbsReducer = this.store.select('cbsReducer');
    }
    CbsCmp.prototype.ngOnInit = function () {
        this.cbsModel.initialize(this.cbsConfig);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CbsCmp.prototype, "cbsConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CbsCmp.prototype, "noRender", void 0);
    CbsCmp = __decorate([
        core_1.Component({
            selector: 'cbs-cmp',
            template: "\n    <div *ngIf='!noRender'>\n      <storage-list-cmp\n        [cbsReducer]='cbsReducer | async'\n        (remove)='cbsModel.removeItem($event)'\n        (update)='cbsModel.updateItem($event)'\n        (reset)='cbsModel.resetItem($event)'>\n      </storage-list-cmp>\n      <!-- <br>\n        Add temporary item<br>\n        <new-item-cmp (create)='cbsModel.createItem($event)'></new-item-cmp>\n      </div> -->\n    </div>\n  ",
            directives: [storage_list_cmp_1.StorageListCmp, new_item_cmp_1.NewItemCmp],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [store_1.Store, cbs_model_1.CbsModel])
    ], CbsCmp);
    return CbsCmp;
}());
exports.CbsCmp = CbsCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNicy1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFFBQU8sY0FFUCxDQUFDLENBRm9CO0FBRXJCLHFCQUF3RCxlQUN4RCxDQUFDLENBRHNFO0FBQ3ZFLHNCQUFvQixhQUNwQixDQUFDLENBRGdDO0FBQ2pDLDBCQUF1QixzQkFDdkIsQ0FBQyxDQUQ0QztBQUM3QyxpQ0FBNkIsK0JBQzdCLENBQUMsQ0FEMkQ7QUFDNUQsNkJBQXlCLDJCQUV6QixDQUFDLENBRm1EO0FBcUJwRDtJQUtFLGdCQUNVLEtBQWlCLEVBQ2pCLFFBQWlCO1FBRGpCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUV6QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFFRCx5QkFBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFiRDtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUFyQlY7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLDhhQWFUO1lBQ0QsVUFBVSxFQUFFLENBQUMsaUNBQWMsRUFBRSx5QkFBVSxDQUFDO1lBQ3hDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7O2NBQUE7SUFnQkYsYUFBQztBQUFELENBQUMsQUFmRCxJQWVDO0FBZlksY0FBTSxTQWVsQixDQUFBIn0=