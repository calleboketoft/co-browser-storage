"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var store_1 = require('@ngrx/store');
var app_component_1 = require('./app.component');
var cbs_reducer_1 = require('../co-browser-storage/services/cbs.reducer');
var example_db_config_1 = require('./example-db.config');
var forms_1 = require('@angular/forms');
var co_browser_storage_1 = require('../../co-browser-storage');
co_browser_storage_1.initializeCbs(example_db_config_1.exampleDbConfig);
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    co_browser_storage_1.CbsModel,
    forms_1.provideForms(),
    store_1.provideStore({
        cbsReducer: cbs_reducer_1.cbsReducer
    }, {
        cbsReducer: co_browser_storage_1.getInitialCbsState()
    })
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF3QixtQ0FDeEIsQ0FBQyxDQUQwRDtBQUMzRCxzQkFBMkIsYUFDM0IsQ0FBQyxDQUR1QztBQUN4Qyw4QkFBMkIsaUJBQzNCLENBQUMsQ0FEMkM7QUFDNUMsNEJBQXlCLDRDQUN6QixDQUFDLENBRG9FO0FBQ3JFLGtDQUE4QixxQkFDOUIsQ0FBQyxDQURrRDtBQUNuRCxzQkFBMkIsZ0JBQzNCLENBQUMsQ0FEMEM7QUFDM0MsbUNBSU8sMEJBRVAsQ0FBQyxDQUZnQztBQUVqQyxrQ0FBYSxDQUFDLG1DQUFlLENBQUMsQ0FBQTtBQUU5QixvQ0FBUyxDQUFDLDRCQUFZLEVBQUU7SUFDdEIsNkJBQVE7SUFDUixvQkFBWSxFQUFFO0lBQ2Qsb0JBQVksQ0FBQztRQUNYLFlBQUEsd0JBQVU7S0FDWCxFQUFFO1FBQ0QsVUFBVSxFQUFFLHVDQUFrQixFQUFFO0tBQ2pDLENBQUM7Q0FDSCxDQUFDLENBQUEifQ==