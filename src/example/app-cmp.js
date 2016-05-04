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
var example_db_config_1 = require('./example-db-config');
var cbs_model_1 = require('../co-browser-storage/services/cbs-model');
var AppCmp = (function () {
    function AppCmp() {
        this.exampleDbConfig = example_db_config_1.exampleDbConfig;
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            template: "\n    <h2>co-browser-storage example app</h2>\n    <br>\n\n    <div class='row'>\n      <div class='col-xs-12 col-xl-6'>\n        <h3>Manual save</h3>\n        <br>\n        <cbs-cmp\n          [cbsConfig]='exampleDbConfig'>\n        </cbs-cmp>\n      </div>\n      <div class='col-xs-12 col-xl-6' style='border-left: 1px solid #E0E0E0;'>\n        <h3>Auto save</h3>\n        <br>\n        <cbs-cmp\n          [cbsConfig]='exampleDbConfig'\n          [autosave]='true'>\n        </cbs-cmp>\n      </div>\n    </div>\n    <br><br>\n  ",
            directives: [cbs_cmp_1.CbsCmp],
            providers: [cbs_model_1.CbsModel]
        }), 
        __metadata('design:paramtypes', [])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUN4QixDQUFDLENBRHNDO0FBQ3ZDLHdCQUFxQiwrQkFDckIsQ0FBQyxDQURtRDtBQUNwRCxrQ0FBOEIscUJBQzlCLENBQUMsQ0FEa0Q7QUFDbkQsMEJBQXVCLDBDQUV2QixDQUFDLENBRmdFO0FBOEJqRTtJQUFBO1FBQ1Usb0JBQWUsR0FBRyxtQ0FBZSxDQUFDO0lBQzVDLENBQUM7SUE5QkQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLHVoQkFzQlQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyxnQkFBTSxDQUFDO1lBQ3BCLFNBQVMsRUFBRSxDQUFDLG9CQUFRLENBQUM7U0FDdEIsQ0FBQzs7Y0FBQTtJQUdGLGFBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLGNBQU0sU0FFbEIsQ0FBQSJ9