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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jb21wb25lbnRzL25ldy1pdGVtLWNtcC50cyJdLCJuYW1lcyI6WyJOZXdJdGVtQ21wIiwiTmV3SXRlbUNtcC5jb25zdHJ1Y3RvciIsIk5ld0l0ZW1DbXAuc2F2ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUE4QyxlQUU5QyxDQUFDLENBRjREO0FBRTdEO0lBQUFBO1FBV1lDLFdBQU1BLEdBQUdBLElBQUlBLG1CQUFZQSxFQUFFQSxDQUFBQTtJQWF2Q0EsQ0FBQ0E7SUFYQ0QsNkJBQVFBLEdBQVJBLFVBQVVBLFdBQVdBLEVBQUVBLFNBQVNBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBO1FBQzFDRSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNUQSxNQUFNQSxZQUFZQSxDQUFBQTtRQUNwQkEsQ0FBQ0E7UUFDREEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDZkEsS0FBQUEsR0FBR0E7WUFDSEEsS0FBS0EsRUFBRUEsS0FBS0EsSUFBSUEsRUFBRUE7WUFDbEJBLFdBQVdBLEVBQUVBLFdBQVdBLElBQUlBLGNBQWNBO1lBQzFDQSxTQUFTQSxFQUFFQSxTQUFTQSxJQUFJQSxNQUFNQTtTQUMvQkEsQ0FBQ0EsQ0FBQUE7SUFDSkEsQ0FBQ0E7SUFaREY7UUFBQ0EsYUFBTUEsRUFBRUE7O09BQUNBLDhCQUFNQSxVQUFxQkE7SUFYdkNBO1FBQUNBLGdCQUFTQSxDQUFDQTtZQUNUQSxRQUFRQSxFQUFFQSxjQUFjQTtZQUN4QkEsUUFBUUEsRUFBRUEsbVhBTVRBO1NBQ0ZBLENBQUNBOzttQkFlREE7SUFBREEsaUJBQUNBO0FBQURBLENBeEJBLEFBd0JDQSxJQUFBO0FBZFksa0JBQVUsYUFjdEIsQ0FBQSIsImZpbGUiOiJjby1icm93c2VyLXN0b3JhZ2UvY29tcG9uZW50cy9uZXctaXRlbS1jbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25ldy1pdGVtLWNtcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgI3N0b3JhZ2VUeXBlIHBsYWNlaG9sZGVyPVwiU3RvcmFnZSBUeXBlXCI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgI3ZhbHVlVHlwZSBwbGFjZWhvbGRlcj1cIlZhbHVlIFR5cGVcIj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiAja2V5IHBsYWNlaG9sZGVyPVwiS2V5XCI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgI3ZhbHVlIHBsYWNlaG9sZGVyPVwiVmFsdWVcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwic2F2ZUl0ZW0oc3RvcmFnZVR5cGUudmFsdWUsIHZhbHVlVHlwZS52YWx1ZSwga2V5LnZhbHVlLCB2YWx1ZS52YWx1ZSlcIj5BZGQ8L2J1dHRvbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZXdJdGVtQ21wIHtcbiAgQE91dHB1dCgpIGNyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIHNhdmVJdGVtIChzdG9yYWdlVHlwZSwgdmFsdWVUeXBlLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIHRocm93ICdrZXkgcGxlYXNlJ1xuICAgIH1cbiAgICB0aGlzLmNyZWF0ZS5lbWl0KHtcbiAgICAgIGtleSxcbiAgICAgIHZhbHVlOiB2YWx1ZSB8fCAnJyxcbiAgICAgIHN0b3JhZ2VUeXBlOiBzdG9yYWdlVHlwZSB8fCAnbG9jYWxTdG9yYWdlJyxcbiAgICAgIHZhbHVlVHlwZTogdmFsdWVUeXBlIHx8ICd0ZXh0J1xuICAgIH0pXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
