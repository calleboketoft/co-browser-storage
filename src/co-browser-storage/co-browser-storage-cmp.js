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
var store_1 = require('@ngrx/store');
var co_browser_storage_model_1 = require('./services/co-browser-storage-model');
var storage_list_cmp_1 = require('./components/storage-list-cmp');
var new_item_cmp_1 = require('./components/new-item-cmp');
var CoBrowserStorageCmp = (function () {
    function CoBrowserStorageCmp(store, coStoreModel) {
        this.store = store;
        this.coStoreModel = coStoreModel;
        this.coBrowserStorageReducer = this.store.select('coBrowserStorageReducer');
    }
    CoBrowserStorageCmp.prototype.ngOnInit = function () {
        this.coStoreModel.initialize(this.coBrowserStorageConfig);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CoBrowserStorageCmp.prototype, "coBrowserStorageConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CoBrowserStorageCmp.prototype, "noRender", void 0);
    CoBrowserStorageCmp = __decorate([
        core_1.Component({
            selector: 'co-browser-storage-cmp',
            template: "\n    <div *ngIf='!noRender'>\n      <h4>co-browser-storage</h4>\n      <storage-list-cmp\n        [coBrowserStorageReducer]='coBrowserStorageReducer | async'\n        (remove)='coStoreModel.removeItem($event)'\n        (update)='coStoreModel.updateItem($event)'\n        (reset)='coStoreModel.resetItem($event)'>\n      </storage-list-cmp>\n      <br>\n      Add temporary item<br>\n      <new-item-cmp (create)='coStoreModel.createItem($event)'></new-item-cmp>\n    </div>\n  ",
            directives: [storage_list_cmp_1.StorageListCmp, new_item_cmp_1.NewItemCmp],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [store_1.Store, co_browser_storage_model_1.CoBrowserStorageModel])
    ], CoBrowserStorageCmp);
    return CoBrowserStorageCmp;
}());
exports.CoBrowserStorageCmp = CoBrowserStorageCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jby1icm93c2VyLXN0b3JhZ2UtY21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0QsZUFDeEQsQ0FBQyxDQURzRTtBQUN2RSxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUNqQyx5Q0FBb0MscUNBQ3BDLENBQUMsQ0FEd0U7QUFDekUsaUNBQTZCLCtCQUM3QixDQUFDLENBRDJEO0FBQzVELDZCQUF5QiwyQkFFekIsQ0FBQyxDQUZtRDtBQXFCcEQ7SUFLRSw2QkFDVSxLQUFpQixFQUNqQixZQUFrQztRQURsQyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUUxQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQTtJQUM3RSxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFiRDtRQUFDLFlBQUssRUFBRTs7dUVBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7eURBQUE7SUFyQlY7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxRQUFRLEVBQUUsZ2VBYVQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyxpQ0FBYyxFQUFFLHlCQUFVLENBQUM7WUFDeEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzs7MkJBQUE7SUFnQkYsMEJBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQWZZLDJCQUFtQixzQkFlL0IsQ0FBQSIsImZpbGUiOiJjby1icm93c2VyLXN0b3JhZ2UvY28tYnJvd3Nlci1zdG9yYWdlLWNtcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnXG5pbXBvcnQge1N0b3JlfSBmcm9tICdAbmdyeC9zdG9yZSdcbmltcG9ydCB7Q29Ccm93c2VyU3RvcmFnZU1vZGVsfSBmcm9tICcuL3NlcnZpY2VzL2NvLWJyb3dzZXItc3RvcmFnZS1tb2RlbCdcbmltcG9ydCB7U3RvcmFnZUxpc3RDbXB9IGZyb20gJy4vY29tcG9uZW50cy9zdG9yYWdlLWxpc3QtY21wJ1xuaW1wb3J0IHtOZXdJdGVtQ21wfSBmcm9tICcuL2NvbXBvbmVudHMvbmV3LWl0ZW0tY21wJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjby1icm93c2VyLXN0b3JhZ2UtY21wJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPSchbm9SZW5kZXInPlxuICAgICAgPGg0PmNvLWJyb3dzZXItc3RvcmFnZTwvaDQ+XG4gICAgICA8c3RvcmFnZS1saXN0LWNtcFxuICAgICAgICBbY29Ccm93c2VyU3RvcmFnZVJlZHVjZXJdPSdjb0Jyb3dzZXJTdG9yYWdlUmVkdWNlciB8IGFzeW5jJ1xuICAgICAgICAocmVtb3ZlKT0nY29TdG9yZU1vZGVsLnJlbW92ZUl0ZW0oJGV2ZW50KSdcbiAgICAgICAgKHVwZGF0ZSk9J2NvU3RvcmVNb2RlbC51cGRhdGVJdGVtKCRldmVudCknXG4gICAgICAgIChyZXNldCk9J2NvU3RvcmVNb2RlbC5yZXNldEl0ZW0oJGV2ZW50KSc+XG4gICAgICA8L3N0b3JhZ2UtbGlzdC1jbXA+XG4gICAgICA8YnI+XG4gICAgICBBZGQgdGVtcG9yYXJ5IGl0ZW08YnI+XG4gICAgICA8bmV3LWl0ZW0tY21wIChjcmVhdGUpPSdjb1N0b3JlTW9kZWwuY3JlYXRlSXRlbSgkZXZlbnQpJz48L25ldy1pdGVtLWNtcD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZGlyZWN0aXZlczogW1N0b3JhZ2VMaXN0Q21wLCBOZXdJdGVtQ21wXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ29Ccm93c2VyU3RvcmFnZUNtcCB7XG4gIEBJbnB1dCgpIGNvQnJvd3NlclN0b3JhZ2VDb25maWc7XG4gIEBJbnB1dCgpIG5vUmVuZGVyO1xuICBjb0Jyb3dzZXJTdG9yYWdlUmVkdWNlcjtcblxuICBjb25zdHJ1Y3RvciAoXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8YW55PixcbiAgICBwcml2YXRlIGNvU3RvcmVNb2RlbDpDb0Jyb3dzZXJTdG9yYWdlTW9kZWxcbiAgKSB7XG4gICAgdGhpcy5jb0Jyb3dzZXJTdG9yYWdlUmVkdWNlciA9IHRoaXMuc3RvcmUuc2VsZWN0KCdjb0Jyb3dzZXJTdG9yYWdlUmVkdWNlcicpXG4gIH1cblxuICBuZ09uSW5pdCAoKSB7XG4gICAgdGhpcy5jb1N0b3JlTW9kZWwuaW5pdGlhbGl6ZSh0aGlzLmNvQnJvd3NlclN0b3JhZ2VDb25maWcpXG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9ub2RlX21vZHVsZXMifQ==
