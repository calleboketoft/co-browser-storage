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
var NewItemCmp = (function () {
    function NewItemCmp() {
        this.create = new core_1.EventEmitter();
    }
    NewItemCmp.prototype.saveItem = function (storageType, valueType, key, value) {
        if (!key) {
            throw 'key please';
        }
        this.create.emit({
            key: key,
            value: value || '',
            storageType: storageType || 'localStorage',
            valueType: valueType || 'text'
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NewItemCmp.prototype, "create", void 0);
    NewItemCmp = __decorate([
        core_1.Component({
            selector: 'new-item-cmp',
            template: "\n    <input type=\"text\" #storageType placeholder=\"Storage Type\">\n    <input type=\"text\" #valueType placeholder=\"Value Type\">\n    <input type=\"text\" #key placeholder=\"Key\">\n    <input type=\"text\" #value placeholder=\"Value\">\n    <button type=\"button\" (click)=\"saveItem(storageType.value, valueType.value, key.value, value.value)\">Add</button>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NewItemCmp);
    return NewItemCmp;
})();
exports.NewItemCmp = NewItemCmp;
//# sourceMappingURL=new-item-cmp.js.map