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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jb21wb25lbnRzL3N0b3JhZ2UtbGlzdC1pdGVtLWNtcC50cyJdLCJuYW1lcyI6WyJTdG9yYWdlTGlzdEl0ZW1DbXAiLCJTdG9yYWdlTGlzdEl0ZW1DbXAuY29uc3RydWN0b3IiLCJTdG9yYWdlTGlzdEl0ZW1DbXAudXBkYXRlS3ZwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxxQkFBcUQsZUFFckQsQ0FBQyxDQUZtRTtBQUVwRTtJQUFBQTtRQWdCb0JDLGFBQVFBLEdBQUdBLElBQUlBLG1CQUFZQSxFQUFFQSxDQUFBQTtRQUM3QkEsV0FBTUEsR0FBR0EsSUFBSUEsbUJBQVlBLEVBQUVBLENBQUFBO1FBQzVCQSxhQUFRQSxHQUFHQSxJQUFJQSxtQkFBWUEsRUFBRUEsQ0FBQUE7SUFNaERBLENBQUNBO0lBSkNELHNDQUFTQSxHQUFUQSxVQUFXQSxHQUFHQSxFQUFFQSxRQUFRQTtRQUN0QkUsR0FBR0EsQ0FBQ0EsS0FBS0EsR0FBR0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQUE7UUFDMUJBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUFBO0lBQ3ZCQSxDQUFDQTtJQVJERjtRQUFDQSxZQUFLQSxFQUFFQTs7T0FBQ0EsbUNBQUdBLFVBQUFBO0lBQ1pBO1FBQUNBLGFBQU1BLENBQUNBLFFBQVFBLENBQUNBOztPQUFDQSx3Q0FBUUEsVUFBcUJBO0lBQy9DQTtRQUFDQSxhQUFNQSxDQUFDQSxRQUFRQSxDQUFDQTs7T0FBQ0Esc0NBQU1BLFVBQXFCQTtJQUM3Q0E7UUFBQ0EsYUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7O09BQUNBLHdDQUFRQSxVQUFxQkE7SUFsQmhEQTtRQUFDQSxnQkFBU0EsQ0FBQ0E7WUFDVEEsUUFBUUEsRUFBRUEsdUJBQXVCQTtZQUNqQ0EsUUFBUUEsRUFBRUEseWZBVVRBO1NBQ0ZBLENBQUNBOzsyQkFXREE7SUFBREEseUJBQUNBO0FBQURBLENBeEJBLEFBd0JDQSxJQUFBO0FBVlksMEJBQWtCLHFCQVU5QixDQUFBIiwiZmlsZSI6ImNvLWJyb3dzZXItc3RvcmFnZS9jb21wb25lbnRzL3N0b3JhZ2UtbGlzdC1pdGVtLWNtcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0b3JhZ2UtbGlzdC1pdGVtLWNtcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGRpc2FibGVkIFt2YWx1ZV09XCJrdnAuc3RvcmFnZVR5cGVcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGRpc2FibGVkIFt2YWx1ZV09XCJrdnAudmFsdWVUeXBlXCI+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBkaXNhYmxlZCBbdmFsdWVdPVwia3ZwLmtleVwiPlxuICAgICAgPGlucHV0IFt0eXBlXT1cImt2cC52YWx1ZVR5cGVcIiAjbmV3VmFsdWUgW3ZhbHVlXT1cImt2cC52YWx1ZVwiPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlTWUuZW1pdChrdnApXCI+UmVtb3ZlPC9idXR0b24+XG4gICAgICA8YnV0dG9uIChjbGljayk9XCJ1cGRhdGVLdnAoa3ZwLCBuZXdWYWx1ZSlcIj5TYXZlPC9idXR0b24+XG4gICAgICA8YnV0dG9uICpuZ0lmPVwia3ZwLmluQ29uZmlnRmlsZVwiIChjbGljayk9XCJyZXNldEt2cC5lbWl0KGt2cClcIj5SZXNldDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VMaXN0SXRlbUNtcCB7XG4gIEBJbnB1dCgpIGt2cFxuICBAT3V0cHV0KCdyZW1vdmUnKSByZW1vdmVNZSA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICBAT3V0cHV0KCd1cGRhdGUnKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgQE91dHB1dCgncmVzZXQnKSByZXNldEt2cCA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIHVwZGF0ZUt2cCAoa3ZwLCBuZXdWYWx1ZSkge1xuICAgIGt2cC52YWx1ZSA9IG5ld1ZhbHVlLnZhbHVlXG4gICAgdGhpcy51cGRhdGUuZW1pdChrdnApXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL25vZGVfbW9kdWxlcyJ9
