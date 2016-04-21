"use strict";
///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
var browser_1 = require('angular2/platform/browser');
var store_1 = require('@ngrx/store');
var app_cmp_1 = require('./app-cmp');
var cbs_reducer_1 = require('../co-browser-storage/services/cbs-reducer');
var example_db_config_1 = require('./example-db-config');
var cbs_model_1 = require('../co-browser-storage/services/cbs-model');
cbs_model_1.setCbsConfig(example_db_config_1.exampleDbConfig);
browser_1.bootstrap(app_cmp_1.AppCmp, [
    // initial state is handled when store is initialized
    store_1.provideStore({ cbsReducer: cbs_reducer_1.cbsReducer }, { cbsReducer: [] })
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1RUFBdUU7QUFDdkUsd0JBQXdCLDJCQUN4QixDQUFDLENBRGtEO0FBQ25ELHNCQUEyQixhQUMzQixDQUFDLENBRHVDO0FBQ3hDLHdCQUFxQixXQUNyQixDQUFDLENBRCtCO0FBQ2hDLDRCQUF5Qiw0Q0FDekIsQ0FBQyxDQURvRTtBQUNyRSxrQ0FBOEIscUJBQzlCLENBQUMsQ0FEa0Q7QUFDbkQsMEJBQTJCLDBDQUUzQixDQUFDLENBRm9FO0FBRXJFLHdCQUFZLENBQUMsbUNBQWUsQ0FBQyxDQUFBO0FBRTdCLG1CQUFTLENBQUMsZ0JBQU0sRUFBRTtJQUNoQixxREFBcUQ7SUFDckQsb0JBQVksQ0FBQyxFQUFDLFlBQUEsd0JBQVUsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLEVBQUUsRUFBQyxDQUFDO0NBQzdDLENBQUMsQ0FBQSJ9