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
var storage_list_item_cmp_1 = require('./storage-list-item-cmp');
var StorageListCmp = (function () {
    function StorageListCmp() {
        this.removeMyItem = new core_1.EventEmitter();
        this.updateKvp = new core_1.EventEmitter();
        this.resetKvp = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "kvps", void 0);
    __decorate([
        core_1.Output('remove'), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "removeMyItem", void 0);
    __decorate([
        core_1.Output('update'), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "updateKvp", void 0);
    __decorate([
        core_1.Output('reset'), 
        __metadata('design:type', Object)
    ], StorageListCmp.prototype, "resetKvp", void 0);
    StorageListCmp = __decorate([
        core_1.Component({
            selector: 'storage-list-cmp',
            // when the remove event comes from the child, call the removeKvp function
            template: "\n    <div>\n      <storage-list-item-cmp\n        *ngFor=\"#kvp of kvps\"\n        [kvp]=\"kvp\"\n        (remove)=\"removeMyItem.emit($event)\"\n        (update)=\"updateKvp.emit($event)\"\n        (reset)=\"resetKvp.emit($event)\"\n      ></storage-list-item-cmp>\n    </div>\n  ",
            directives: [storage_list_item_cmp_1.StorageListItemCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], StorageListCmp);
    return StorageListCmp;
})();
exports.StorageListCmp = StorageListCmp;
//# sourceMappingURL=storage-list-cmp.js.map