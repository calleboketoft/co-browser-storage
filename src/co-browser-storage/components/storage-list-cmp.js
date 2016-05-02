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
var array_sort_pipe_1 = require('../services/array-sort-pipe');
var StorageListCmp = (function () {
    function StorageListCmp() {
        this.updateItem = new core_1.EventEmitter();
        this.resetItem = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "cbsReducer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "autosave", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "updateItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "resetItem", void 0);
    StorageListCmp = __decorate([
        core_1.Component({
            selector: 'storage-list-cmp',
            pipes: [array_sort_pipe_1.ArraySortPipe],
            template: "\n    <div>\n      <storage-list-item-cmp\n        *ngFor='let storageItem of cbsReducer | arraySort:\"key\"'\n        [storageItem]='storageItem'\n        [autosave]='autosave'\n        (updateItem)='updateItem.emit($event)'\n        (resetItem)='resetItem.emit($event)'>\n      </storage-list-item-cmp>\n      <br>\n    </div>\n  ",
            directives: [storage_list_item_cmp_1.StorageListItemCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], StorageListCmp);
    return StorageListCmp;
}());
exports.StorageListCmp = StorageListCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1saXN0LWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JhZ2UtbGlzdC1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFxRCxlQUNyRCxDQUFDLENBRG1FO0FBQ3BFLHNDQUFpQyx5QkFDakMsQ0FBQyxDQUR5RDtBQUMxRCxnQ0FBNEIsNkJBRTVCLENBQUMsQ0FGd0Q7QUFtQnpEO0lBQUE7UUFHWSxlQUFVLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDaEMsY0FBUyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFKQztRQUFDLFlBQUssRUFBRTs7c0RBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7b0RBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7c0RBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7cURBQUE7SUFyQlg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixLQUFLLEVBQUUsQ0FBQywrQkFBYSxDQUFDO1lBQ3RCLFFBQVEsRUFBRSw4VUFXVDtZQUNELFVBQVUsRUFBRSxDQUFDLDBDQUFrQixDQUFDO1NBQ2pDLENBQUM7O3NCQUFBO0lBTUYscUJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLHNCQUFjLGlCQUsxQixDQUFBIn0=