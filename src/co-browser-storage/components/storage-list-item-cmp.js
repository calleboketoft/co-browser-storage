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
        this.removeItem = new core_1.EventEmitter();
        this.updateItem = new core_1.EventEmitter();
        this.resetItem = new core_1.EventEmitter();
        this.storageItemValue = new common_1.Control();
    }
    StorageListItemCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.storageItemValue.updateValue(this.storageItem.value);
        if (this.autosave) {
            this.storageItemValue.valueChanges
                .debounceTime(500)
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
    ], StorageListItemCmp.prototype, "removeItem", void 0);
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
            template: "\n    <div class='row'>\n      <div class='col-lg-3 col-xs-4'>\n        <strong>{{storageItem.key}}</strong><br>\n        <span class='tiny'>{{storageItem.storageType}}</span>\n      </div>\n      <div class='col-lg-6 col-xs-4'>\n        <input [type]='storageItem.valueType' class='form-control'\n          [ngFormControl]='storageItemValue' #newValue>\n      </div>\n      <div class='col-lg-3 col-xs-4'>\n        <button class='btn btn-success'\n          *ngIf='!autosave'\n          (click)='updateWrap(newValue.value)'>\n          Save\n        </button>\n        <button class='btn btn-info'\n          *ngIf='storageItem.inConfigFile'\n          (click)='resetItem.emit(storageItem)'>\n          Reset\n        </button>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], StorageListItemCmp);
    return StorageListItemCmp;
}());
exports.StorageListItemCmp = StorageListItemCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1saXN0LWl0ZW0tY21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RvcmFnZS1saXN0LWl0ZW0tY21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUQsZUFDckQsQ0FBQyxDQURtRTtBQUNwRSx1QkFBc0IsaUJBQ3RCLENBQUMsQ0FEc0M7QUFDdkMsUUFBTyxnQ0FFUCxDQUFDLENBRnNDO0FBcUN2QztJQUFBO1FBR1ksZUFBVSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNoQyxjQUFTLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFekMscUJBQWdCLEdBQUcsSUFBSSxnQkFBTyxFQUFFLENBQUM7SUFrQm5DLENBQUM7SUFoQkMscUNBQVEsR0FBUjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRXpELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZO2lCQUMvQixZQUFZLENBQUMsR0FBRyxDQUFDO2lCQUNqQixTQUFTLENBQUMsVUFBQyxHQUFHO2dCQUNiLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO0lBQ0gsQ0FBQztJQUVELHVDQUFVLEdBQVYsVUFBWSxRQUFRO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQTtRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQXZCRDtRQUFDLFlBQUssRUFBRTs7MkRBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7d0RBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7MERBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7MERBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7eURBQUE7SUF4Q1g7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxNQUFNLEVBQUUsQ0FBQyxtR0FPUixDQUFDO1lBQ0YsUUFBUSxFQUFFLHd2QkF1QlQ7U0FDRixDQUFDOzswQkFBQTtJQTBCRix5QkFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF6QlksMEJBQWtCLHFCQXlCOUIsQ0FBQSJ9