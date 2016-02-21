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
})();
exports.CoBrowserStorageCmp = CoBrowserStorageCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jby1icm93c2VyLXN0b3JhZ2UtY21wLnRzIl0sIm5hbWVzIjpbIkNvQnJvd3NlclN0b3JhZ2VDbXAiLCJDb0Jyb3dzZXJTdG9yYWdlQ21wLmNvbnN0cnVjdG9yIiwiQ29Ccm93c2VyU3RvcmFnZUNtcC5uZ09uSW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEscUJBQXdELGVBQ3hELENBQUMsQ0FEc0U7QUFDdkUsc0JBQW9CLGFBQ3BCLENBQUMsQ0FEZ0M7QUFFakMseUNBQW9DLHFDQUNwQyxDQUFDLENBRHdFO0FBQ3pFLGlDQUE2QiwrQkFDN0IsQ0FBQyxDQUQyRDtBQUM1RCw2QkFBeUIsMkJBRXpCLENBQUMsQ0FGbUQ7QUFFcEQ7SUF3QkVBLDZCQUNVQSxLQUFpQkEsRUFDakJBLFlBQWtDQTtRQURsQ0MsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBWUE7UUFDakJBLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFzQkE7UUFFMUNBLElBQUlBLENBQUNBLHVCQUF1QkEsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EseUJBQXlCQSxDQUFDQSxDQUFBQTtJQUM3RUEsQ0FBQ0E7SUFFREQsc0NBQVFBLEdBQVJBO1FBQ0VFLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQUE7SUFDM0RBLENBQUNBO0lBYkRGO1FBQUNBLFlBQUtBLEVBQUVBOztPQUFDQSx1REFBc0JBLFVBQUNBO0lBQ2hDQTtRQUFDQSxZQUFLQSxFQUFFQTs7T0FBQ0EseUNBQVFBLFVBQUNBO0lBckJwQkE7UUFBQ0EsZ0JBQVNBLENBQUNBO1lBQ1RBLFFBQVFBLEVBQUVBLHdCQUF3QkE7WUFDbENBLFFBQVFBLEVBQUVBLGdlQWFUQTtZQUNEQSxVQUFVQSxFQUFFQSxDQUFDQSxpQ0FBY0EsRUFBRUEseUJBQVVBLENBQUNBO1lBQ3hDQSxlQUFlQSxFQUFFQSw4QkFBdUJBLENBQUNBLE1BQU1BO1NBQ2hEQSxDQUFDQTs7NEJBZ0JEQTtJQUFEQSwwQkFBQ0E7QUFBREEsQ0FsQ0EsQUFrQ0NBLElBQUE7QUFmWSwyQkFBbUIsc0JBZS9CLENBQUEiLCJmaWxlIjoiY28tYnJvd3Nlci1zdG9yYWdlL2NvLWJyb3dzZXItc3RvcmFnZS1jbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdhbmd1bGFyMi9jb3JlJ1xuaW1wb3J0IHtTdG9yZX0gZnJvbSAnQG5ncngvc3RvcmUnXG5pbXBvcnQgKiBhcyBDb0Jyb3dzZXJTdG9yYWdlQWN0aW9ucyBmcm9tICcuL3NlcnZpY2VzL2NvLWJyb3dzZXItc3RvcmFnZS1yZWR1Y2VyJ1xuaW1wb3J0IHtDb0Jyb3dzZXJTdG9yYWdlTW9kZWx9IGZyb20gJy4vc2VydmljZXMvY28tYnJvd3Nlci1zdG9yYWdlLW1vZGVsJ1xuaW1wb3J0IHtTdG9yYWdlTGlzdENtcH0gZnJvbSAnLi9jb21wb25lbnRzL3N0b3JhZ2UtbGlzdC1jbXAnXG5pbXBvcnQge05ld0l0ZW1DbXB9IGZyb20gJy4vY29tcG9uZW50cy9uZXctaXRlbS1jbXAnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NvLWJyb3dzZXItc3RvcmFnZS1jbXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9JyFub1JlbmRlcic+XG4gICAgICA8aDQ+Y28tYnJvd3Nlci1zdG9yYWdlPC9oND5cbiAgICAgIDxzdG9yYWdlLWxpc3QtY21wXG4gICAgICAgIFtjb0Jyb3dzZXJTdG9yYWdlUmVkdWNlcl09J2NvQnJvd3NlclN0b3JhZ2VSZWR1Y2VyIHwgYXN5bmMnXG4gICAgICAgIChyZW1vdmUpPSdjb1N0b3JlTW9kZWwucmVtb3ZlSXRlbSgkZXZlbnQpJ1xuICAgICAgICAodXBkYXRlKT0nY29TdG9yZU1vZGVsLnVwZGF0ZUl0ZW0oJGV2ZW50KSdcbiAgICAgICAgKHJlc2V0KT0nY29TdG9yZU1vZGVsLnJlc2V0SXRlbSgkZXZlbnQpJz5cbiAgICAgIDwvc3RvcmFnZS1saXN0LWNtcD5cbiAgICAgIDxicj5cbiAgICAgIEFkZCB0ZW1wb3JhcnkgaXRlbTxicj5cbiAgICAgIDxuZXctaXRlbS1jbXAgKGNyZWF0ZSk9J2NvU3RvcmVNb2RlbC5jcmVhdGVJdGVtKCRldmVudCknPjwvbmV3LWl0ZW0tY21wPlxuICAgIDwvZGl2PlxuICBgLFxuICBkaXJlY3RpdmVzOiBbU3RvcmFnZUxpc3RDbXAsIE5ld0l0ZW1DbXBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDb0Jyb3dzZXJTdG9yYWdlQ21wIHtcbiAgQElucHV0KCkgY29Ccm93c2VyU3RvcmFnZUNvbmZpZztcbiAgQElucHV0KCkgbm9SZW5kZXI7XG4gIGNvQnJvd3NlclN0b3JhZ2VSZWR1Y2VyO1xuXG4gIGNvbnN0cnVjdG9yIChcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxhbnk+LFxuICAgIHByaXZhdGUgY29TdG9yZU1vZGVsOkNvQnJvd3NlclN0b3JhZ2VNb2RlbFxuICApIHtcbiAgICB0aGlzLmNvQnJvd3NlclN0b3JhZ2VSZWR1Y2VyID0gdGhpcy5zdG9yZS5zZWxlY3QoJ2NvQnJvd3NlclN0b3JhZ2VSZWR1Y2VyJylcbiAgfVxuXG4gIG5nT25Jbml0ICgpIHtcbiAgICB0aGlzLmNvU3RvcmVNb2RlbC5pbml0aWFsaXplKHRoaXMuY29Ccm93c2VyU3RvcmFnZUNvbmZpZylcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL25vZGVfbW9kdWxlcyJ9
