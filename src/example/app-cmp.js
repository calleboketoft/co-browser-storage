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
    function AppCmp() {
        this.exampleDbConfig = example_db_config_1.exampleDbConfig;
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            template: "\n    <div class='container'>\n      <h2>co-browser-storage example app</h2>\n      <co-browser-storage-cmp\n        [coBrowserStorageConfig]='exampleDbConfig'>\n      </co-browser-storage-cmp>\n    </div>\n    <hr>\n    <br>\n    <third-party-usage-cmp></third-party-usage-cmp>\n  ",
            directives: [co_browser_storage_cmp_1.CoBrowserStorageCmp, third_party_usage_cmp_1.ThirdPartyUsageCmp],
            providers: [co_browser_storage_model_1.CoBrowserStorageModel]
        }), 
        __metadata('design:paramtypes', [])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUvYXBwLWNtcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQ3hCLENBQUMsQ0FEc0M7QUFDdkMsdUNBQWtDLDhDQUNsQyxDQUFDLENBRCtFO0FBQ2hGLGtDQUE4QixxQkFDOUIsQ0FBQyxDQURrRDtBQUNuRCxzQ0FBaUMseUJBQ2pDLENBQUMsQ0FEeUQ7QUFDMUQseUNBQW9DLHlEQUVwQyxDQUFDLENBRjRGO0FBa0I3RjtJQUFBO1FBQ1Usb0JBQWUsR0FBRyxtQ0FBZSxDQUFBO0lBQzNDLENBQUM7SUFsQkQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLDRSQVVUO1lBQ0QsVUFBVSxFQUFFLENBQUMsNENBQW1CLEVBQUUsMENBQWtCLENBQUM7WUFDckQsU0FBUyxFQUFFLENBQUMsZ0RBQXFCLENBQUM7U0FDbkMsQ0FBQzs7Y0FBQTtJQUdGLGFBQUM7QUFBRCxDQUZBLEFBRUMsSUFBQTtBQUZZLGNBQU0sU0FFbEIsQ0FBQSIsImZpbGUiOiJleGFtcGxlL2FwcC1jbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSdcbmltcG9ydCB7Q29Ccm93c2VyU3RvcmFnZUNtcH0gZnJvbSAnLi4vY28tYnJvd3Nlci1zdG9yYWdlL2NvLWJyb3dzZXItc3RvcmFnZS1jbXAnXG5pbXBvcnQge2V4YW1wbGVEYkNvbmZpZ30gZnJvbSAnLi9leGFtcGxlLWRiLWNvbmZpZydcbmltcG9ydCB7VGhpcmRQYXJ0eVVzYWdlQ21wfSBmcm9tICcuL3RoaXJkLXBhcnR5LXVzYWdlLWNtcCdcbmltcG9ydCB7Q29Ccm93c2VyU3RvcmFnZU1vZGVsfSBmcm9tICcuLi9jby1icm93c2VyLXN0b3JhZ2Uvc2VydmljZXMvY28tYnJvd3Nlci1zdG9yYWdlLW1vZGVsJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtY21wJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPSdjb250YWluZXInPlxuICAgICAgPGgyPmNvLWJyb3dzZXItc3RvcmFnZSBleGFtcGxlIGFwcDwvaDI+XG4gICAgICA8Y28tYnJvd3Nlci1zdG9yYWdlLWNtcFxuICAgICAgICBbY29Ccm93c2VyU3RvcmFnZUNvbmZpZ109J2V4YW1wbGVEYkNvbmZpZyc+XG4gICAgICA8L2NvLWJyb3dzZXItc3RvcmFnZS1jbXA+XG4gICAgPC9kaXY+XG4gICAgPGhyPlxuICAgIDxicj5cbiAgICA8dGhpcmQtcGFydHktdXNhZ2UtY21wPjwvdGhpcmQtcGFydHktdXNhZ2UtY21wPlxuICBgLFxuICBkaXJlY3RpdmVzOiBbQ29Ccm93c2VyU3RvcmFnZUNtcCwgVGhpcmRQYXJ0eVVzYWdlQ21wXSxcbiAgcHJvdmlkZXJzOiBbQ29Ccm93c2VyU3RvcmFnZU1vZGVsXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBDbXAge1xuICBwcml2YXRlIGV4YW1wbGVEYkNvbmZpZyA9IGV4YW1wbGVEYkNvbmZpZ1xufVxuIl0sInNvdXJjZVJvb3QiOiIvbm9kZV9tb2R1bGVzIn0=
