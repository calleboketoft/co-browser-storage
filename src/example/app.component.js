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
var cbs_component_1 = require('../co-browser-storage/cbs.component');
var cbs_model_1 = require('../co-browser-storage/services/cbs.model');
var example_db_config_1 = require('./example-db.config');
var AppComponent = (function () {
    function AppComponent(cbsModel) {
        this.cbsModel = cbsModel;
        this.debugMode$ = this.cbsModel.getItemByKey(example_db_config_1.DEBUG_MODE);
        this.debugModeTrue$ = this.cbsModel.truthy(example_db_config_1.DEBUG_MODE);
        this.debugAndOffline$ = this.cbsModel.truthy([example_db_config_1.DEBUG_MODE, example_db_config_1.OFFLINE_MODE]);
        this.itemsToShow = [
            example_db_config_1.DEBUG_MODE,
            example_db_config_1.OFFLINE_MODE,
            example_db_config_1.MY_PASS
        ];
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            directives: [cbs_component_1.CbsComponent],
            template: "\n    <h2>co-browser-storage example app</h2>\n    <br>\n\n    <cbs-cmp\n      [itemsToShow]='itemsToShow'>\n    </cbs-cmp>\n\n    <p>\n      <strong>debugMode value:</strong>\n      {{(debugMode$ | async).value}}\n    </p>\n    <p>\n      <strong>debugMode && offlineMode truthy:</strong>\n      {{debugAndOffline$ | async}}\n    </p>\n    <p>\n      <strong>debugMode truthy</strong>\n      {{debugModeTrue$ | async}}\n    </p>\n  "
        }), 
        __metadata('design:paramtypes', [cbs_model_1.CbsModel])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUN4QixDQUFDLENBRHNDO0FBQ3ZDLDhCQUEyQixxQ0FDM0IsQ0FBQyxDQUQrRDtBQUNoRSwwQkFBdUIsMENBQ3ZCLENBQUMsQ0FEZ0U7QUFDakUsa0NBSU8scUJBRVAsQ0FBQyxDQUYyQjtBQTJCNUI7SUFVRSxzQkFBcUIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVRoQyxlQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsOEJBQVUsQ0FBQyxDQUFDO1FBQ3BELG1CQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsOEJBQVUsQ0FBQyxDQUFDO1FBQ2xELHFCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsOEJBQVUsRUFBRSxnQ0FBWSxDQUFDLENBQUMsQ0FBQztRQUNwRSxnQkFBVyxHQUFHO1lBQ25CLDhCQUFVO1lBQ1YsZ0NBQVk7WUFDWiwyQkFBTztTQUNSLENBQUE7SUFFeUMsQ0FBQztJQW5DN0M7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsVUFBVSxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUMxQixRQUFRLEVBQUUsbWJBb0JUO1NBQ0YsQ0FBQzs7b0JBQUE7SUFZRixtQkFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBWFksb0JBQVksZUFXeEIsQ0FBQSJ9