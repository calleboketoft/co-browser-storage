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
})();
exports.NewItemCmp = NewItemCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jb21wb25lbnRzL25ldy1pdGVtLWNtcC50cyJdLCJuYW1lcyI6WyJOZXdJdGVtQ21wIiwiTmV3SXRlbUNtcC5jb25zdHJ1Y3RvciIsIk5ld0l0ZW1DbXAuc2F2ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUE4QyxlQUU5QyxDQUFDLENBRjREO0FBRTdEO0lBQUFBO1FBY1lDLFdBQU1BLEdBQUdBLElBQUlBLG1CQUFZQSxFQUFFQSxDQUFBQTtJQVF2Q0EsQ0FBQ0E7SUFOQ0QsNkJBQVFBLEdBQVJBLFVBQVVBLFdBQVdBLEVBQUVBLFNBQVNBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBO1FBQzFDRSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNUQSxNQUFNQSxZQUFZQSxDQUFBQTtRQUNwQkEsQ0FBQ0E7UUFDREEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBQ0EsS0FBQUEsR0FBR0EsRUFBRUEsT0FBQUEsS0FBS0EsRUFBRUEsYUFBQUEsV0FBV0EsRUFBRUEsV0FBQUEsU0FBU0EsRUFBQ0EsQ0FBQ0EsQ0FBQUE7SUFDeERBLENBQUNBO0lBUERGO1FBQUNBLGFBQU1BLEVBQUVBOztPQUFDQSw4QkFBTUEsVUFBcUJBO0lBZHZDQTtRQUFDQSxnQkFBU0EsQ0FBQ0E7WUFDVEEsUUFBUUEsRUFBRUEsY0FBY0E7WUFDeEJBLFFBQVFBLEVBQUVBLG9YQVNUQTtTQUNGQSxDQUFDQTs7bUJBVURBO0lBQURBLGlCQUFDQTtBQUFEQSxDQXRCQSxBQXNCQ0EsSUFBQTtBQVRZLGtCQUFVLGFBU3RCLENBQUEiLCJmaWxlIjoiY28tYnJvd3Nlci1zdG9yYWdlL2NvbXBvbmVudHMvbmV3LWl0ZW0tY21wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0fSBmcm9tICdhbmd1bGFyMi9jb3JlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZXctaXRlbS1jbXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyAjc3RvcmFnZVR5cGUgcGxhY2Vob2xkZXI9J1N0b3JhZ2UgVHlwZSc+XG4gICAgPGlucHV0IHR5cGU9J3RleHQnICN2YWx1ZVR5cGUgcGxhY2Vob2xkZXI9J1ZhbHVlIFR5cGUnPlxuICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyAja2V5IHBsYWNlaG9sZGVyPSdLZXknPlxuICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyAjdmFsdWUgcGxhY2Vob2xkZXI9J1ZhbHVlJz5cbiAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbidcbiAgICAgIChjbGljayk9J3NhdmVJdGVtKHN0b3JhZ2VUeXBlLnZhbHVlLCB2YWx1ZVR5cGUudmFsdWUsIGtleS52YWx1ZSwgdmFsdWUudmFsdWUpJz5cbiAgICAgIEFkZFxuICAgIDwvYnV0dG9uPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5ld0l0ZW1DbXAge1xuICBAT3V0cHV0KCkgY3JlYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgc2F2ZUl0ZW0gKHN0b3JhZ2VUeXBlLCB2YWx1ZVR5cGUsIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAgdGhyb3cgJ2tleSBwbGVhc2UnXG4gICAgfVxuICAgIHRoaXMuY3JlYXRlLmVtaXQoe2tleSwgdmFsdWUsIHN0b3JhZ2VUeXBlLCB2YWx1ZVR5cGV9KVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9ub2RlX21vZHVsZXMifQ==
