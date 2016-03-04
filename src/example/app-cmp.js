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
var core_1 = require('angular2/core');
var co_browser_storage_cmp_1 = require('../co-browser-storage/co-browser-storage-cmp');
var example_db_config_1 = require('./example-db-config');
var third_party_usage_cmp_1 = require('./third-party-usage-cmp');
var co_browser_storage_model_1 = require('../co-browser-storage/services/co-browser-storage-model');
var AppCmp = (function () {
    function AppCmp(_coBrowserStorageModel) {
        this._coBrowserStorageModel = _coBrowserStorageModel;
        this.exampleDbConfig = example_db_config_1.exampleDbConfig;
        this._thirdPartyItem = _coBrowserStorageModel.getItemByKey('thirdPartyItem');
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            template: "\n    <div class='container'>\n      <h2>co-browser-storage example app</h2>\n      <co-browser-storage-cmp\n        [coBrowserStorageConfig]='exampleDbConfig'>\n      </co-browser-storage-cmp>\n    </div>\n    <hr>\n    <br>\n    <third-party-usage-cmp\n      [thirdPartyItem]='_thirdPartyItem | async'>\n    </third-party-usage-cmp>\n  ",
            directives: [co_browser_storage_cmp_1.CoBrowserStorageCmp, third_party_usage_cmp_1.ThirdPartyUsageCmp],
            providers: [co_browser_storage_model_1.CoBrowserStorageModel]
        }), 
        __metadata('design:paramtypes', [co_browser_storage_model_1.CoBrowserStorageModel])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUN4QixDQUFDLENBRHNDO0FBQ3ZDLHVDQUFrQyw4Q0FDbEMsQ0FBQyxDQUQrRTtBQUNoRixrQ0FBOEIscUJBQzlCLENBQUMsQ0FEa0Q7QUFDbkQsc0NBQWlDLHlCQUNqQyxDQUFDLENBRHlEO0FBQzFELHlDQUFvQyx5REFFcEMsQ0FBQyxDQUY0RjtBQW9CN0Y7SUFHRSxnQkFBcUIsc0JBQTZDO1FBQTdDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFGMUQsb0JBQWUsR0FBRyxtQ0FBZSxDQUFDO1FBR3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDOUUsQ0FBQztJQXZCSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsb1ZBWVQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyw0Q0FBbUIsRUFBRSwwQ0FBa0IsQ0FBQztZQUNyRCxTQUFTLEVBQUUsQ0FBQyxnREFBcUIsQ0FBQztTQUNuQyxDQUFDOztjQUFBO0lBT0YsYUFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksY0FBTSxTQU1sQixDQUFBIn0=