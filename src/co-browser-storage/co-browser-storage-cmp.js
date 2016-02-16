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
var store_1 = require('@ngrx/store');
var CoBrowserStorageActions = require('./services/co-browser-storage-reducer');
var persistence_service_1 = require('./services/persistence-service');
var storage_list_cmp_1 = require('./components/storage-list-cmp');
var new_item_cmp_1 = require('./components/new-item-cmp');
var CoBrowserStorageCmp = (function () {
    function CoBrowserStorageCmp(store, persistenceService) {
        var _this = this;
        this.store = store;
        this.persistenceService = persistenceService;
        this.kvpsInited = false;
        this.kvps = store.select('coBrowserStorageReducer');
        this.kvps.subscribe(function (state) {
            // Whenever the state has been updated, save it
            if (_this.kvpsInited) {
                _this.persistenceService.saveState(state);
            }
            else {
                _this.kvpsInited = true;
            }
        });
    }
    CoBrowserStorageCmp.prototype.ngOnInit = function () {
        // Initialize stuff
        var initialState = this.persistenceService.initialize(this.coBrowserStorageConfig);
        this.store.dispatch({
            type: CoBrowserStorageActions.INIT_KVPS,
            payload: initialState
        });
    };
    CoBrowserStorageCmp.prototype.addKvp = function (newKvp) {
        this.store.dispatch({
            type: CoBrowserStorageActions.ADD_KVP,
            payload: newKvp
        });
    };
    CoBrowserStorageCmp.prototype.updateKvp = function (kvp) {
        var test = this.store.dispatch({
            type: CoBrowserStorageActions.UPDATE_KVP,
            payload: kvp
        });
    };
    CoBrowserStorageCmp.prototype.resetKvp = function (kvp) {
        var resettedItem = this.persistenceService.getItemFromSchema(kvp.key);
        if (resettedItem) {
            this.store.dispatch({
                type: CoBrowserStorageActions.UPDATE_KVP,
                payload: resettedItem
            });
        }
    };
    CoBrowserStorageCmp.prototype.removeKvp = function (kvp) {
        // Note: this is a bit of hack but it works
        this.persistenceService.removeItem(kvp);
        this.store.dispatch({
            type: CoBrowserStorageActions.REMOVE_KVP,
            payload: kvp
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CoBrowserStorageCmp.prototype, "coBrowserStorageConfig", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CoBrowserStorageCmp.prototype, "noRender", void 0);
    CoBrowserStorageCmp = __decorate([
        core_1.Component({
            selector: 'co-browser-storage-cmp',
            template: "\n    <div *ngIf=\"!noRender\">\n      <h4>co-browser-storage</h4>\n      <storage-list-cmp\n        [kvps]=\"kvps | async\"\n        (remove)=\"removeKvp($event)\"\n        (update)=\"updateKvp($event)\"\n        (reset)=\"resetKvp($event)\">\n      </storage-list-cmp>\n      <br>\n      Add temporary item<br>\n      <new-item-cmp (create)=\"addKvp($event)\"></new-item-cmp>\n    </div>\n  ",
            directives: [storage_list_cmp_1.StorageListCmp, new_item_cmp_1.NewItemCmp],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            providers: [persistence_service_1.PersistenceService]
        }), 
        __metadata('design:paramtypes', [store_1.Store, persistence_service_1.PersistenceService])
    ], CoBrowserStorageCmp);
    return CoBrowserStorageCmp;
})();
exports.CoBrowserStorageCmp = CoBrowserStorageCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvLWJyb3dzZXItc3RvcmFnZS9jby1icm93c2VyLXN0b3JhZ2UtY21wLnRzIl0sIm5hbWVzIjpbIkNvQnJvd3NlclN0b3JhZ2VDbXAiLCJDb0Jyb3dzZXJTdG9yYWdlQ21wLmNvbnN0cnVjdG9yIiwiQ29Ccm93c2VyU3RvcmFnZUNtcC5uZ09uSW5pdCIsIkNvQnJvd3NlclN0b3JhZ2VDbXAuYWRkS3ZwIiwiQ29Ccm93c2VyU3RvcmFnZUNtcC51cGRhdGVLdnAiLCJDb0Jyb3dzZXJTdG9yYWdlQ21wLnJlc2V0S3ZwIiwiQ29Ccm93c2VyU3RvcmFnZUNtcC5yZW1vdmVLdnAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUF3RCxlQUN4RCxDQUFDLENBRHNFO0FBQ3ZFLHNCQUFvQixhQUNwQixDQUFDLENBRGdDO0FBQ2pDLElBQVksdUJBQXVCLFdBQU0sdUNBQ3pDLENBQUMsQ0FEK0U7QUFDaEYsb0NBQWlDLGdDQUNqQyxDQUFDLENBRGdFO0FBQ2pFLGlDQUE2QiwrQkFDN0IsQ0FBQyxDQUQyRDtBQUM1RCw2QkFBeUIsMkJBRXpCLENBQUMsQ0FGbUQ7QUFFcEQ7SUEwQkVBLDZCQUNVQSxLQUFpQkEsRUFDakJBLGtCQUFxQ0E7UUE1QmpEQyxpQkFtRkNBO1FBeERXQSxVQUFLQSxHQUFMQSxLQUFLQSxDQUFZQTtRQUNqQkEsdUJBQWtCQSxHQUFsQkEsa0JBQWtCQSxDQUFtQkE7UUFKdkNBLGVBQVVBLEdBQUdBLEtBQUtBLENBQUNBO1FBTXpCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSx5QkFBeUJBLENBQUNBLENBQUFBO1FBRW5EQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFBQSxLQUFLQTtZQUN2QkEsK0NBQStDQTtZQUMvQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxLQUFJQSxDQUFDQSxrQkFBa0JBLENB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b250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnXG5pbXBvcnQge1N0b3JlfSBmcm9tICdAbmdyeC9zdG9yZSdcbmltcG9ydCAqIGFzIENvQnJvd3NlclN0b3JhZ2VBY3Rpb25zIGZyb20gJy4vc2VydmljZXMvY28tYnJvd3Nlci1zdG9yYWdlLXJlZHVjZXInXG5pbXBvcnQge1BlcnNpc3RlbmNlU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlcy9wZXJzaXN0ZW5jZS1zZXJ2aWNlJ1xuaW1wb3J0IHtTdG9yYWdlTGlzdENtcH0gZnJvbSAnLi9jb21wb25lbnRzL3N0b3JhZ2UtbGlzdC1jbXAnXG5pbXBvcnQge05ld0l0ZW1DbXB9IGZyb20gJy4vY29tcG9uZW50cy9uZXctaXRlbS1jbXAnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NvLWJyb3dzZXItc3RvcmFnZS1jbXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCIhbm9SZW5kZXJcIj5cbiAgICAgIDxoND5jby1icm93c2VyLXN0b3JhZ2U8L2g0PlxuICAgICAgPHN0b3JhZ2UtbGlzdC1jbXBcbiAgICAgICAgW2t2cHNdPVwia3ZwcyB8IGFzeW5jXCJcbiAgICAgICAgKHJlbW92ZSk9XCJyZW1vdmVLdnAoJGV2ZW50KVwiXG4gICAgICAgICh1cGRhdGUpPVwidXBkYXRlS3ZwKCRldmVudClcIlxuICAgICAgICAocmVzZXQpPVwicmVzZXRLdnAoJGV2ZW50KVwiPlxuICAgICAgPC9zdG9yYWdlLWxpc3QtY21wPlxuICAgICAgPGJyPlxuICAgICAgQWRkIHRlbXBvcmFyeSBpdGVtPGJyPlxuICAgICAgPG5ldy1pdGVtLWNtcCAoY3JlYXRlKT1cImFkZEt2cCgkZXZlbnQpXCI+PC9uZXctaXRlbS1jbXA+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGRpcmVjdGl2ZXM6IFtTdG9yYWdlTGlzdENtcCwgTmV3SXRlbUNtcF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtQZXJzaXN0ZW5jZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIENvQnJvd3NlclN0b3JhZ2VDbXAge1xuICBASW5wdXQoKSBjb0Jyb3dzZXJTdG9yYWdlQ29uZmlnO1xuICBASW5wdXQoKSBub1JlbmRlcjtcbiAgcHVibGljIGt2cHM7XG4gIHByaXZhdGUga3Zwc0luaXRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yIChcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxhbnk+LFxuICAgIHByaXZhdGUgcGVyc2lzdGVuY2VTZXJ2aWNlOlBlcnNpc3RlbmNlU2VydmljZVxuICApIHtcbiAgICB0aGlzLmt2cHMgPSBzdG9yZS5zZWxlY3QoJ2NvQnJvd3NlclN0b3JhZ2VSZWR1Y2VyJylcblxuICAgIHRoaXMua3Zwcy5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgLy8gV2hlbmV2ZXIgdGhlIHN0YXRlIGhhcyBiZWVuIHVwZGF0ZWQsIHNhdmUgaXRcbiAgICAgIGlmICh0aGlzLmt2cHNJbml0ZWQpIHtcbiAgICAgICAgdGhpcy5wZXJzaXN0ZW5jZVNlcnZpY2Uuc2F2ZVN0YXRlKHN0YXRlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5rdnBzSW5pdGVkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBuZ09uSW5pdCAoKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBzdHVmZlxuICAgIGxldCBpbml0aWFsU3RhdGUgPSB0aGlzLnBlcnNpc3RlbmNlU2VydmljZS5pbml0aWFsaXplKHRoaXMuY29Ccm93c2VyU3RvcmFnZUNvbmZpZylcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IENvQnJvd3NlclN0b3JhZ2VBY3Rpb25zLklOSVRfS1ZQUyxcbiAgICAgIHBheWxvYWQ6IGluaXRpYWxTdGF0ZVxuICAgIH0pXG4gIH1cblxuICBhZGRLdnAgKG5ld0t2cCkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogQ29Ccm93c2VyU3RvcmFnZUFjdGlvbnMuQUREX0tWUCxcbiAgICAgIHBheWxvYWQ6IG5ld0t2cFxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVLdnAgKGt2cCkge1xuICAgIHZhciB0ZXN0ID0gdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICB0eXBlOiBDb0Jyb3dzZXJTdG9yYWdlQWN0aW9ucy5VUERBVEVfS1ZQLFxuICAgICAgcGF5bG9hZDoga3ZwXG4gICAgfSlcbiAgfVxuXG4gIHJlc2V0S3ZwIChrdnApIHtcbiAgICBsZXQgcmVzZXR0ZWRJdGVtID0gdGhpcy5wZXJzaXN0ZW5jZVNlcnZpY2UuZ2V0SXRlbUZyb21TY2hlbWEoa3ZwLmtleSlcbiAgICBpZiAocmVzZXR0ZWRJdGVtKSB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogQ29Ccm93c2VyU3RvcmFnZUFjdGlvbnMuVVBEQVRFX0tWUCxcbiAgICAgICAgcGF5bG9hZDogcmVzZXR0ZWRJdGVtXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUt2cCAoa3ZwKSB7XG4gICAgLy8gTm90ZTogdGhpcyBpcyBhIGJpdCBvZiBoYWNrIGJ1dCBpdCB3b3Jrc1xuICAgIHRoaXMucGVyc2lzdGVuY2VTZXJ2aWNlLnJlbW92ZUl0ZW0oa3ZwKVxuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogQ29Ccm93c2VyU3RvcmFnZUFjdGlvbnMuUkVNT1ZFX0tWUCxcbiAgICAgIHBheWxvYWQ6IGt2cFxuICAgIH0pXG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9ub2RlX21vZHVsZXMifQ==
