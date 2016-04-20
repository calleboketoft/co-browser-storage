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
var core_1 = require('angular2/core');
var cbs_model_1 = require('../co-browser-storage/services/cbs-model');
var store_1 = require('@ngrx/store');
var exampleDbConfig = require('./example-db-config');
var ThirdPartyUsageCmp = (function () {
    function ThirdPartyUsageCmp(_store, _cbsModel) {
        this._store = _store;
        this._cbsModel = _cbsModel;
        this._cbsModel.allTrue([
            exampleDbConfig.DEBUG_MODE,
            exampleDbConfig.DEBUG_XHR
        ]).subscribe(function (test) {
            console.log(test);
        });
    }
    ThirdPartyUsageCmp.prototype._createItem = function () {
        this._cbsModel.createItem({ key: 'thirdPartyItem' });
    };
    ThirdPartyUsageCmp.prototype._logItem = function () {
        console.log(this.thirdPartyItem);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ThirdPartyUsageCmp.prototype, "thirdPartyItem", void 0);
    ThirdPartyUsageCmp = __decorate([
        core_1.Component({
            selector: 'third-party-usage-cmp',
            template: "\n    <p>Third party cmp</p>\n    <button (click)='_createItem()'>Create item 'thirdPartyItem'</button>\n    <span style='color: blue;' (click)='_logItem()'>{{thirdPartyItem ? thirdPartyItem.key : 'item missing'}}</span>\n  "
        }), 
        __metadata('design:paramtypes', [store_1.Store, cbs_model_1.CbsModel])
    ], ThirdPartyUsageCmp);
    return ThirdPartyUsageCmp;
}());
exports.ThirdPartyUsageCmp = ThirdPartyUsageCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhpcmQtcGFydHktdXNhZ2UtY21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhpcmQtcGFydHktdXNhZ2UtY21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0IsZUFDL0IsQ0FBQyxDQUQ2QztBQUM5QywwQkFBdUIsMENBQ3ZCLENBQUMsQ0FEZ0U7QUFDakUsc0JBQW9CLGFBQ3BCLENBQUMsQ0FEZ0M7QUFDakMsSUFBWSxlQUFlLFdBQU0scUJBRWpDLENBQUMsQ0FGcUQ7QUFVdEQ7SUFFRSw0QkFDVSxNQUFrQixFQUNsQixTQUFtQjtRQURuQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFFM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDckIsZUFBZSxDQUFDLFVBQVU7WUFDMUIsZUFBZSxDQUFDLFNBQVM7U0FDMUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVPLHdDQUFXLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFFTyxxQ0FBUSxHQUFoQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFuQkQ7UUFBQyxZQUFLLEVBQUU7OzhEQUFBO0lBVFY7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxRQUFRLEVBQUUsa09BSVQ7U0FDRixDQUFDOzswQkFBQTtJQXNCRix5QkFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFyQlksMEJBQWtCLHFCQXFCOUIsQ0FBQSJ9