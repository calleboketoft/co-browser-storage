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
var core_1 = require('@angular/core');
var storage_list_item_cmp_1 = require('./storage-list-item-cmp');
var array_sort_pipe_1 = require('../services/array-sort-pipe');
var StorageListCmp = (function () {
    function StorageListCmp() {
        this.updateItem = new core_1.EventEmitter();
        this.resetItem = new core_1.EventEmitter();
        this.initialized = false;
        this.cbsItems = [];
    }
    StorageListCmp.prototype.ngOnChanges = function (changes) {
        // Only render the list once. The list itself is not going to change.
        if (!this.initialized && changes.cbsReducer) {
            this.initialized = true;
            this.cbsItems = changes.cbsReducer.currentValue;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "cbsReducer", void 0);
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
            template: "\n    <div>\n      <storage-list-item-cmp\n        *ngFor='let storageItem of cbsItems | arraySort:\"key\"'\n        [storageItem]='storageItem'\n        (updateItem)='updateItem.emit($event)'\n        (resetItem)='resetItem.emit($event)'>\n      </storage-list-item-cmp>\n      <br>\n    </div>\n  ",
            directives: [storage_list_item_cmp_1.StorageListItemCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], StorageListCmp);
    return StorageListCmp;
}());
exports.StorageListCmp = StorageListCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1saXN0LWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JhZ2UtbGlzdC1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFxRCxlQUNyRCxDQUFDLENBRG1FO0FBQ3BFLHNDQUFpQyx5QkFDakMsQ0FBQyxDQUR5RDtBQUMxRCxnQ0FBNEIsNkJBRTVCLENBQUMsQ0FGd0Q7QUFrQnpEO0lBQUE7UUFFWSxlQUFVLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDaEMsY0FBUyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRWpDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFTdkIsQ0FBQztJQVBDLG9DQUFXLEdBQVgsVUFBYSxPQUFPO1FBQ2xCLHFFQUFxRTtRQUNyRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQTtRQUNqRCxDQUFDO0lBQ0gsQ0FBQztJQWJEO1FBQUMsWUFBSyxFQUFFOztzREFBQTtJQUNSO1FBQUMsYUFBTSxFQUFFOztzREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztxREFBQTtJQW5CWDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLEtBQUssRUFBRSxDQUFDLCtCQUFhLENBQUM7WUFDdEIsUUFBUSxFQUFFLDZTQVVUO1lBQ0QsVUFBVSxFQUFFLENBQUMsMENBQWtCLENBQUM7U0FDakMsQ0FBQzs7c0JBQUE7SUFnQkYscUJBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQWZZLHNCQUFjLGlCQWUxQixDQUFBIn0=