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
var cbs_model_1 = require('./services/cbs-model');
var storage_list_cmp_1 = require('./components/storage-list-cmp');
var CbsCmp = (function () {
    function CbsCmp(store, cbsModel) {
        this.store = store;
        this.cbsModel = cbsModel;
        this.autosave = false;
        this.cbsReducer = this.store.select('cbsReducer');
    }
    CbsCmp.prototype.ngOnInit = function () {
        this.cbsModel.initialize();
    };
    CbsCmp.prototype.resetAll = function () {
        if (confirm('are you sure you want to reset all values to default?')) {
            this.cbsModel.resetAll();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CbsCmp.prototype, "cbsConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CbsCmp.prototype, "noRender", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CbsCmp.prototype, "autosave", void 0);
    CbsCmp = __decorate([
        core_1.Component({
            selector: 'cbs-cmp',
            template: "\n    <div *ngIf='!noRender'>\n      <storage-list-cmp\n        [cbsReducer]='cbsReducer | async'\n        [autosave]='autosave'\n        (updateItem)='cbsModel.updateItem($event)'\n        (resetItem)='cbsModel.resetItem($event)'>\n      </storage-list-cmp>\n\n      <div class='row'>\n        <!-- match button position -->\n        <div class='col-lg-9 col-xs-8'>\n        </div>\n        <div class='col-lg-3 col-xs-4'>\n          <button class='btn btn-warning' (click)='resetAll()'>\n            Reset all\n          </button>\n        </div>\n      </div>\n    </div>\n  ",
            directives: [storage_list_cmp_1.StorageListCmp],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [store_1.Store, cbs_model_1.CbsModel])
    ], CbsCmp);
    return CbsCmp;
}());
exports.CbsCmp = CbsCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNicy1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFFBQU8sY0FFUCxDQUFDLENBRm9CO0FBRXJCLHFCQUF3RCxlQUN4RCxDQUFDLENBRHNFO0FBQ3ZFLHNCQUFvQixhQUNwQixDQUFDLENBRGdDO0FBQ2pDLDBCQUF1QixzQkFDdkIsQ0FBQyxDQUQ0QztBQUM3QyxpQ0FBNkIsK0JBRTdCLENBQUMsQ0FGMkQ7QUE0QjVEO0lBTUUsZ0JBQ1UsS0FBaUIsRUFDakIsUUFBaUI7UUFEakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBTGxCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFPeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBRUQseUJBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUVELHlCQUFRLEdBQVI7UUFDRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsdURBQXVELENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQXBCRDtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUE3QlY7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLG9rQkFvQlQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyxpQ0FBYyxDQUFDO1lBQzVCLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7O2NBQUE7SUF1QkYsYUFBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUF0QlksY0FBTSxTQXNCbEIsQ0FBQSJ9