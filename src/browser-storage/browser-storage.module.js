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
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var browser_storage_manager_component_1 = require("./browser-storage-manager.component");
var browser_storage_list_item_component_1 = require("./components/browser-storage-list-item.component");
var browser_storage_list_component_1 = require("./components/browser-storage-list.component");
var browser_storage_model_1 = require("./services/browser-storage.model");
var array_sort_pipe_1 = require("./services/array-sort.pipe");
var BrowserStorageModule = (function () {
    function BrowserStorageModule() {
    }
    return BrowserStorageModule;
}());
BrowserStorageModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule
        ],
        declarations: [
            browser_storage_manager_component_1.BrowserStorageManagerComponent,
            browser_storage_list_component_1.BrowserStorageListComponent,
            browser_storage_list_item_component_1.BrowserStorageListItemComponent,
            array_sort_pipe_1.ArraySortPipe
        ],
        exports: [
            browser_storage_manager_component_1.BrowserStorageManagerComponent
        ],
        providers: [
            browser_storage_model_1.BrowserStorageModel
        ]
    }),
    __metadata("design:paramtypes", [])
], BrowserStorageModule);
exports.BrowserStorageModule = BrowserStorageModule;
//# sourceMappingURL=browser-storage.module.js.map