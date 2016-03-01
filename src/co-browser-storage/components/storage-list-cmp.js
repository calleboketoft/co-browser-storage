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
var storage_list_item_cmp_1 = require('./storage-list-item-cmp');
var StorageListCmp = (function () {
    function StorageListCmp() {
        this.remove = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.reset = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "coBrowserStorageReducer", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "remove", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "reset", void 0);
    StorageListCmp = __decorate([
        core_1.Component({
            selector: 'storage-list-cmp',
            // when the remove event comes from the child, call the removeKvp function
            template: "\n    <div>\n      <storage-list-item-cmp\n        *ngFor='#storageItem of coBrowserStorageReducer'\n        [storageItem]='storageItem'\n        (remove)='remove.emit($event)'\n        (update)='update.emit($event)'\n        (reset)='reset.emit($event)'>\n      </storage-list-item-cmp>\n    </div>\n  ",
            directives: [storage_list_item_cmp_1.StorageListItemCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], StorageListCmp);
    return StorageListCmp;
}());
exports.StorageListCmp = StorageListCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jb21wb25lbnRzL3N0b3JhZ2UtbGlzdC1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFxRCxlQUNyRCxDQUFDLENBRG1FO0FBQ3BFLHNDQUFpQyx5QkFFakMsQ0FBQyxDQUZ5RDtBQWtCMUQ7SUFBQTtRQUVZLFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQTtRQUMzQixXQUFNLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUE7UUFDM0IsVUFBSyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFBO0lBQ3RDLENBQUM7SUFKQztRQUFDLFlBQUssRUFBRTs7bUVBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7a0RBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7a0RBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7aURBQUE7SUFwQlg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QiwwRUFBMEU7WUFDMUUsUUFBUSxFQUFFLGlUQVVUO1lBQ0QsVUFBVSxFQUFFLENBQUMsMENBQWtCLENBQUM7U0FDakMsQ0FBQzs7c0JBQUE7SUFNRixxQkFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTFksc0JBQWMsaUJBSzFCLENBQUEiLCJmaWxlIjoiY28tYnJvd3Nlci1zdG9yYWdlL2NvbXBvbmVudHMvc3RvcmFnZS1saXN0LWNtcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnXG5pbXBvcnQge1N0b3JhZ2VMaXN0SXRlbUNtcH0gZnJvbSAnLi9zdG9yYWdlLWxpc3QtaXRlbS1jbXAnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0b3JhZ2UtbGlzdC1jbXAnLFxuICAvLyB3aGVuIHRoZSByZW1vdmUgZXZlbnQgY29tZXMgZnJvbSB0aGUgY2hpbGQsIGNhbGwgdGhlIHJlbW92ZUt2cCBmdW5jdGlvblxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8c3RvcmFnZS1saXN0LWl0ZW0tY21wXG4gICAgICAgICpuZ0Zvcj0nI3N0b3JhZ2VJdGVtIG9mIGNvQnJvd3NlclN0b3JhZ2VSZWR1Y2VyJ1xuICAgICAgICBbc3RvcmFnZUl0ZW1dPSdzdG9yYWdlSXRlbSdcbiAgICAgICAgKHJlbW92ZSk9J3JlbW92ZS5lbWl0KCRldmVudCknXG4gICAgICAgICh1cGRhdGUpPSd1cGRhdGUuZW1pdCgkZXZlbnQpJ1xuICAgICAgICAocmVzZXQpPSdyZXNldC5lbWl0KCRldmVudCknPlxuICAgICAgPC9zdG9yYWdlLWxpc3QtaXRlbS1jbXA+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGRpcmVjdGl2ZXM6IFtTdG9yYWdlTGlzdEl0ZW1DbXBdXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VMaXN0Q21wIHtcbiAgQElucHV0KCkgY29Ccm93c2VyU3RvcmFnZVJlZHVjZXJcbiAgQE91dHB1dCgpIHJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICBAT3V0cHV0KCkgdXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gIEBPdXRwdXQoKSByZXNldCA9IG5ldyBFdmVudEVtaXR0ZXIoKVxufVxuIl0sInNvdXJjZVJvb3QiOiIvbm9kZV9tb2R1bGVzIn0=
