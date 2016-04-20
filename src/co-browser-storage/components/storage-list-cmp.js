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
    ], StorageListCmp.prototype, "cbsReducer", void 0);
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
            template: "\n    <div>\n      <storage-list-item-cmp\n        *ngFor='#storageItem of cbsReducer'\n        [storageItem]='storageItem'\n        (remove)='remove.emit($event)'\n        (update)='update.emit($event)'\n        (reset)='reset.emit($event)'>\n      </storage-list-item-cmp>\n    </div>\n  ",
            directives: [storage_list_item_cmp_1.StorageListItemCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], StorageListCmp);
    return StorageListCmp;
}());
exports.StorageListCmp = StorageListCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1saXN0LWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JhZ2UtbGlzdC1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFxRCxlQUNyRCxDQUFDLENBRG1FO0FBQ3BFLHNDQUFpQyx5QkFFakMsQ0FBQyxDQUZ5RDtBQWtCMUQ7SUFBQTtRQUVZLFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUM1QixXQUFNLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDNUIsVUFBSyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFKQztRQUFDLFlBQUssRUFBRTs7c0RBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7a0RBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7a0RBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7aURBQUE7SUFwQlg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QiwwRUFBMEU7WUFDMUUsUUFBUSxFQUFFLG9TQVVUO1lBQ0QsVUFBVSxFQUFFLENBQUMsMENBQWtCLENBQUM7U0FDakMsQ0FBQzs7c0JBQUE7SUFNRixxQkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksc0JBQWMsaUJBSzFCLENBQUEifQ==