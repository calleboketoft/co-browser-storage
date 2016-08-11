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
        this.storageItemInput.updateValue(this.storageItem.value);
        this.browserStorageReducer$.map(function (cbs) { return cbs.find(function (i) { return i.key === _this.storageItem.key; }); })
            .subscribe(function (item) {
            var currentValue = _this.storageItemInput.value;
            var incomingValue = item.value;
            // This happens if the value is changed from outside of this component
            if (currentValue !== incomingValue) {
                _this.storageItemInput.updateValue(incomingValue);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1zdG9yYWdlLWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJicm93c2VyLXN0b3JhZ2UtbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXVELGVBQ3ZELENBQUMsQ0FEcUU7QUFDdEUsc0JBQXFCLGFBQ3JCLENBQUMsQ0FEaUM7QUFDbEMsc0JBQTRCLGdCQUU1QixDQUFDLENBRjJDO0FBK0I1QztJQVNFLHlDQUFxQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBTjVCLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNoQyxjQUFTLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFakMsMkJBQXNCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNyRSxxQkFBZ0IsR0FBRyxJQUFJLG1CQUFXLEVBQUUsQ0FBQztJQUVILENBQUM7SUFFMUMsa0RBQVEsR0FBUjtRQUFBLGlCQWlCQztRQWhCQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFekQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQU8sSUFBSyxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxLQUFLLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUE5QixDQUE4QixDQUFDLEVBQTdDLENBQTZDLENBQUM7YUFDeEYsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUNkLElBQUksWUFBWSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUE7WUFDOUMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtZQUM5QixzRUFBc0U7WUFDdEUsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDbEQsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO1FBRUosSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVk7YUFDL0IsU0FBUyxDQUFDLFVBQUMsR0FBRztZQUNiLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sb0RBQVUsR0FBakIsVUFBbUIsV0FBVztRQUM1QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckIsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUM3RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQTtJQUNqQixDQUFDO0lBRUQsb0RBQVUsR0FBVixVQUFZLFFBQVE7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBeENEO1FBQUMsWUFBSyxFQUFFOzt3RUFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzt3RUFBQTtJQUNSO1FBQUMsYUFBTSxFQUFFOzt1RUFBQTtJQUNUO1FBQUMsYUFBTSxFQUFFOztzRUFBQTtJQWpDWDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLE1BQU0sRUFBRSxDQUFDLG1HQU9SLENBQUM7WUFDRixRQUFRLEVBQUUsMG1CQWlCVDtTQUNGLENBQUM7O3VDQUFBO0lBMkNGLHNDQUFDO0FBQUQsQ0FBQyxBQTFDRCxJQTBDQztBQTFDWSx1Q0FBK0Isa0NBMEMzQyxDQUFBIn0=