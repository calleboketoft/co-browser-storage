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
var NewItemCmp = (function () {
    function NewItemCmp() {
        this.create = new core_1.EventEmitter();
    }
    NewItemCmp.prototype.saveItem = function (storageType, valueType, key, value) {
        if (!key) {
            throw 'key please';
        }
        this.create.emit({ key: key, value: value, storageType: storageType, valueType: valueType });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NewItemCmp.prototype, "create", void 0);
    NewItemCmp = __decorate([
        core_1.Component({
            selector: 'new-item-cmp',
            template: "\n    <input type='text' #storageType placeholder='Storage Type'>\n    <input type='text' #valueType placeholder='Value Type'>\n    <input type='text' #key placeholder='Key'>\n    <input type='text' #value placeholder='Value'>\n    <button type='button'\n      (click)='saveItem(storageType.value, valueType.value, key.value, value.value)'>\n      Add\n    </button>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NewItemCmp);
    return NewItemCmp;
}());
exports.NewItemCmp = NewItemCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LWl0ZW0tY21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LWl0ZW0tY21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBOEMsZUFFOUMsQ0FBQyxDQUY0RDtBQWU3RDtJQUFBO1FBQ1ksV0FBTSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFBO0lBUXZDLENBQUM7SUFOQyw2QkFBUSxHQUFSLFVBQVUsV0FBVyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSztRQUMxQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVCxNQUFNLFlBQVksQ0FBQTtRQUNwQixDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFBLEdBQUcsRUFBRSxPQUFBLEtBQUssRUFBRSxhQUFBLFdBQVcsRUFBRSxXQUFBLFNBQVMsRUFBQyxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQVBEO1FBQUMsYUFBTSxFQUFFOzs4Q0FBQTtJQWRYO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxvWEFTVDtTQUNGLENBQUM7O2tCQUFBO0lBVUYsaUJBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQVRZLGtCQUFVLGFBU3RCLENBQUEifQ==