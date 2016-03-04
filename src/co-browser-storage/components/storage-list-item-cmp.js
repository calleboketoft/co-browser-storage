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
var StorageListItemCmp = (function () {
    function StorageListItemCmp() {
        this.remove = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.reset = new core_1.EventEmitter();
    }
    StorageListItemCmp.prototype.updateWrap = function (storageItem, newValue) {
        storageItem.value = newValue.value;
        this.update.emit(storageItem);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "storageItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "remove", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "reset", void 0);
    StorageListItemCmp = __decorate([
        core_1.Component({
            selector: 'storage-list-item-cmp',
            template: "\n    <div>\n      <input type='text' disabled [value]='storageItem.storageType'>\n      <input type='text' disabled [value]='storageItem.valueType'>\n      <input type='text' disabled [value]='storageItem.key'>\n      <input [type]='storageItem.valueType' #newValue [value]='storageItem.value'>\n      <button (click)='remove.emit(storageItem)'>Remove</button>\n      <button (click)='updateWrap(storageItem, newValue)'>Save</button>\n      <button *ngIf='storageItem.inConfigFile' (click)='reset.emit(storageItem)'>\n        Reset\n      </button>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], StorageListItemCmp);
    return StorageListItemCmp;
}());
exports.StorageListItemCmp = StorageListItemCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1saXN0LWl0ZW0tY21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RvcmFnZS1saXN0LWl0ZW0tY21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUQsZUFFckQsQ0FBQyxDQUZtRTtBQWtCcEU7SUFBQTtRQUVZLFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUM1QixXQUFNLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDNUIsVUFBSyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBTXZDLENBQUM7SUFKQyx1Q0FBVSxHQUFWLFVBQVksV0FBVyxFQUFFLFFBQVE7UUFDL0IsV0FBVyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFSRDtRQUFDLFlBQUssRUFBRTs7MkRBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7c0RBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7c0RBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7cURBQUE7SUFwQlg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxRQUFRLEVBQUUsdWpCQVlUO1NBQ0YsQ0FBQzs7MEJBQUE7SUFXRix5QkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksMEJBQWtCLHFCQVU5QixDQUFBIn0=