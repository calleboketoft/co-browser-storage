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
})();
exports.AppCmp = AppCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUvYXBwLWNtcC50cyJdLCJuYW1lcyI6WyJBcHBDbXAiLCJBcHBDbXAuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUN4QixDQUFDLENBRHNDO0FBQ3ZDLHVDQUFrQyw4Q0FDbEMsQ0FBQyxDQUQrRTtBQUNoRixrQ0FBOEIscUJBQzlCLENBQUMsQ0FEa0Q7QUFDbkQsc0NBQWlDLHlCQUNqQyxDQUFDLENBRHlEO0FBQzFELHlDQUFvQyx5REFFcEMsQ0FBQyxDQUY0RjtBQUU3RjtJQUFBQTtRQWlCVUMsb0JBQWVBLEdBQUdBLG1DQUFlQSxDQUFBQTtJQUMzQ0EsQ0FBQ0E7SUFsQkREO1FBQUNBLGdCQUFTQSxDQUFDQTtZQUNUQSxRQUFRQSxFQUFFQSxTQUFTQTtZQUNuQkEsUUFBUUEsRUFBRUEsNFJBVVRBO1lBQ0RBLFVBQVVBLEVBQUVBLENBQUNBLDRDQUFtQkEsRUFBRUEsMENBQWtCQSxDQUFDQTtZQUNyREEsU0FBU0EsRUFBRUEsQ0FBQ0EsZ0RBQXFCQSxDQUFDQTtTQUNuQ0EsQ0FBQ0E7O2VBR0RBO0lBQURBLGFBQUNBO0FBQURBLENBbEJBLEFBa0JDQSxJQUFBO0FBRlksY0FBTSxTQUVsQixDQUFBIiwiZmlsZSI6ImV4YW1wbGUvYXBwLWNtcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJ1xuaW1wb3J0IHtDb0Jyb3dzZXJTdG9yYWdlQ21wfSBmcm9tICcuLi9jby1icm93c2VyLXN0b3JhZ2UvY28tYnJvd3Nlci1zdG9yYWdlLWNtcCdcbmltcG9ydCB7ZXhhbXBsZURiQ29uZmlnfSBmcm9tICcuL2V4YW1wbGUtZGItY29uZmlnJ1xuaW1wb3J0IHtUaGlyZFBhcnR5VXNhZ2VDbXB9IGZyb20gJy4vdGhpcmQtcGFydHktdXNhZ2UtY21wJ1xuaW1wb3J0IHtDb0Jyb3dzZXJTdG9yYWdlTW9kZWx9IGZyb20gJy4uL2NvLWJyb3dzZXItc3RvcmFnZS9zZXJ2aWNlcy9jby1icm93c2VyLXN0b3JhZ2UtbW9kZWwnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1jbXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9J2NvbnRhaW5lcic+XG4gICAgICA8aDI+Y28tYnJvd3Nlci1zdG9yYWdlIGV4YW1wbGUgYXBwPC9oMj5cbiAgICAgIDxjby1icm93c2VyLXN0b3JhZ2UtY21wXG4gICAgICAgIFtjb0Jyb3dzZXJTdG9yYWdlQ29uZmlnXT0nZXhhbXBsZURiQ29uZmlnJz5cbiAgICAgIDwvY28tYnJvd3Nlci1zdG9yYWdlLWNtcD5cbiAgICA8L2Rpdj5cbiAgICA8aHI+XG4gICAgPGJyPlxuICAgIDx0aGlyZC1wYXJ0eS11c2FnZS1jbXA+PC90aGlyZC1wYXJ0eS11c2FnZS1jbXA+XG4gIGAsXG4gIGRpcmVjdGl2ZXM6IFtDb0Jyb3dzZXJTdG9yYWdlQ21wLCBUaGlyZFBhcnR5VXNhZ2VDbXBdLFxuICBwcm92aWRlcnM6IFtDb0Jyb3dzZXJTdG9yYWdlTW9kZWxdXG59KVxuZXhwb3J0IGNsYXNzIEFwcENtcCB7XG4gIHByaXZhdGUgZXhhbXBsZURiQ29uZmlnID0gZXhhbXBsZURiQ29uZmlnXG59Il0sInNvdXJjZVJvb3QiOiIvbm9kZV9tb2R1bGVzIn0=
