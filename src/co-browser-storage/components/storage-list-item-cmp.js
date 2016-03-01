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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jb21wb25lbnRzL3N0b3JhZ2UtbGlzdC1pdGVtLWNtcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXFELGVBRXJELENBQUMsQ0FGbUU7QUFrQnBFO0lBQUE7UUFFWSxXQUFNLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDNUIsV0FBTSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzVCLFVBQUssR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQU12QyxDQUFDO0lBSkMsdUNBQVUsR0FBVixVQUFZLFdBQVcsRUFBRSxRQUFRO1FBQy9CLFdBQVcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQTtRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBUkQ7UUFBQyxZQUFLLEVBQUU7OzJEQUFBO0lBQ1I7UUFBQyxhQUFNLEVBQUU7O3NEQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7O3NEQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7O3FEQUFBO0lBcEJYO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsUUFBUSxFQUFFLHVqQkFZVDtTQUNGLENBQUM7OzBCQUFBO0lBV0YseUJBQUM7QUFBRCxDQVZBLEFBVUMsSUFBQTtBQVZZLDBCQUFrQixxQkFVOUIsQ0FBQSIsImZpbGUiOiJjby1icm93c2VyLXN0b3JhZ2UvY29tcG9uZW50cy9zdG9yYWdlLWxpc3QtaXRlbS1jbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdG9yYWdlLWxpc3QtaXRlbS1jbXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgZGlzYWJsZWQgW3ZhbHVlXT0nc3RvcmFnZUl0ZW0uc3RvcmFnZVR5cGUnPlxuICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGRpc2FibGVkIFt2YWx1ZV09J3N0b3JhZ2VJdGVtLnZhbHVlVHlwZSc+XG4gICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgZGlzYWJsZWQgW3ZhbHVlXT0nc3RvcmFnZUl0ZW0ua2V5Jz5cbiAgICAgIDxpbnB1dCBbdHlwZV09J3N0b3JhZ2VJdGVtLnZhbHVlVHlwZScgI25ld1ZhbHVlIFt2YWx1ZV09J3N0b3JhZ2VJdGVtLnZhbHVlJz5cbiAgICAgIDxidXR0b24gKGNsaWNrKT0ncmVtb3ZlLmVtaXQoc3RvcmFnZUl0ZW0pJz5SZW1vdmU8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gKGNsaWNrKT0ndXBkYXRlV3JhcChzdG9yYWdlSXRlbSwgbmV3VmFsdWUpJz5TYXZlPC9idXR0b24+XG4gICAgICA8YnV0dG9uICpuZ0lmPSdzdG9yYWdlSXRlbS5pbkNvbmZpZ0ZpbGUnIChjbGljayk9J3Jlc2V0LmVtaXQoc3RvcmFnZUl0ZW0pJz5cbiAgICAgICAgUmVzZXRcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VMaXN0SXRlbUNtcCB7XG4gIEBJbnB1dCgpIHN0b3JhZ2VJdGVtO1xuICBAT3V0cHV0KCkgcmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgdXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVzZXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdXBkYXRlV3JhcCAoc3RvcmFnZUl0ZW0sIG5ld1ZhbHVlKSB7XG4gICAgc3RvcmFnZUl0ZW0udmFsdWUgPSBuZXdWYWx1ZS52YWx1ZVxuICAgIHRoaXMudXBkYXRlLmVtaXQoc3RvcmFnZUl0ZW0pXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL25vZGVfbW9kdWxlcyJ9
