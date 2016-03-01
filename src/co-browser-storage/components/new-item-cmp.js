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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jb21wb25lbnRzL25ldy1pdGVtLWNtcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQThDLGVBRTlDLENBQUMsQ0FGNEQ7QUFlN0Q7SUFBQTtRQUNZLFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQTtJQVF2QyxDQUFDO0lBTkMsNkJBQVEsR0FBUixVQUFVLFdBQVcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUs7UUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1QsTUFBTSxZQUFZLENBQUE7UUFDcEIsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBQSxHQUFHLEVBQUUsT0FBQSxLQUFLLEVBQUUsYUFBQSxXQUFXLEVBQUUsV0FBQSxTQUFTLEVBQUMsQ0FBQyxDQUFBO0lBQ3hELENBQUM7SUFQRDtRQUFDLGFBQU0sRUFBRTs7OENBQUE7SUFkWDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsb1hBU1Q7U0FDRixDQUFDOztrQkFBQTtJQVVGLGlCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSxrQkFBVSxhQVN0QixDQUFBIiwiZmlsZSI6ImNvLWJyb3dzZXItc3RvcmFnZS9jb21wb25lbnRzL25ldy1pdGVtLWNtcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dH0gZnJvbSAnYW5ndWxhcjIvY29yZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmV3LWl0ZW0tY21wJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW5wdXQgdHlwZT0ndGV4dCcgI3N0b3JhZ2VUeXBlIHBsYWNlaG9sZGVyPSdTdG9yYWdlIFR5cGUnPlxuICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyAjdmFsdWVUeXBlIHBsYWNlaG9sZGVyPSdWYWx1ZSBUeXBlJz5cbiAgICA8aW5wdXQgdHlwZT0ndGV4dCcgI2tleSBwbGFjZWhvbGRlcj0nS2V5Jz5cbiAgICA8aW5wdXQgdHlwZT0ndGV4dCcgI3ZhbHVlIHBsYWNlaG9sZGVyPSdWYWx1ZSc+XG4gICAgPGJ1dHRvbiB0eXBlPSdidXR0b24nXG4gICAgICAoY2xpY2spPSdzYXZlSXRlbShzdG9yYWdlVHlwZS52YWx1ZSwgdmFsdWVUeXBlLnZhbHVlLCBrZXkudmFsdWUsIHZhbHVlLnZhbHVlKSc+XG4gICAgICBBZGRcbiAgICA8L2J1dHRvbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZXdJdGVtQ21wIHtcbiAgQE91dHB1dCgpIGNyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuXG4gIHNhdmVJdGVtIChzdG9yYWdlVHlwZSwgdmFsdWVUeXBlLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIHRocm93ICdrZXkgcGxlYXNlJ1xuICAgIH1cbiAgICB0aGlzLmNyZWF0ZS5lbWl0KHtrZXksIHZhbHVlLCBzdG9yYWdlVHlwZSwgdmFsdWVUeXBlfSlcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvbm9kZV9tb2R1bGVzIn0=
