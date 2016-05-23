"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var store_1 = require('@ngrx/store');
var app_cmp_1 = require('./app-cmp');
var cbs_reducer_1 = require('../co-browser-storage/services/cbs-reducer');
var example_db_config_1 = require('./example-db-config');
var co_browser_storage_1 = require('../../co-browser-storage');
co_browser_storage_1.initializeCbs(example_db_config_1.exampleDbConfig);
platform_browser_dynamic_1.bootstrap(app_cmp_1.AppCmp, [
    co_browser_storage_1.CbsModel,
    store_1.provideStore({
        cbsReducer: cbs_reducer_1.cbsReducer
    }, {
        cbsReducer: co_browser_storage_1.getInitialCbsState()
    })
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5Q0FBd0IsbUNBQ3hCLENBQUMsQ0FEMEQ7QUFDM0Qsc0JBQTJCLGFBQzNCLENBQUMsQ0FEdUM7QUFDeEMsd0JBQXFCLFdBQ3JCLENBQUMsQ0FEK0I7QUFDaEMsNEJBQXlCLDRDQUN6QixDQUFDLENBRG9FO0FBQ3JFLGtDQUE4QixxQkFDOUIsQ0FBQyxDQURrRDtBQUNuRCxtQ0FJTywwQkFFUCxDQUFDLENBRmdDO0FBRWpDLGtDQUFhLENBQUMsbUNBQWUsQ0FBQyxDQUFBO0FBRTlCLG9DQUFTLENBQUMsZ0JBQU0sRUFBRTtJQUNoQiw2QkFBUTtJQUNSLG9CQUFZLENBQUM7UUFDWCxZQUFBLHdCQUFVO0tBQ1gsRUFBRTtRQUNELFVBQVUsRUFBRSx1Q0FBa0IsRUFBRTtLQUNqQyxDQUFDO0NBQ0gsQ0FBQyxDQUFBIn0=