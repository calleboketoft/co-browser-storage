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
var browser_storage_model_1 = require('../browser-storage/services/browser-storage.model');
var example_db_config_1 = require('./example-db.config');
var AppComponent = (function () {
    function AppComponent(browserStorageModel) {
        this.browserStorageModel = browserStorageModel;
        this.debugMode$ = this.browserStorageModel.getItemByKey(example_db_config_1.DEBUG_MODE);
        this.debugModeTrue$ = this.browserStorageModel.truthy(example_db_config_1.DEBUG_MODE);
        this.debugAndOffline$ = this.browserStorageModel.truthy([example_db_config_1.DEBUG_MODE, example_db_config_1.OFFLINE_MODE]);
        this.itemsToShow = [
            example_db_config_1.DEBUG_MODE,
            example_db_config_1.OFFLINE_MODE,
            example_db_config_1.MY_PASS,
            example_db_config_1.SESSION_ITEM
        ];
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <h2>browser-storage example app</h2>\n    <br>\n\n    <browser-storage-manager\n      [itemsToShow]='itemsToShow'\n      [showBatchUpdate]='true'\n      [showResetAll]='true'>\n    </browser-storage-manager>\n\n    <p>\n      <strong>debugMode value:</strong>\n      {{(debugMode$ | async).value}}\n    </p>\n    <p>\n      <strong>debugMode && offlineMode truthy:</strong>\n      {{debugAndOffline$ | async}}\n    </p>\n    <p>\n      <strong>debugMode truthy</strong>\n      {{debugModeTrue$ | async}}\n    </p>\n  "
        }), 
        __metadata('design:paramtypes', [browser_storage_model_1.BrowserStorageModel])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEwQixlQUMxQixDQUFDLENBRHdDO0FBQ3pDLHNDQUFvQyxtREFDcEMsQ0FBQyxDQURzRjtBQUN2RixrQ0FLTyxxQkFFUCxDQUFDLENBRjJCO0FBNEI1QjtJQVdFLHNCQUFxQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQVZ0RCxlQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyw4QkFBVSxDQUFDLENBQUM7UUFDL0QsbUJBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLDhCQUFVLENBQUMsQ0FBQztRQUM3RCxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsOEJBQVUsRUFBRSxnQ0FBWSxDQUFDLENBQUMsQ0FBQztRQUMvRSxnQkFBVyxHQUFHO1lBQ25CLDhCQUFVO1lBQ1YsZ0NBQVk7WUFDWiwyQkFBTztZQUNQLGdDQUFZO1NBQ2IsQ0FBQTtJQUUrRCxDQUFDO0lBckNuRTtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSw2Z0JBc0JUO1NBQ0YsQ0FBQzs7b0JBQUE7SUFhRixtQkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksb0JBQVksZUFZeEIsQ0FBQSJ9