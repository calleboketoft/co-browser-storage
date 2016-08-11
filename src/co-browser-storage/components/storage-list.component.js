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
var StorageListComponent = (function () {
    function StorageListComponent() {
        this.updateItem = new core_1.EventEmitter();
        this.resetItem = new core_1.EventEmitter();
        this.initialized = false;
        this.cbsItems = [];
    }
    StorageListComponent.prototype.ngOnChanges = function (changes) {
        // Only render the list once. The list itself is not going to change.
        if (!this.initialized && changes.cbsReducer) {
            this.initialized = true;
            this.cbsItems = changes.cbsReducer.currentValue;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListComponent.prototype, "cbsReducer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], StorageListComponent.prototype, "itemsToShow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListComponent.prototype, "updateItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListComponent.prototype, "resetItem", void 0);
    StorageListComponent = __decorate([
        core_1.Component({
            selector: 'storage-list-cmp',
            template: "\n    <div>\n      <storage-list-item-cmp\n        *ngFor=\"let storageItem of cbsItems | arraySort:'key'\"\n        [itemsToShow]=\"itemsToShow\"\n        [storageItem]=\"storageItem\"\n        (updateItem)=\"updateItem.emit($event)\"\n        (resetItem)=\"resetItem.emit($event)\">\n      </storage-list-item-cmp>\n      <br>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], StorageListComponent);
    return StorageListComponent;
}());
exports.StorageListComponent = StorageListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JhZ2UtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF1RCxlQUV2RCxDQUFDLENBRnFFO0FBaUJ0RTtJQUFBO1FBR1ksZUFBVSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUVqQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNyQixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBU3ZCLENBQUM7SUFQQywwQ0FBVyxHQUFYLFVBQWEsT0FBTztRQUNsQixxRUFBcUU7UUFDckUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUE7UUFDakQsQ0FBQztJQUNILENBQUM7SUFkRDtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NkRBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7NERBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7MkRBQUE7SUFuQlg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixRQUFRLEVBQUUsMFZBV1Q7U0FDRixDQUFDOzs0QkFBQTtJQWlCRiwyQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFoQlksNEJBQW9CLHVCQWdCaEMsQ0FBQSJ9