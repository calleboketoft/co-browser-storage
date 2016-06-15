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
    CbsComponent = __decorate([
        core_1.Component({
            selector: 'cbs-cmp',
            directives: [storage_list_component_1.StorageListComponent],
            template: "\n    <div>\n      <storage-list-cmp\n        [cbsReducer]='cbsReducer$ | async'\n        (updateItem)='cbsModel.updateItem($event)'\n        (resetItem)='cbsModel.resetItem($event)'>\n      </storage-list-cmp>\n\n      <div class='row'>\n        <!-- match button position -->\n        <div class='col-lg-9 col-xs-8'>\n        </div>\n        <div class='col-lg-3 col-xs-4'>\n          <button class='btn btn-warning' (click)='resetAll()'>\n            Reset all\n          </button>\n        </div>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store, cbs_model_1.CbsModel])
    ], CbsComponent);
    return CbsComponent;
}());
exports.CbsComponent = CbsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNicy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFFBQU8sY0FFUCxDQUFDLENBRm9CO0FBRXJCLHFCQUErQixlQUMvQixDQUFDLENBRDZDO0FBQzlDLHNCQUFvQixhQUNwQixDQUFDLENBRGdDO0FBQ2pDLDBCQUF1QixzQkFDdkIsQ0FBQyxDQUQ0QztBQUM3Qyx1Q0FBbUMscUNBRW5DLENBQUMsQ0FGdUU7QUEwQnhFO0lBR0Usc0JBQ1UsS0FBaUIsRUFDakIsUUFBa0I7UUFEbEIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBSnJCLGdCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFLbEQsQ0FBQztJQUVHLCtCQUFRLEdBQWY7UUFDRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsdURBQXVELENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQXBDSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixVQUFVLEVBQUUsQ0FBQyw2Q0FBb0IsQ0FBQztZQUNsQyxRQUFRLEVBQUUsb2hCQW1CVDtTQUNGLENBQUM7O29CQUFBO0lBY0YsbUJBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQWJZLG9CQUFZLGVBYXhCLENBQUEifQ==