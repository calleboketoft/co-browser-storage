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
var cbs_cmp_1 = require('../co-browser-storage/cbs-cmp');
var example_db_config_1 = require('./example-db-config');
var third_party_usage_cmp_1 = require('./third-party-usage-cmp');
var cbs_model_1 = require('../co-browser-storage/services/cbs-model');
var AppCmp = (function () {
    function AppCmp(_cbsModel) {
        this._cbsModel = _cbsModel;
        this.exampleDbConfig = example_db_config_1.exampleDbConfig;
        this._thirdPartyItem = _cbsModel.getItemByKey('thirdPartyItem');
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            template: "\n    <div class='container'>\n      <h2>co-browser-storage example app</h2>\n      <br><br>\n      <cbs-cmp\n        [cbsConfig]='exampleDbConfig'>\n      </cbs-cmp>\n    </div>\n    <hr>\n    <br>\n    <third-party-usage-cmp\n      [thirdPartyItem]='_thirdPartyItem | async'>\n    </third-party-usage-cmp>\n  ",
            directives: [cbs_cmp_1.CbsCmp, third_party_usage_cmp_1.ThirdPartyUsageCmp],
            providers: [cbs_model_1.CbsModel]
        }), 
        __metadata('design:paramtypes', [cbs_model_1.CbsModel])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUN4QixDQUFDLENBRHNDO0FBQ3ZDLHdCQUFxQiwrQkFDckIsQ0FBQyxDQURtRDtBQUNwRCxrQ0FBOEIscUJBQzlCLENBQUMsQ0FEa0Q7QUFDbkQsc0NBQWlDLHlCQUNqQyxDQUFDLENBRHlEO0FBQzFELDBCQUF1QiwwQ0FFdkIsQ0FBQyxDQUZnRTtBQXFCakU7SUFHRSxnQkFBcUIsU0FBbUI7UUFBbkIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUZoQyxvQkFBZSxHQUFHLG1DQUFlLENBQUM7UUFHeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDakUsQ0FBQztJQXhCSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUseVRBYVQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyxnQkFBTSxFQUFFLDBDQUFrQixDQUFDO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLG9CQUFRLENBQUM7U0FDdEIsQ0FBQzs7Y0FBQTtJQU9GLGFBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQU5ZLGNBQU0sU0FNbEIsQ0FBQSJ9