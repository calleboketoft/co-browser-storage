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
var StorageListItemComponent = (function () {
    function StorageListItemComponent(store) {
        this.store = store;
        this.updateItem = new core_1.EventEmitter();
        this.resetItem = new core_1.EventEmitter();
        this.cbsReducer$ = this.store.select('cbsReducer');
        this.storageItemInput = new forms_1.FormControl();
    }
    StorageListItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.storageItemInput.updateValue(this.storageItem.value);
        this.cbsReducer$.map(function (cbs) { return cbs['find'](function (i) { return i.key === _this.storageItem.key; }); })
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
    StorageListItemComponent.prototype.itemToHide = function (storageItem) {
        var hideItem = false;
        if (this.itemsToShow) {
            hideItem = this.itemsToShow.indexOf(storageItem.key) === -1;
        }
        return hideItem;
    };
    StorageListItemComponent.prototype.updateWrap = function (newValue) {
        this.storageItem.value = newValue;
        this.updateItem.emit(this.storageItem);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListItemComponent.prototype, "storageItem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], StorageListItemComponent.prototype, "itemsToShow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListItemComponent.prototype, "updateItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListItemComponent.prototype, "resetItem", void 0);
    StorageListItemComponent = __decorate([
        core_1.Component({
            selector: 'storage-list-item-cmp',
            styles: ["\n    .row {\n      margin-bottom: 10px;\n    }\n    .tiny {\n      font-size: 0.8rem;\n    }\n  "],
            template: "\n    <div class=\"row\" [hidden]=\"itemToHide(storageItem)\">\n      <div class=\"col-lg-3 col-xs-4\">\n        <strong>{{storageItem.key}}</strong><br>\n        <span class=\"tiny\">{{storageItem.storageType}}</span>\n      </div>\n      <div class=\"col-lg-6 col-xs-4\">\n        <input [type]=\"storageItem.valueType\" class=\"form-control\"\n          [formControl]=\"storageItemInput\">\n      </div>\n      <div class=\"col-lg-3 col-xs-4\">\n        <button class=\"btn btn-outline-warning\"\n          (click)=\"resetItem.emit(storageItem)\">\n          Reset\n        </button>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], StorageListItemComponent);
    return StorageListItemComponent;
}());
exports.StorageListItemComponent = StorageListItemComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1saXN0LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RvcmFnZS1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBdUQsZUFDdkQsQ0FBQyxDQURxRTtBQUN0RSxzQkFBcUIsYUFDckIsQ0FBQyxDQURpQztBQUNsQyxzQkFBNEIsZ0JBRTVCLENBQUMsQ0FGMkM7QUErQjVDO0lBU0Usa0NBQXFCLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFONUIsZUFBVSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUVqQyxnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9DLHFCQUFnQixHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDO0lBRUgsQ0FBQztJQUUxQywyQ0FBUSxHQUFSO1FBQUEsaUJBaUJDO1FBaEJDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUV6RCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxHQUFHLEtBQUssS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQTlCLENBQThCLENBQUMsRUFBaEQsQ0FBZ0QsQ0FBQzthQUMxRSxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ2QsSUFBSSxZQUFZLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQTtZQUM5QyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1lBQzlCLHNFQUFzRTtZQUN0RSxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUNsRCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFSixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWTthQUMvQixTQUFTLENBQUMsVUFBQyxHQUFHO1lBQ2IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSw2Q0FBVSxHQUFqQixVQUFtQixXQUFXO1FBQzVCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQTtRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyQixRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBQzdELENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFBO0lBQ2pCLENBQUM7SUFFRCw2Q0FBVSxHQUFWLFVBQVksUUFBUTtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUE7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUF4Q0Q7UUFBQyxZQUFLLEVBQUU7O2lFQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7O2lFQUFBO0lBQ1I7UUFBQyxhQUFNLEVBQUU7O2dFQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7OytEQUFBO0lBakNYO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsTUFBTSxFQUFFLENBQUMsbUdBT1IsQ0FBQztZQUNGLFFBQVEsRUFBRSwwbUJBaUJUO1NBQ0YsQ0FBQzs7Z0NBQUE7SUEyQ0YsK0JBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDO0FBMUNZLGdDQUF3QiwyQkEwQ3BDLENBQUEifQ==