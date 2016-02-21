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
            template: "\n    <div class='container'>\n      <h2>co-browser-storage example app</h2>\n      <co-browser-storage-cmp\n        [coBrowserStorageConfig]='exampleDbConfig'>\n      </co-browser-storage-cmp>\n    </div>\n  ",
            directives: [co_browser_storage_cmp_1.CoBrowserStorageCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], AppCmp);
    return AppCmp;
})();
exports.AppCmp = AppCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUvYXBwLWNtcC50cyJdLCJuYW1lcyI6WyJBcHBDbXAiLCJBcHBDbXAuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUN4QixDQUFDLENBRHNDO0FBQ3ZDLHVDQUFrQyw4Q0FDbEMsQ0FBQyxDQUQrRTtBQUNoRixrQ0FBOEIscUJBRTlCLENBQUMsQ0FGa0Q7QUFFbkQ7SUFBQUE7UUFhVUMsb0JBQWVBLEdBQUdBLG1DQUFlQSxDQUFBQTtJQUMzQ0EsQ0FBQ0E7SUFkREQ7UUFBQ0EsZ0JBQVNBLENBQUNBO1lBQ1RBLFFBQVFBLEVBQUVBLFNBQVNBO1lBQ25CQSxRQUFRQSxFQUFFQSxtTkFPVEE7WUFDREEsVUFBVUEsRUFBRUEsQ0FBQ0EsNENBQW1CQSxDQUFDQTtTQUNsQ0EsQ0FBQ0E7O2VBR0RBO0lBQURBLGFBQUNBO0FBQURBLENBZEEsQUFjQ0EsSUFBQTtBQUZZLGNBQU0sU0FFbEIsQ0FBQSIsImZpbGUiOiJleGFtcGxlL2FwcC1jbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSdcbmltcG9ydCB7Q29Ccm93c2VyU3RvcmFnZUNtcH0gZnJvbSAnLi4vY28tYnJvd3Nlci1zdG9yYWdlL2NvLWJyb3dzZXItc3RvcmFnZS1jbXAnXG5pbXBvcnQge2V4YW1wbGVEYkNvbmZpZ30gZnJvbSAnLi9leGFtcGxlLWRiLWNvbmZpZydcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNtcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz0nY29udGFpbmVyJz5cbiAgICAgIDxoMj5jby1icm93c2VyLXN0b3JhZ2UgZXhhbXBsZSBhcHA8L2gyPlxuICAgICAgPGNvLWJyb3dzZXItc3RvcmFnZS1jbXBcbiAgICAgICAgW2NvQnJvd3NlclN0b3JhZ2VDb25maWddPSdleGFtcGxlRGJDb25maWcnPlxuICAgICAgPC9jby1icm93c2VyLXN0b3JhZ2UtY21wPlxuICAgIDwvZGl2PlxuICBgLFxuICBkaXJlY3RpdmVzOiBbQ29Ccm93c2VyU3RvcmFnZUNtcF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwQ21wIHtcbiAgcHJpdmF0ZSBleGFtcGxlRGJDb25maWcgPSBleGFtcGxlRGJDb25maWdcbn0iXSwic291cmNlUm9vdCI6Ii9ub2RlX21vZHVsZXMifQ==
