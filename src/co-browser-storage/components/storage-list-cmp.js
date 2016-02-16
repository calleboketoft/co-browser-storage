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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jb21wb25lbnRzL3N0b3JhZ2UtbGlzdC1jbXAudHMiXSwibmFtZXMiOlsiU3RvcmFnZUxpc3RDbXAiLCJTdG9yYWdlTGlzdENtcC5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEscUJBQXFELGVBQ3JELENBQUMsQ0FEbUU7QUFDcEUsc0NBQWlDLHlCQUVqQyxDQUFDLENBRnlEO0FBRTFEO0lBQUFBO1FBa0JvQkMsaUJBQVlBLEdBQUdBLElBQUlBLG1CQUFZQSxFQUFFQSxDQUFBQTtRQUNqQ0EsY0FBU0EsR0FBR0EsSUFBSUEsbUJBQVlBLEVBQUVBLENBQUFBO1FBQy9CQSxhQUFRQSxHQUFHQSxJQUFJQSxtQkFBWUEsRUFBRUEsQ0FBQUE7SUFDaERBLENBQUNBO0lBSkNEO1FBQUNBLFlBQUtBLEVBQUVBOztPQUFDQSxnQ0FBSUEsVUFBQUE7SUFDYkE7UUFBQ0EsYUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7O09BQUNBLHdDQUFZQSxVQUFxQkE7SUFDbkRBO1FBQUNBLGFBQU1BLENBQUNBLFFBQVFBLENBQUNBOztPQUFDQSxxQ0FBU0EsVUFBcUJBO0lBQ2hEQTtRQUFDQSxhQUFNQSxDQUFDQSxPQUFPQSxDQUFDQTs7T0FBQ0Esb0NBQVFBLFVBQXFCQTtJQXBCaERBO1FBQUNBLGdCQUFTQSxDQUFDQTtZQUNUQSxRQUFRQSxFQUFFQSxrQkFBa0JBO1lBQzVCQSwwRUFBMEVBO1lBQzFFQSxRQUFRQSxFQUFFQSw0UkFVVEE7WUFDREEsVUFBVUEsRUFBRUEsQ0FBQ0EsMENBQWtCQSxDQUFDQTtTQUNqQ0EsQ0FBQ0E7O3VCQU1EQTtJQUFEQSxxQkFBQ0E7QUFBREEsQ0FyQkEsQUFxQkNBLElBQUE7QUFMWSxzQkFBYyxpQkFLMUIsQ0FBQSIsImZpbGUiOiJjby1icm93c2VyLXN0b3JhZ2UvY29tcG9uZW50cy9zdG9yYWdlLWxpc3QtY21wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSdcbmltcG9ydCB7U3RvcmFnZUxpc3RJdGVtQ21wfSBmcm9tICcuL3N0b3JhZ2UtbGlzdC1pdGVtLWNtcCdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3RvcmFnZS1saXN0LWNtcCcsXG4gIC8vIHdoZW4gdGhlIHJlbW92ZSBldmVudCBjb21lcyBmcm9tIHRoZSBjaGlsZCwgY2FsbCB0aGUgcmVtb3ZlS3ZwIGZ1bmN0aW9uXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxzdG9yYWdlLWxpc3QtaXRlbS1jbXBcbiAgICAgICAgKm5nRm9yPVwiI2t2cCBvZiBrdnBzXCJcbiAgICAgICAgW2t2cF09XCJrdnBcIlxuICAgICAgICAocmVtb3ZlKT1cInJlbW92ZU15SXRlbS5lbWl0KCRldmVudClcIlxuICAgICAgICAodXBkYXRlKT1cInVwZGF0ZUt2cC5lbWl0KCRldmVudClcIlxuICAgICAgICAocmVzZXQpPVwicmVzZXRLdnAuZW1pdCgkZXZlbnQpXCJcbiAgICAgID48L3N0b3JhZ2UtbGlzdC1pdGVtLWNtcD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZGlyZWN0aXZlczogW1N0b3JhZ2VMaXN0SXRlbUNtcF1cbn0pXG5leHBvcnQgY2xhc3MgU3RvcmFnZUxpc3RDbXAge1xuICBASW5wdXQoKSBrdnBzXG4gIEBPdXRwdXQoJ3JlbW92ZScpIHJlbW92ZU15SXRlbSA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICBAT3V0cHV0KCd1cGRhdGUnKSB1cGRhdGVLdnAgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgQE91dHB1dCgncmVzZXQnKSByZXNldEt2cCA9IG5ldyBFdmVudEVtaXR0ZXIoKVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
