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
var co_browser_storage_model_1 = require('../co-browser-storage/services/co-browser-storage-model');
var store_1 = require('@ngrx/store');
var ThirdPartyUsageCmp = (function () {
    function ThirdPartyUsageCmp(_store, _coStoreModel) {
        this._store = _store;
        this._coStoreModel = _coStoreModel;
    }
    ThirdPartyUsageCmp.prototype.createItem = function () {
        this._coStoreModel.createItem({ key: 'thirdPartyItem' });
    };
    ThirdPartyUsageCmp = __decorate([
        core_1.Component({
            selector: 'third-party-usage-cmp',
            template: "\n    <p>Third party cmp</p>\n    <button (click)='createItem()'>Create item 'thirdPartyItem'</button>\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store, co_browser_storage_model_1.CoBrowserStorageModel])
    ], ThirdPartyUsageCmp);
    return ThirdPartyUsageCmp;
}());
exports.ThirdPartyUsageCmp = ThirdPartyUsageCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUvdGhpcmQtcGFydHktdXNhZ2UtY21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFDeEIsQ0FBQyxDQURzQztBQUN2Qyx5Q0FBb0MseURBQ3BDLENBQUMsQ0FENEY7QUFDN0Ysc0JBQW9CLGFBRXBCLENBQUMsQ0FGZ0M7QUFTakM7SUFDRSw0QkFDVSxNQUFrQixFQUNsQixhQUFvQztRQURwQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGtCQUFhLEdBQWIsYUFBYSxDQUF1QjtJQUMzQyxDQUFDO0lBRUosdUNBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFDLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBZkg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxRQUFRLEVBQUUsNEdBR1Q7U0FDRixDQUFDOzswQkFBQTtJQVVGLHlCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSwwQkFBa0IscUJBUzlCLENBQUEiLCJmaWxlIjoiZXhhbXBsZS90aGlyZC1wYXJ0eS11c2FnZS1jbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSdcbmltcG9ydCB7Q29Ccm93c2VyU3RvcmFnZU1vZGVsfSBmcm9tICcuLi9jby1icm93c2VyLXN0b3JhZ2Uvc2VydmljZXMvY28tYnJvd3Nlci1zdG9yYWdlLW1vZGVsJ1xuaW1wb3J0IHtTdG9yZX0gZnJvbSAnQG5ncngvc3RvcmUnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoaXJkLXBhcnR5LXVzYWdlLWNtcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+VGhpcmQgcGFydHkgY21wPC9wPlxuICAgIDxidXR0b24gKGNsaWNrKT0nY3JlYXRlSXRlbSgpJz5DcmVhdGUgaXRlbSAndGhpcmRQYXJ0eUl0ZW0nPC9idXR0b24+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgVGhpcmRQYXJ0eVVzYWdlQ21wIHtcbiAgY29uc3RydWN0b3IgKFxuICAgIHByaXZhdGUgX3N0b3JlOiBTdG9yZTxhbnk+LFxuICAgIHByaXZhdGUgX2NvU3RvcmVNb2RlbDogQ29Ccm93c2VyU3RvcmFnZU1vZGVsXG4gICkge31cblxuICBjcmVhdGVJdGVtICgpIHtcbiAgICB0aGlzLl9jb1N0b3JlTW9kZWwuY3JlYXRlSXRlbSh7a2V5OiAndGhpcmRQYXJ0eUl0ZW0nfSlcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL25vZGVfbW9kdWxlcyJ9
