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
var store_1 = require('@ngrx/store');
var common_1 = require('@angular/common');
require('rxjs/add/operator/debounceTime');
var StorageListItemCmp = (function () {
    function StorageListItemCmp(store) {
        this.store = store;
        this.updateItem = new core_1.EventEmitter();
        this.resetItem = new core_1.EventEmitter();
        this.cbsReducer$ = this.store.select('cbsReducer');
        this.storageItemInput = new common_1.Control();
    }
    StorageListItemCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.storageItemInput.updateValue(this.storageItem.value);
        this.cbsReducer$.map(function (cbs) { return cbs['find'](function (i) { return i.key === _this.storageItem.key; }); })
            .subscribe(function (item) {
            console.log('Received from cbsReducer$: ', item.value);
        });
        this.storageItemInput.valueChanges
            .subscribe(function (val) {
            _this.updateWrap(val);
        });
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
            template: "\n    <div class='row'>\n      <div class='col-lg-3 col-xs-4'>\n        <strong>{{storageItem.key}}</strong><br>\n        <span class='tiny'>{{storageItem.storageType}}</span>\n      </div>\n      <div class='col-lg-6 col-xs-4'>\n        <input [type]='storageItem.valueType' class='form-control'\n          [ngFormControl]='storageItemInput'>\n      </div>\n      <div class='col-lg-3 col-xs-4'>\n        <button class='btn btn-success'\n          (click)='updateWrap(storageItemInput.value)'>\n          Save\n        </button>\n        <button class='btn btn-info'\n          (click)='resetItem.emit(storageItem)'>\n          Reset\n        </button>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], StorageListItemCmp);
    return StorageListItemCmp;
}());
exports.StorageListItemCmp = StorageListItemCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1saXN0LWl0ZW0tY21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RvcmFnZS1saXN0LWl0ZW0tY21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUQsZUFDckQsQ0FBQyxDQURtRTtBQUNwRSxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUNqQyx1QkFBc0IsaUJBQ3RCLENBQUMsQ0FEc0M7QUFDdkMsUUFBTyxnQ0FFUCxDQUFDLENBRnNDO0FBbUN2QztJQVFFLDRCQUFxQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBTjVCLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNoQyxjQUFTLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFakMsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxxQkFBZ0IsR0FBRyxJQUFJLGdCQUFPLEVBQUUsQ0FBQztJQUVDLENBQUM7SUFFMUMscUNBQVEsR0FBUjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRXpELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBOUIsQ0FBOEIsQ0FBQyxFQUFoRCxDQUFnRCxDQUFDO2FBQzFFLFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN4RCxDQUFDLENBQUMsQ0FBQTtRQUVKLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZO2FBQy9CLFNBQVMsQ0FBQyxVQUFDLEdBQUc7WUFDYixLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELHVDQUFVLEdBQVYsVUFBWSxRQUFRO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQTtRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQTFCRDtRQUFDLFlBQUssRUFBRTs7MkRBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7MERBQUE7SUFDVDtRQUFDLGFBQU0sRUFBRTs7eURBQUE7SUFwQ1g7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxNQUFNLEVBQUUsQ0FBQyxtR0FPUixDQUFDO1lBQ0YsUUFBUSxFQUFFLDZxQkFxQlQ7U0FDRixDQUFDOzswQkFBQTtJQTZCRix5QkFBQztBQUFELENBQUMsQUE1QkQsSUE0QkM7QUE1QlksMEJBQWtCLHFCQTRCOUIsQ0FBQSJ9