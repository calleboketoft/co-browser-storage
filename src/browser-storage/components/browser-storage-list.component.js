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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BrowserStorageListComponent = (function () {
    function BrowserStorageListComponent() {
        this.updateItem = new core_1.EventEmitter();
        this.resetItem = new core_1.EventEmitter();
        this.initialized = false;
        this.browserStorageItems = [];
    }
    BrowserStorageListComponent.prototype.ngOnChanges = function (changes) {
        // Only render the list once. The list itself is not going to change.
        if (!this.initialized && changes.browserStorageReducer) {
            this.initialized = true;
            this.browserStorageItems = changes.browserStorageReducer.currentValue;
        }
    };
    return BrowserStorageListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BrowserStorageListComponent.prototype, "browserStorageReducer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BrowserStorageListComponent.prototype, "itemsToShow", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BrowserStorageListComponent.prototype, "updateItem", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BrowserStorageListComponent.prototype, "resetItem", void 0);
BrowserStorageListComponent = __decorate([
    core_1.Component({
        selector: 'browser-storage-list',
        template: "\n    <div>\n      <browser-storage-list-item\n        *ngFor=\"let storageItem of browserStorageItems | arraySort:'key'\"\n        [itemsToShow]=\"itemsToShow\"\n        [storageItem]=\"storageItem\"\n        (updateItem)=\"updateItem.emit($event)\"\n        (resetItem)=\"resetItem.emit($event)\">\n      </browser-storage-list-item>\n      <br>\n    </div>\n  "
    })
], BrowserStorageListComponent);
exports.BrowserStorageListComponent = BrowserStorageListComponent;
//# sourceMappingURL=browser-storage-list.component.js.map