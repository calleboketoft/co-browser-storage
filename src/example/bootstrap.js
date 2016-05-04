"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var store_1 = require('@ngrx/store');
var app_cmp_1 = require('./app-cmp');
var cbs_reducer_1 = require('../co-browser-storage/services/cbs-reducer');
var example_db_config_1 = require('./example-db-config');
var cbs_model_1 = require('../co-browser-storage/services/cbs-model');
cbs_model_1.setCbsConfig(example_db_config_1.exampleDbConfig);
platform_browser_dynamic_1.bootstrap(app_cmp_1.AppCmp, [
    // initial state is handled when store is initialized
    store_1.provideStore({ cbsReducer: cbs_reducer_1.cbsReducer }, { cbsReducer: [] })
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5Q0FBd0IsbUNBQ3hCLENBQUMsQ0FEMEQ7QUFDM0Qsc0JBQTJCLGFBQzNCLENBQUMsQ0FEdUM7QUFDeEMsd0JBQXFCLFdBQ3JCLENBQUMsQ0FEK0I7QUFDaEMsNEJBQXlCLDRDQUN6QixDQUFDLENBRG9FO0FBQ3JFLGtDQUE4QixxQkFDOUIsQ0FBQyxDQURrRDtBQUNuRCwwQkFBMkIsMENBRTNCLENBQUMsQ0FGb0U7QUFFckUsd0JBQVksQ0FBQyxtQ0FBZSxDQUFDLENBQUE7QUFFN0Isb0NBQVMsQ0FBQyxnQkFBTSxFQUFFO0lBQ2hCLHFEQUFxRDtJQUNyRCxvQkFBWSxDQUFDLEVBQUMsWUFBQSx3QkFBVSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUUsRUFBRSxFQUFDLENBQUM7Q0FDN0MsQ0FBQyxDQUFBIn0=