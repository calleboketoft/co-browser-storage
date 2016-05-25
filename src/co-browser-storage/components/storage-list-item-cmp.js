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
var common_1 = require('@angular/common');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1saXN0LWl0ZW0tY21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RvcmFnZS1saXN0LWl0ZW0tY21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUQsZUFDckQsQ0FBQyxDQURtRTtBQUNwRSx1QkFBc0IsaUJBRXRCLENBQUMsQ0FGc0M7QUFvQ3ZDO0lBQUE7UUFHWSxlQUFVLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDaEMsY0FBUyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXpDLHFCQUFnQixHQUFHLElBQUksZ0JBQU8sRUFBRSxDQUFDO0lBa0JuQyxDQUFDO0lBaEJDLHFDQUFRLEdBQVI7UUFBQSxpQkFVQztRQVRDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUV6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWTtpQkFDL0IsWUFBWSxDQUFDLEdBQUcsQ0FBQztpQkFDakIsU0FBUyxDQUFDLFVBQUMsR0FBRztnQkFDYixLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztJQUNILENBQUM7SUFFRCx1Q0FBVSxHQUFWLFVBQVksUUFBUTtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUE7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUF0QkQ7UUFBQyxZQUFLLEVBQUU7OzJEQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7O3dEQUFBO0lBQ1I7UUFBQyxhQUFNLEVBQUU7OzBEQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7O3lEQUFBO0lBdENYO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsTUFBTSxFQUFFLENBQUMsbUdBT1IsQ0FBQztZQUNGLFFBQVEsRUFBRSwwc0JBc0JUO1NBQ0YsQ0FBQzs7MEJBQUE7SUF5QkYseUJBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBeEJZLDBCQUFrQixxQkF3QjlCLENBQUEifQ==