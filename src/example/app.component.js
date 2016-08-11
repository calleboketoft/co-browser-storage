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
            example_db_config_1.MY_PASS,
            example_db_config_1.SESSION_ITEM
        ];
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            template: "\n    <h2>co-browser-storage example app</h2>\n    <br>\n\n    <cbs-cmp\n      [itemsToShow]='itemsToShow'\n      [showBatchUpdate]='true'\n      [showResetAll]='true'>\n    </cbs-cmp>\n\n    <p>\n      <strong>debugMode value:</strong>\n      {{(debugMode$ | async).value}}\n    </p>\n    <p>\n      <strong>debugMode && offlineMode truthy:</strong>\n      {{debugAndOffline$ | async}}\n    </p>\n    <p>\n      <strong>debugMode truthy</strong>\n      {{debugModeTrue$ | async}}\n    </p>\n\n    <br >\n\n    <h4>Basic version</h4>\n    <br >\n\n    <cbs-cmp>\n    </cbs-cmp>\n  "
        }), 
        __metadata('design:paramtypes', [cbs_model_1.CbsModel])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEwQixlQUMxQixDQUFDLENBRHdDO0FBQ3pDLDBCQUF5QiwwQ0FDekIsQ0FBQyxDQURrRTtBQUNuRSxrQ0FLTyxxQkFFUCxDQUFDLENBRjJCO0FBb0M1QjtJQVdFLHNCQUFxQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBVmhDLGVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyw4QkFBVSxDQUFDLENBQUM7UUFDcEQsbUJBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyw4QkFBVSxDQUFDLENBQUM7UUFDbEQscUJBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyw4QkFBVSxFQUFFLGdDQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLGdCQUFXLEdBQUc7WUFDbkIsOEJBQVU7WUFDVixnQ0FBWTtZQUNaLDJCQUFPO1lBQ1AsZ0NBQVk7U0FDYixDQUFBO0lBRXlDLENBQUM7SUE3QzdDO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSx1a0JBOEJUO1NBQ0YsQ0FBQzs7b0JBQUE7SUFhRixtQkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksb0JBQVksZUFZeEIsQ0FBQSJ9