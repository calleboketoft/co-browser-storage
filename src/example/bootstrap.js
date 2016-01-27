var browser_1 = require('angular2/platform/browser');
var store_1 = require('@ngrx/store');
var app_cmp_1 = require('./app-cmp');
var kvp_reducer_1 = require('../co-browser-storage/services/kvp-reducer');
browser_1.bootstrap(app_cmp_1.AppCmp, [
    // initial state is handled when store is initialized
    store_1.provideStore({ kvps: kvp_reducer_1.kvpReducer }, { kvps: [] })
]);

//# sourceMappingURL=bootstrap.js.map
