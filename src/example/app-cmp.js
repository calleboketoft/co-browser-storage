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
require('rxjs/add/operator/find');
require('rxjs/add/operator/map');
var AppCmp = (function () {
    function AppCmp(cbsModel) {
        this.cbsModel = cbsModel;
        this.debugMode$ = this.cbsModel.getItemByKey('debugMode');
        this.debugModeTrue$ = this.cbsModel.truthy('debugMode');
        this.debugAndOffline$ = this.cbsModel.truthy(['debugMode', 'offlineMode']);
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            directives: [cbs_cmp_1.CbsCmp],
            template: "\n    <h2>co-browser-storage example app</h2>\n    <br>\n\n    <div class='row'>\n      <div class='col-xs-12'>\n        <cbs-cmp></cbs-cmp>\n      </div>\n    </div>\n    <strong>debugMode value:</strong>\n    {{(debugMode$ | async).value}}\n    <br>\n    <strong>debugMode && offlineMode truthy:</strong>\n    {{debugAndOffline$ | async}}\n    <br>\n    <strong>debugMode truthy</strong>\n    {{debugModeTrue$ | async}}\n  "
        }), 
        __metadata('design:paramtypes', [cbs_model_1.CbsModel])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUN4QixDQUFDLENBRHNDO0FBQ3ZDLHdCQUFxQiwrQkFDckIsQ0FBQyxDQURtRDtBQUNwRCwwQkFBdUIsMENBQ3ZCLENBQUMsQ0FEZ0U7QUFDakUsUUFBTyx3QkFDUCxDQUFDLENBRDhCO0FBQy9CLFFBQU8sdUJBRVAsQ0FBQyxDQUY2QjtBQXdCOUI7SUFLRSxnQkFBcUIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUpoQyxlQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsbUJBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRW5DLENBQUM7SUEzQjdDO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFVBQVUsRUFBRSxDQUFDLGdCQUFNLENBQUM7WUFDcEIsUUFBUSxFQUFFLDJhQWlCVDtTQUNGLENBQUM7O2NBQUE7SUFPRixhQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSxjQUFNLFNBTWxCLENBQUEifQ==