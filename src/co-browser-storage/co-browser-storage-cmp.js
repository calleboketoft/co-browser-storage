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
var KvpActions = require('./services/kvp-reducer');
var persistence_service_1 = require('./services/persistence-service');
var storage_list_cmp_1 = require('./components/storage-list-cmp');
var new_item_cmp_1 = require('./components/new-item-cmp');
var CoBrowserStorageCmp = (function () {
    function CoBrowserStorageCmp(store, persistenceService) {
        var _this = this;
        this.store = store;
        this.persistenceService = persistenceService;
        this.kvpsInited = false;
        this.kvps = store.select('kvps');
        this.kvps.subscribe(function (state) {
            // Whenever the state has been updated, save it
            console.log(state);
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
            type: KvpActions.INIT_KVPS,
            payload: initialState
        });
    };
    CoBrowserStorageCmp.prototype.addKvp = function (newKvp) {
        this.store.dispatch({
            type: KvpActions.ADD_KVP,
            payload: newKvp
        });
    };
    CoBrowserStorageCmp.prototype.updateKvp = function (kvp) {
        var test = this.store.dispatch({
            type: KvpActions.UPDATE_KVP,
            payload: kvp
        });
    };
    CoBrowserStorageCmp.prototype.resetKvp = function (kvp) {
        var resettedItem = this.persistenceService.getItemFromSchema(kvp.key);
        if (resettedItem) {
            this.store.dispatch({
                type: KvpActions.UPDATE_KVP,
                payload: resettedItem
            });
        }
    };
    CoBrowserStorageCmp.prototype.removeKvp = function (kvp) {
        // Note: this is a bit of hack but it works
        this.persistenceService.removeItem(kvp);
        this.store.dispatch({
            type: KvpActions.REMOVE_KVP,
            payload: kvp
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CoBrowserStorageCmp.prototype, "coBrowserStorageConfig", void 0);
    CoBrowserStorageCmp = __decorate([
        core_1.Component({
            selector: 'co-browser-storage-cmp',
            template: "\n    <div>\n      <h4>co-browser-storage</h4>\n      <storage-list-cmp\n        [kvps]=\"kvps | async\"\n        (remove)=\"removeKvp($event)\"\n        (update)=\"updateKvp($event)\"\n        (reset)=\"resetKvp($event)\">\n      </storage-list-cmp>\n      <br>\n      Add temporary item<br>\n      <new-item-cmp (create)=\"addKvp($event)\"></new-item-cmp>\n    </div>\n  ",
            directives: [storage_list_cmp_1.StorageListCmp, new_item_cmp_1.NewItemCmp],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            providers: [persistence_service_1.PersistenceService]
        }), 
        __metadata('design:paramtypes', [store_1.Store, persistence_service_1.PersistenceService])
    ], CoBrowserStorageCmp);
    return CoBrowserStorageCmp;
})();
exports.CoBrowserStorageCmp = CoBrowserStorageCmp;

//# sourceMappingURL=co-browser-storage-cmp.js.map
