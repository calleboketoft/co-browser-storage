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
        this.remove = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.reset = new core_1.EventEmitter();
    }
    StorageListItemCmp.prototype.updateWrap = function (storageItem, newValue) {
        storageItem.value = newValue.value;
        this.update.emit(storageItem);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "storageItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "remove", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StorageListItemCmp.prototype, "reset", void 0);
    StorageListItemCmp = __decorate([
        core_1.Component({
            selector: 'storage-list-item-cmp',
            template: "\n    <div>\n      <input type='text' disabled [value]='storageItem.storageType'>\n      <input type='text' disabled [value]='storageItem.valueType'>\n      <input type='text' disabled [value]='storageItem.key'>\n      <input [type]='storageItem.valueType' #newValue [value]='storageItem.value'>\n      <button (click)='remove.emit(storageItem)'>Remove</button>\n      <button (click)='updateWrap(storageItem, newValue)'>Save</button>\n      <button *ngIf='storageItem.inConfigFile' (click)='reset.emit(storageItem)'>\n        Reset\n      </button>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], StorageListItemCmp);
    return StorageListItemCmp;
})();
exports.StorageListItemCmp = StorageListItemCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jb21wb25lbnRzL3N0b3JhZ2UtbGlzdC1pdGVtLWNtcC50cyJdLCJuYW1lcyI6WyJTdG9yYWdlTGlzdEl0ZW1DbXAiLCJTdG9yYWdlTGlzdEl0ZW1DbXAuY29uc3RydWN0b3IiLCJTdG9yYWdlTGlzdEl0ZW1DbXAudXBkYXRlV3JhcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEscUJBQXFELGVBRXJELENBQUMsQ0FGbUU7QUFFcEU7SUFBQUE7UUFrQllDLFdBQU1BLEdBQUdBLElBQUlBLG1CQUFZQSxFQUFFQSxDQUFDQTtRQUM1QkEsV0FBTUEsR0FBR0EsSUFBSUEsbUJBQVlBLEVBQUVBLENBQUNBO1FBQzVCQSxVQUFLQSxHQUFHQSxJQUFJQSxtQkFBWUEsRUFBRUEsQ0FBQ0E7SUFNdkNBLENBQUNBO0lBSkNELHVDQUFVQSxHQUFWQSxVQUFZQSxXQUFXQSxFQUFFQSxRQUFRQTtRQUMvQkUsV0FBV0EsQ0FBQ0EsS0FBS0EsR0FBR0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQUE7UUFDbENBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUFBO0lBQy9CQSxDQUFDQTtJQVJERjtRQUFDQSxZQUFLQSxFQUFFQTs7T0FBQ0EsMkNBQVdBLFVBQUNBO0lBQ3JCQTtRQUFDQSxhQUFNQSxFQUFFQTs7T0FBQ0Esc0NBQU1BLFVBQXNCQTtJQUN0Q0E7UUFBQ0EsYUFBTUEsRUFBRUE7O09BQUNBLHNDQUFNQSxVQUFzQkE7SUFDdENBO1FBQUNBLGFBQU1BLEVBQUVBOztPQUFDQSxxQ0FBS0EsVUFBc0JBO0lBcEJ2Q0E7UUFBQ0EsZ0JBQVNBLENBQUNBO1lBQ1RBLFFBQVFBLEVBQUVBLHVCQUF1QkE7WUFDakNBLFFBQVFBLEVBQUVBLHVqQkFZVEE7U0FDRkEsQ0FBQ0E7OzJCQVdEQTtJQUFEQSx5QkFBQ0E7QUFBREEsQ0ExQkEsQUEwQkNBLElBQUE7QUFWWSwwQkFBa0IscUJBVTlCLENBQUEiLCJmaWxlIjoiY28tYnJvd3Nlci1zdG9yYWdlL2NvbXBvbmVudHMvc3RvcmFnZS1saXN0LWl0ZW0tY21wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3RvcmFnZS1saXN0LWl0ZW0tY21wJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2PlxuICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGRpc2FibGVkIFt2YWx1ZV09J3N0b3JhZ2VJdGVtLnN0b3JhZ2VUeXBlJz5cbiAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBkaXNhYmxlZCBbdmFsdWVdPSdzdG9yYWdlSXRlbS52YWx1ZVR5cGUnPlxuICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGRpc2FibGVkIFt2YWx1ZV09J3N0b3JhZ2VJdGVtLmtleSc+XG4gICAgICA8aW5wdXQgW3R5cGVdPSdzdG9yYWdlSXRlbS52YWx1ZVR5cGUnICNuZXdWYWx1ZSBbdmFsdWVdPSdzdG9yYWdlSXRlbS52YWx1ZSc+XG4gICAgICA8YnV0dG9uIChjbGljayk9J3JlbW92ZS5lbWl0KHN0b3JhZ2VJdGVtKSc+UmVtb3ZlPC9idXR0b24+XG4gICAgICA8YnV0dG9uIChjbGljayk9J3VwZGF0ZVdyYXAoc3RvcmFnZUl0ZW0sIG5ld1ZhbHVlKSc+U2F2ZTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiAqbmdJZj0nc3RvcmFnZUl0ZW0uaW5Db25maWdGaWxlJyAoY2xpY2spPSdyZXNldC5lbWl0KHN0b3JhZ2VJdGVtKSc+XG4gICAgICAgIFJlc2V0XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBTdG9yYWdlTGlzdEl0ZW1DbXAge1xuICBASW5wdXQoKSBzdG9yYWdlSXRlbTtcbiAgQE91dHB1dCgpIHJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlc2V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHVwZGF0ZVdyYXAgKHN0b3JhZ2VJdGVtLCBuZXdWYWx1ZSkge1xuICAgIHN0b3JhZ2VJdGVtLnZhbHVlID0gbmV3VmFsdWUudmFsdWVcbiAgICB0aGlzLnVwZGF0ZS5lbWl0KHN0b3JhZ2VJdGVtKVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9ub2RlX21vZHVsZXMifQ==
