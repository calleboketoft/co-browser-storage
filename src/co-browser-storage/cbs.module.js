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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var cbs_component_1 = require('./cbs.component');
var array_sort_pipe_1 = require('./services/array-sort.pipe');
var cbs_model_1 = require('./services/cbs.model');
var batch_update_component_1 = require('./components/batch-update.component');
var storage_list_item_component_1 = require('./components/storage-list-item.component');
var storage_list_component_1 = require('./components/storage-list.component');
var CbsModule = (function () {
    function CbsModule() {
    }
    CbsModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                cbs_component_1.CbsComponent,
                array_sort_pipe_1.ArraySortPipe,
                batch_update_component_1.BatchUpdateComponent,
                storage_list_component_1.StorageListComponent,
                storage_list_item_component_1.StorageListItemComponent
            ],
            exports: [
                cbs_component_1.CbsComponent
            ],
            providers: [
                cbs_model_1.CbsModel
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CbsModule);
    return CbsModule;
}());
exports.CbsModule = CbsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUN6QixDQUFDLENBRHVDO0FBQ3hDLGlDQUE4QiwyQkFDOUIsQ0FBQyxDQUR3RDtBQUN6RCxzQkFBb0MsZ0JBQ3BDLENBQUMsQ0FEbUQ7QUFDcEQsOEJBQTZCLGlCQUM3QixDQUFDLENBRDZDO0FBQzlDLGdDQUE4Qiw0QkFDOUIsQ0FBQyxDQUR5RDtBQUMxRCwwQkFBeUIsc0JBQ3pCLENBQUMsQ0FEOEM7QUFDL0MsdUNBQXFDLHFDQUNyQyxDQUFDLENBRHlFO0FBQzFFLDRDQUF5QywwQ0FDekMsQ0FBQyxDQURrRjtBQUNuRix1Q0FBcUMscUNBRXJDLENBQUMsQ0FGeUU7QUFxQjFFO0lBQUE7SUFBd0IsQ0FBQztJQW5CekI7UUFBQyxlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsZ0NBQWE7Z0JBQ2IsMkJBQW1CO2FBQ3BCO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLDRCQUFZO2dCQUNaLCtCQUFhO2dCQUNiLDZDQUFvQjtnQkFDcEIsNkNBQW9CO2dCQUNwQixzREFBd0I7YUFDekI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCxvQkFBUTthQUNUO1NBQ0YsQ0FBQzs7aUJBQUE7SUFDc0IsZ0JBQUM7QUFBRCxDQUFDLEFBQXpCLElBQXlCO0FBQVosaUJBQVMsWUFBRyxDQUFBIn0=