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
            template: "\n    <input type='text' #storageType placeholder='Storage Type'>\n    <input type='text' #valueType placeholder='Value Type'>\n    <input type='text' #key placeholder='Key'>\n    <input type='text' #value placeholder='Value'>\n    <button type='button'\n      (click)='saveItem(storageType.value, valueType.value, key.value, value.value)'>\n      Add\n    </button>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NewItemCmp);
    return NewItemCmp;
})();
exports.NewItemCmp = NewItemCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jb21wb25lbnRzL25ldy1pdGVtLWNtcC50cyJdLCJuYW1lcyI6WyJOZXdJdGVtQ21wIiwiTmV3SXRlbUNtcC5jb25zdHJ1Y3RvciIsIk5ld0l0ZW1DbXAuc2F2ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUE4QyxlQUU5QyxDQUFDLENBRjREO0FBRTdEO0lBQUFBO1FBY1lDLFdBQU1BLEdBQUdBLElBQUlBLG1CQUFZQSxFQUFFQSxDQUFBQTtJQWF2Q0EsQ0FBQ0E7SUFYQ0QsNkJBQVFBLEdBQVJBLFVBQVVBLFdBQVdBLEVBQUVBLFNBQVNBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBO1FBQzFDRSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNUQSxNQUFNQSxZQUFZQSxDQUFBQTtRQUNwQkEsQ0FBQ0E7UUFDREEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDZkEsS0FBQUEsR0FBR0E7WUFDSEEsS0FBS0EsRUFBRUEsS0FBS0EsSUFBSUEsRUFBRUE7WUFDbEJBLFdBQVdBLEVBQUVBLFdBQVdBLElBQUlBLGNBQWNBO1lBQzFDQSxTQUFTQSxFQUFFQSxTQUFTQSxJQUFJQSxNQUFNQTtTQUMvQkEsQ0FBQ0EsQ0FBQUE7SUFDSkEsQ0FBQ0E7SUFaREY7UUFBQ0EsYUFBTUEsRUFBRUE7O09BQUNBLDhCQUFNQSxVQUFxQkE7SUFkdkNBO1FBQUNBLGdCQUFTQSxDQUFDQTtZQUNUQSxRQUFRQSxFQUFFQSxjQUFjQTtZQUN4QkEsUUFBUUEsRUFBRUEsb1hBU1RBO1NBQ0ZBLENBQUNBOzttQkFlREE7SUFBREEsaUJBQUNBO0FBQURBLENBM0JBLEFBMkJDQSxJQUFBO0FBZFksa0JBQVUsYUFjdEIsQ0FBQSIsImZpbGUiOiJjby1icm93c2VyLXN0b3JhZ2UvY29tcG9uZW50cy9uZXctaXRlbS1jbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25ldy1pdGVtLWNtcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0IHR5cGU9J3RleHQnICNzdG9yYWdlVHlwZSBwbGFjZWhvbGRlcj0nU3RvcmFnZSBUeXBlJz5cbiAgICA8aW5wdXQgdHlwZT0ndGV4dCcgI3ZhbHVlVHlwZSBwbGFjZWhvbGRlcj0nVmFsdWUgVHlwZSc+XG4gICAgPGlucHV0IHR5cGU9J3RleHQnICNrZXkgcGxhY2Vob2xkZXI9J0tleSc+XG4gICAgPGlucHV0IHR5cGU9J3RleHQnICN2YWx1ZSBwbGFjZWhvbGRlcj0nVmFsdWUnPlxuICAgIDxidXR0b24gdHlwZT0nYnV0dG9uJ1xuICAgICAgKGNsaWNrKT0nc2F2ZUl0ZW0oc3RvcmFnZVR5cGUudmFsdWUsIHZhbHVlVHlwZS52YWx1ZSwga2V5LnZhbHVlLCB2YWx1ZS52YWx1ZSknPlxuICAgICAgQWRkXG4gICAgPC9idXR0b24+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmV3SXRlbUNtcCB7XG4gIEBPdXRwdXQoKSBjcmVhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKClcblxuICBzYXZlSXRlbSAoc3RvcmFnZVR5cGUsIHZhbHVlVHlwZSwga2V5LCB2YWx1ZSkge1xuICAgIGlmICgha2V5KSB7XG4gICAgICB0aHJvdyAna2V5IHBsZWFzZSdcbiAgICB9XG4gICAgdGhpcy5jcmVhdGUuZW1pdCh7XG4gICAgICBrZXksXG4gICAgICB2YWx1ZTogdmFsdWUgfHwgJycsXG4gICAgICBzdG9yYWdlVHlwZTogc3RvcmFnZVR5cGUgfHwgJ2xvY2FsU3RvcmFnZScsXG4gICAgICB2YWx1ZVR5cGU6IHZhbHVlVHlwZSB8fCAndGV4dCdcbiAgICB9KVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9ub2RlX21vZHVsZXMifQ==
