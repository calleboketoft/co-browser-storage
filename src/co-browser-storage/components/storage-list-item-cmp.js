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
var common_1 = require('angular2/common');
require('rxjs/add/operator/debounceTime');
var StorageListItemCmp = (function () {
    function StorageListItemCmp() {
        this.updateItem = new core_1.EventEmitter();
        this.resetItem = new core_1.EventEmitter();
        this.storageItemInput = new common_1.Control();
    }
    StorageListItemCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.storageItemInput.updateValue(this.storageItem.value);
        if (this.autosave) {
            this.storageItemInput.valueChanges
                .debounceTime(300)
                .subscribe(function (val) {
                _this.updateWrap(val);
            });
        }
    };
    StorageListItemCmp.prototype.updateWrap = function (newValue) {
        this.storageItem.value = newValue;
        this.updateItem.emit(this.storageItem);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "storageItem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "autosave", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "updateItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "resetItem", void 0);
    StorageListItemCmp = __decorate([
        core_1.Component({
            selector: 'storage-list-item-cmp',
            styles: ["\n    .row {\n      margin-bottom: 10px;\n    }\n    .tiny {\n      font-size: 0.8rem;\n    }\n  "],
            template: "\n    <div class='row'>\n      <div class='col-lg-3 col-xs-4'>\n        <strong>{{storageItem.key}}</strong><br>\n        <span class='tiny'>{{storageItem.storageType}}</span>\n      </div>\n      <div class='col-lg-6 col-xs-4'>\n        <input [type]='storageItem.valueType' class='form-control'\n          [ngFormControl]='storageItemInput'>\n      </div>\n      <div class='col-lg-3 col-xs-4'>\n        <button class='btn btn-success'\n          *ngIf='!autosave'\n          (click)='updateWrap(storageItemInput.value)'>\n          Save\n        </button>\n        <button class='btn btn-info'\n          (click)='resetItem.emit(storageItem)'>\n          Reset\n        </button>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], StorageListItemCmp);
    return StorageListItemCmp;
}());
exports.StorageListItemCmp = StorageListItemCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1saXN0LWl0ZW0tY21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RvcmFnZS1saXN0LWl0ZW0tY21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUQsZUFDckQsQ0FBQyxDQURtRTtBQUNwRSx1QkFBc0IsaUJBQ3RCLENBQUMsQ0FEc0M7QUFDdkMsUUFBTyxnQ0FFUCxDQUFDLENBRnNDO0FBb0N2QztJQUFBO1FBR1ksZUFBVSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUV6QyxxQkFBZ0IsR0FBRyxJQUFJLGdCQUFPLEVBQUUsQ0FBQztJQWtCbkMsQ0FBQztJQWhCQyxxQ0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFUQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFekQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVk7aUJBQy9CLFlBQVksQ0FBQyxHQUFHLENBQUM7aUJBQ2pCLFNBQVMsQ0FBQyxVQUFDLEdBQUc7Z0JBQ2IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN0QixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7SUFDSCxDQUFDO0lBRUQsdUNBQVUsR0FBVixVQUFZLFFBQVE7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBdEJEO1FBQUMsWUFBSyxFQUFFOzsyREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzt3REFBQTtJQUNSO1FBQUMsYUFBTSxFQUFFOzswREFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOzt5REFBQTtJQXRDWDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLE1BQU0sRUFBRSxDQUFDLG1HQU9SLENBQUM7WUFDRixRQUFRLEVBQUUsMHNCQXNCVDtTQUNGLENBQUM7OzBCQUFBO0lBeUJGLHlCQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQXhCWSwwQkFBa0IscUJBd0I5QixDQUFBIn0=