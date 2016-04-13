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
var co_browser_storage_model_1 = require('./services/co-browser-storage-model');
var storage_list_cmp_1 = require('./components/storage-list-cmp');
var new_item_cmp_1 = require('./components/new-item-cmp');
var CoBrowserStorageCmp = (function () {
    function CoBrowserStorageCmp(store, coStoreModel) {
        this.store = store;
        this.coStoreModel = coStoreModel;
        this.coBrowserStorageReducer = this.store.select('coBrowserStorageReducer');
    }
    CoBrowserStorageCmp.prototype.ngOnInit = function () {
        this.coStoreModel.initialize(this.coBrowserStorageConfig);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CoBrowserStorageCmp.prototype, "coBrowserStorageConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CoBrowserStorageCmp.prototype, "noRender", void 0);
    CoBrowserStorageCmp = __decorate([
        core_1.Component({
            selector: 'co-browser-storage-cmp',
            template: "\n    <div *ngIf='!noRender'>\n      <h4>co-browser-storage</h4>\n      <storage-list-cmp\n        [coBrowserStorageReducer]='coBrowserStorageReducer | async'\n        (remove)='coStoreModel.removeItem($event)'\n        (update)='coStoreModel.updateItem($event)'\n        (reset)='coStoreModel.resetItem($event)'>\n      </storage-list-cmp>\n      <br>\n      <div *ngIf='false'><!-- skip for now -->\n        Add temporary item<br>\n        <new-item-cmp (create)='coStoreModel.createItem($event)'></new-item-cmp>\n      </div>\n    </div>\n  ",
            directives: [storage_list_cmp_1.StorageListCmp, new_item_cmp_1.NewItemCmp],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [store_1.Store, co_browser_storage_model_1.CoBrowserStorageModel])
    ], CoBrowserStorageCmp);
    return CoBrowserStorageCmp;
}());
exports.CoBrowserStorageCmp = CoBrowserStorageCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY28tYnJvd3Nlci1zdG9yYWdlLWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFFBQU8sY0FFUCxDQUFDLENBRm9CO0FBRXJCLHFCQUF3RCxlQUN4RCxDQUFDLENBRHNFO0FBQ3ZFLHNCQUFvQixhQUNwQixDQUFDLENBRGdDO0FBQ2pDLHlDQUFvQyxxQ0FDcEMsQ0FBQyxDQUR3RTtBQUN6RSxpQ0FBNkIsK0JBQzdCLENBQUMsQ0FEMkQ7QUFDNUQsNkJBQXlCLDJCQUV6QixDQUFDLENBRm1EO0FBdUJwRDtJQUtFLDZCQUNVLEtBQWlCLEVBQ2pCLFlBQWtDO1FBRGxDLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBRTFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO0lBQzdFLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDM0QsQ0FBQztJQWJEO1FBQUMsWUFBSyxFQUFFOzt1RUFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzt5REFBQTtJQXZCVjtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSxraUJBZVQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyxpQ0FBYyxFQUFFLHlCQUFVLENBQUM7WUFDeEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzs7MkJBQUE7SUFnQkYsMEJBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQWZZLDJCQUFtQixzQkFlL0IsQ0FBQSJ9