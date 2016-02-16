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
var AppCmp = (function () {
    function AppCmp() {
        this.exampleDbConfig = example_db_config_1.exampleDbConfig;
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            template: "\n    <div class=\"container\">\n      <h2>co-browser-storage example app</h2>\n      <co-browser-storage-cmp [coBrowserStorageConfig]=\"exampleDbConfig\"></co-browser-storage-cmp>\n    </div>\n  ",
            directives: [co_browser_storage_cmp_1.CoBrowserStorageCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], AppCmp);
    return AppCmp;
})();
exports.AppCmp = AppCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUvYXBwLWNtcC50cyJdLCJuYW1lcyI6WyJBcHBDbXAiLCJBcHBDbXAuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUN4QixDQUFDLENBRHNDO0FBQ3ZDLHVDQUFrQyw4Q0FDbEMsQ0FBQyxDQUQrRTtBQUNoRixrQ0FBOEIscUJBRTlCLENBQUMsQ0FGa0Q7QUFFbkQ7SUFBQUE7UUFXVUMsb0JBQWVBLEdBQUdBLG1DQUFlQSxDQUFBQTtJQUMzQ0EsQ0FBQ0E7SUFaREQ7UUFBQ0EsZ0JBQVNBLENBQUNBO1lBQ1RBLFFBQVFBLEVBQUVBLFNBQVNBO1lBQ25CQSxRQUFRQSxFQUFFQSxzTUFLVEE7WUFDREEsVUFBVUEsRUFBRUEsQ0FBQ0EsNENBQW1CQSxDQUFDQTtTQUNsQ0EsQ0FBQ0E7O2VBR0RBO0lBQURBLGFBQUNBO0FBQURBLENBWkEsQUFZQ0EsSUFBQTtBQUZZLGNBQU0sU0FFbEIsQ0FBQSIsImZpbGUiOiJleGFtcGxlL2FwcC1jbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSdcbmltcG9ydCB7Q29Ccm93c2VyU3RvcmFnZUNtcH0gZnJvbSAnLi4vY28tYnJvd3Nlci1zdG9yYWdlL2NvLWJyb3dzZXItc3RvcmFnZS1jbXAnXG5pbXBvcnQge2V4YW1wbGVEYkNvbmZpZ30gZnJvbSAnLi9leGFtcGxlLWRiLWNvbmZpZydcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNtcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgPGgyPmNvLWJyb3dzZXItc3RvcmFnZSBleGFtcGxlIGFwcDwvaDI+XG4gICAgICA8Y28tYnJvd3Nlci1zdG9yYWdlLWNtcCBbY29Ccm93c2VyU3RvcmFnZUNvbmZpZ109XCJleGFtcGxlRGJDb25maWdcIj48L2NvLWJyb3dzZXItc3RvcmFnZS1jbXA+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGRpcmVjdGl2ZXM6IFtDb0Jyb3dzZXJTdG9yYWdlQ21wXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBDbXAge1xuICBwcml2YXRlIGV4YW1wbGVEYkNvbmZpZyA9IGV4YW1wbGVEYkNvbmZpZ1xufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
