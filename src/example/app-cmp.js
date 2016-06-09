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
var cbs_cmp_1 = require('../co-browser-storage/cbs-cmp');
var cbs_model_1 = require('../co-browser-storage/services/cbs-model');
var example_db_config_1 = require('./example-db-config');
var AppCmp = (function () {
    function AppCmp(cbsModel) {
        this.cbsModel = cbsModel;
        this.debugMode$ = this.cbsModel.getItemByKey(example_db_config_1.DEBUG_MODE);
        this.debugModeTrue$ = this.cbsModel.truthy(example_db_config_1.DEBUG_MODE);
        this.debugAndOffline$ = this.cbsModel.truthy([example_db_config_1.DEBUG_MODE, example_db_config_1.OFFLINE_MODE]);
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            directives: [cbs_cmp_1.CbsCmp],
            template: "\n    <h2>co-browser-storage example app</h2>\n    <br>\n\n    <cbs-cmp></cbs-cmp>\n\n    <p>\n      <strong>debugMode value:</strong>\n      {{(debugMode$ | async).value}}\n    </p>\n\n    <p>\n      <strong>debugMode && offlineMode truthy:</strong>\n      {{debugAndOffline$ | async}}\n    </p>\n\n    <p>\n      <strong>debugMode truthy</strong>\n      {{debugModeTrue$ | async}}\n    </p>\n  "
        }), 
        __metadata('design:paramtypes', [cbs_model_1.CbsModel])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUN4QixDQUFDLENBRHNDO0FBQ3ZDLHdCQUFxQiwrQkFDckIsQ0FBQyxDQURtRDtBQUNwRCwwQkFBdUIsMENBQ3ZCLENBQUMsQ0FEZ0U7QUFDakUsa0NBSU8scUJBRVAsQ0FBQyxDQUYyQjtBQTJCNUI7SUFLRSxnQkFBcUIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUpoQyxlQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsOEJBQVUsQ0FBQyxDQUFDO1FBQ3BELG1CQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsOEJBQVUsQ0FBQyxDQUFDO1FBQ2xELHFCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsOEJBQVUsRUFBRSxnQ0FBWSxDQUFDLENBQUMsQ0FBQztJQUVqQyxDQUFDO0lBOUI3QztRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixVQUFVLEVBQUUsQ0FBQyxnQkFBTSxDQUFDO1lBQ3BCLFFBQVEsRUFBRSw4WUFvQlQ7U0FDRixDQUFDOztjQUFBO0lBT0YsYUFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksY0FBTSxTQU1sQixDQUFBIn0=