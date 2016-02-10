var browser_1 = require('angular2/platform/browser');
var store_1 = require('@ngrx/store');
var app_cmp_1 = require('./app-cmp');
var co_browser_storage_reducer_1 = require('../co-browser-storage/services/co-browser-storage-reducer');
browser_1.bootstrap(app_cmp_1.AppCmp, [
    // initial state is handled when store is initialized
    store_1.provideStore({ coBrowserStorageReducer: co_browser_storage_reducer_1.coBrowserStorageReducer }, { coBrowserStorageReducer: [] })
]);

//# sourceMappingURL=bootstrap.js.map
