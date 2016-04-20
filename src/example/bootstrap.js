"use strict";
///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
var browser_1 = require('angular2/platform/browser');
var store_1 = require('@ngrx/store');
var app_cmp_1 = require('./app-cmp');
var cbs_reducer_1 = require('../co-browser-storage/services/cbs-reducer');
browser_1.bootstrap(app_cmp_1.AppCmp, [
    // initial state is handled when store is initialized
    store_1.provideStore({ cbsReducer: cbs_reducer_1.cbsReducer }, { cbsReducer: [] })
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1RUFBdUU7QUFDdkUsd0JBQXdCLDJCQUN4QixDQUFDLENBRGtEO0FBQ25ELHNCQUEyQixhQUMzQixDQUFDLENBRHVDO0FBQ3hDLHdCQUFxQixXQUNyQixDQUFDLENBRCtCO0FBQ2hDLDRCQUF5Qiw0Q0FFekIsQ0FBQyxDQUZvRTtBQUVyRSxtQkFBUyxDQUFDLGdCQUFNLEVBQUU7SUFDaEIscURBQXFEO0lBQ3JELG9CQUFZLENBQUMsRUFBQyxZQUFBLHdCQUFVLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUMsQ0FBQztDQUM3QyxDQUFDLENBQUEifQ==