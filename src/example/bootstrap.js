///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
"use strict";
var browser_1 = require('angular2/platform/browser');
var store_1 = require('@ngrx/store');
var app_cmp_1 = require('./app-cmp');
var co_browser_storage_reducer_1 = require('../co-browser-storage/services/co-browser-storage-reducer');
browser_1.bootstrap(app_cmp_1.AppCmp, [
    // initial state is handled when store is initialized
    store_1.provideStore({ coBrowserStorageReducer: co_browser_storage_reducer_1.coBrowserStorageReducer }, { coBrowserStorageReducer: [] })
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVFQUF1RTs7QUFFdkUsd0JBQXdCLDJCQUN4QixDQUFDLENBRGtEO0FBQ25ELHNCQUEyQixhQUMzQixDQUFDLENBRHVDO0FBQ3hDLHdCQUFxQixXQUNyQixDQUFDLENBRCtCO0FBQ2hDLDJDQUFzQywyREFFdEMsQ0FBQyxDQUZnRztBQUVqRyxtQkFBUyxDQUFDLGdCQUFNLEVBQUU7SUFDaEIscURBQXFEO0lBQ3JELG9CQUFZLENBQUMsRUFBQyx5QkFBQSxvREFBdUIsRUFBQyxFQUFFLEVBQUMsdUJBQXVCLEVBQUUsRUFBRSxFQUFDLENBQUM7Q0FDdkUsQ0FBQyxDQUFBIn0=