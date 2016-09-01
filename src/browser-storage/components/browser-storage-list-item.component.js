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
var forms_1 = require('@angular/forms');
var BrowserStorageListItemComponent = (function () {
    function BrowserStorageListItemComponent(store) {
        this.store = store;
        this.updateItem = new core_1.EventEmitter();
        this.resetItem = new core_1.EventEmitter();
        this.browserStorageReducer$ = this.store.select('browserStorageReducer');
        this.storageItemInput = new forms_1.FormControl();
    }
    BrowserStorageListItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.storageItemInput.setValue(this.storageItem.value);
        this.browserStorageReducer$.map(function (cbs) { return cbs.find(function (i) { return i.key === _this.storageItem.key; }); })
            .subscribe(function (item) {
            var currentValue = _this.storageItemInput.value;
            var incomingValue = item.value;
            // This happens if the value is changed from outside of this component
            if (currentValue !== incomingValue) {
                _this.storageItemInput.setValue(incomingValue);
            }
        });
        this.storageItemInput.valueChanges
            .subscribe(function (val) {
            _this.updateWrap(val);
        });
    };
    BrowserStorageListItemComponent.prototype.itemToHide = function (storageItem) {
        var hideItem = false;
        if (this.itemsToShow) {
            hideItem = this.itemsToShow.indexOf(storageItem.key) === -1;
        }
        return hideItem;
    };
    BrowserStorageListItemComponent.prototype.updateWrap = function (newValue) {
        this.storageItem.value = newValue;
        this.updateItem.emit(this.storageItem);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BrowserStorageListItemComponent.prototype, "storageItem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BrowserStorageListItemComponent.prototype, "itemsToShow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BrowserStorageListItemComponent.prototype, "updateItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BrowserStorageListItemComponent.prototype, "resetItem", void 0);
    BrowserStorageListItemComponent = __decorate([
        core_1.Component({
            selector: 'browser-storage-list-item',
            styles: ["\n    .row {\n      margin-bottom: 10px;\n    }\n    .tiny {\n      font-size: 0.8rem;\n    }\n  "],
            template: "\n    <div class=\"row\" [hidden]=\"itemToHide(storageItem)\">\n      <div class=\"col-lg-3 col-xs-4\">\n        <strong>{{storageItem.key}}</strong><br>\n        <span class=\"tiny\">{{storageItem.storageType}}</span>\n      </div>\n      <div class=\"col-lg-6 col-xs-4\">\n        <input [type]=\"storageItem.valueType\" class=\"form-control\"\n          [formControl]=\"storageItemInput\">\n      </div>\n      <div class=\"col-lg-3 col-xs-4\">\n        <button class=\"btn btn-outline-warning\"\n          (click)=\"resetItem.emit(storageItem)\">\n          Reset\n        </button>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], BrowserStorageListItemComponent);
    return BrowserStorageListItemComponent;
}());
exports.BrowserStorageListItemComponent = BrowserStorageListItemComponent;
//# sourceMappingURL=browser-storage-list-item.component.js.map