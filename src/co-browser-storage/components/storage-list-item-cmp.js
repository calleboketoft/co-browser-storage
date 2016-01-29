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
        this.removeMe = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.resetKvp = new core_1.EventEmitter();
    }
    StorageListItemCmp.prototype.updateKvp = function (kvp, newValue) {
        kvp.value = newValue.value;
        this.update.emit(kvp);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "kvp", void 0);
    __decorate([
        core_1.Output('remove'), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "removeMe", void 0);
    __decorate([
        core_1.Output('update'), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "update", void 0);
    __decorate([
        core_1.Output('reset'), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "resetKvp", void 0);
    StorageListItemCmp = __decorate([
        core_1.Component({
            selector: 'storage-list-item-cmp',
            template: "\n    <div>\n      <input type=\"text\" disabled [value]=\"kvp.storageType\">\n      <input type=\"text\" disabled [value]=\"kvp.valueType\">\n      <input type=\"text\" disabled [value]=\"kvp.key\">\n      <input [type]=\"kvp.valueType\" #newValue [value]=\"kvp.value\">\n      <button (click)=\"removeMe.emit(kvp)\">Remove</button>\n      <button (click)=\"updateKvp(kvp, newValue)\">Save</button>\n      <button *ngIf=\"kvp.inConfigFile\" (click)=\"resetKvp.emit(kvp)\">Reset</button>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], StorageListItemCmp);
    return StorageListItemCmp;
})();
exports.StorageListItemCmp = StorageListItemCmp;

//# sourceMappingURL=storage-list-item-cmp.js.map
