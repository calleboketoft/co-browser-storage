"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var store_1 = require('@ngrx/store');
var app_component_1 = require('./app.component');
var example_db_config_1 = require('./example-db.config');
var forms_1 = require('@angular/forms');
var co_browser_storage_1 = require('../../co-browser-storage');
co_browser_storage_1.initializeCbs(example_db_config_1.exampleDbConfig);
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    co_browser_storage_1.CbsModel,
    forms_1.provideForms(),
    store_1.provideStore({
        cbsReducer: co_browser_storage_1.cbsReducer
    }, {
        cbsReducer: co_browser_storage_1.getInitialCbsState()
    })
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF3QixtQ0FDeEIsQ0FBQyxDQUQwRDtBQUMzRCxzQkFBMkIsYUFDM0IsQ0FBQyxDQUR1QztBQUN4Qyw4QkFBMkIsaUJBQzNCLENBQUMsQ0FEMkM7QUFDNUMsa0NBQThCLHFCQUM5QixDQUFDLENBRGtEO0FBQ25ELHNCQUEyQixnQkFDM0IsQ0FBQyxDQUQwQztBQUMzQyxtQ0FLTywwQkFFUCxDQUFDLENBRmdDO0FBRWpDLGtDQUFhLENBQUMsbUNBQWUsQ0FBQyxDQUFBO0FBRTlCLG9DQUFTLENBQUMsNEJBQVksRUFBRTtJQUN0Qiw2QkFBUTtJQUNSLG9CQUFZLEVBQUU7SUFDZCxvQkFBWSxDQUFDO1FBQ1gsWUFBQSwrQkFBVTtLQUNYLEVBQUU7UUFDRCxVQUFVLEVBQUUsdUNBQWtCLEVBQUU7S0FDakMsQ0FBQztDQUNILENBQUMsQ0FBQSJ9