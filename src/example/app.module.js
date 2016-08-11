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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var store_1 = require('@ngrx/store');
var example_db_config_1 = require('./example-db.config');
var browser_storage_1 = require('../../browser-storage');
browser_storage_1.initializeCbs(example_db_config_1.exampleDbConfig);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            imports: [platform_browser_1.BrowserModule, browser_storage_1.BrowserStorageModule],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                store_1.provideStore({
                    browserStorageReducer: browser_storage_1.browserStorageReducer
                }, {
                    browserStorageReducer: browser_storage_1.getInitialCbsState()
                })
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUN6QixDQUFDLENBRHVDO0FBQ3hDLGlDQUE4QiwyQkFDOUIsQ0FBQyxDQUR3RDtBQUN6RCw4QkFBNkIsaUJBRTdCLENBQUMsQ0FGNkM7QUFFOUMsc0JBQTZCLGFBQzdCLENBQUMsQ0FEeUM7QUFDMUMsa0NBQWdDLHFCQUNoQyxDQUFDLENBRG9EO0FBQ3JELGdDQUtPLHVCQUVQLENBQUMsQ0FGNkI7QUFFOUIsK0JBQWEsQ0FBQyxtQ0FBZSxDQUFDLENBQUE7QUFjOUI7SUFBQTtJQUF5QixDQUFDO0lBWjFCO1FBQUMsZUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUM1QixPQUFPLEVBQUUsQ0FBQyxnQ0FBYSxFQUFFLHNDQUFvQixDQUFDO1lBQzlDLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDekIsU0FBUyxFQUFFO2dCQUNULG9CQUFZLENBQUM7b0JBQ1gsOERBQXFCO2lCQUN0QixFQUFFO29CQUNELHFCQUFxQixFQUFFLG9DQUFrQixFQUFFO2lCQUM1QyxDQUFDO2FBQ0g7U0FDRixDQUFDOztpQkFBQTtJQUN1QixnQkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFBYixpQkFBUyxZQUFJLENBQUEifQ==