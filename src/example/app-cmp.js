"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var cbs_cmp_1 = require('../co-browser-storage/cbs-cmp');
var store_1 = require('@ngrx/store');
require('rxjs/add/operator/find');
require('rxjs/add/operator/map');
var AppCmp = (function () {
    function AppCmp(store) {
        this.store = store;
        this.cbsReducer$ = this.store.select('cbsReducer');
        this.cbsReducer$
            .map(function (cbsItems) { return cbsItems['find'](function (i) { return i.key === 'debugMode'; }); })
            .subscribe(function (debugMode) {
            console.log('DEBUG: ', debugMode.value === 'true');
        });
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            directives: [cbs_cmp_1.CbsCmp],
            template: "\n    <h2>co-browser-storage example app</h2>\n    <br>\n\n    <div class='row'>\n      <div class='col-xs-12'>\n        <cbs-cmp></cbs-cmp>\n      </div>\n    </div>\n    <br><br>\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1jbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUN4QixDQUFDLENBRHNDO0FBQ3ZDLHdCQUFxQiwrQkFDckIsQ0FBQyxDQURtRDtBQUNwRCxzQkFBb0IsYUFDcEIsQ0FBQyxDQURnQztBQUNqQyxRQUFPLHdCQUNQLENBQUMsQ0FEOEI7QUFDL0IsUUFBTyx1QkFFUCxDQUFDLENBRjZCO0FBaUI5QjtJQUVFLGdCQUFxQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBRDlCLGdCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFFbkQsSUFBSSxDQUFDLFdBQVc7YUFDYixHQUFHLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxLQUFLLFdBQVcsRUFBckIsQ0FBcUIsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDO2FBQzdELFNBQVMsQ0FBQyxVQUFBLFNBQVM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUcsU0FBUyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQTtRQUNyRCxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUF4Qkg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsVUFBVSxFQUFFLENBQUMsZ0JBQU0sQ0FBQztZQUNwQixRQUFRLEVBQUUsMExBVVQ7U0FDRixDQUFDOztjQUFBO0lBV0YsYUFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksY0FBTSxTQVVsQixDQUFBIn0=