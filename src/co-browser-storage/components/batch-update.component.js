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
var BatchUpdateComponent = (function () {
    function BatchUpdateComponent() {
        this.batchUpdate = new core_1.EventEmitter();
    }
    BatchUpdateComponent.prototype.setConfig = function (values) {
        var jsonValues = JSON.parse(values);
        this.batchUpdate.emit(jsonValues);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BatchUpdateComponent.prototype, "batchUpdate", void 0);
    BatchUpdateComponent = __decorate([
        core_1.Component({
            selector: 'batch-update-component',
            template: "\n    <div class=\"row\">\n      <div class=\"col-lg-3 col-xs-4\">\n        <strong>Batch update</strong>\n      </div>\n      <div class=\"col-lg-6 col-xs-4\">\n        <textarea #configTextarea class=\"form-control\"></textarea>\n      </div>\n      <div class=\"col-lg-3 col-xs-4\">\n        <button type=\"button\" class=\"btn btn-primary\"\n          (click)=\"setConfig(configTextarea.value)\">\n          Set values\n        </button>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BatchUpdateComponent);
    return BatchUpdateComponent;
}());
exports.BatchUpdateComponent = BatchUpdateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmF0Y2gtdXBkYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhdGNoLXVwZGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFnRCxlQUVoRCxDQUFDLENBRjhEO0FBcUIvRDtJQUFBO1FBQ1ksZ0JBQVcsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUs3QyxDQUFDO0lBSlEsd0NBQVMsR0FBaEIsVUFBa0IsTUFBTTtRQUN0QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFKRDtRQUFDLGFBQU0sRUFBRTs7NkRBQUE7SUFwQlg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxRQUFRLEVBQUUseWRBZVQ7U0FDRixDQUFDOzs0QkFBQTtJQU9GLDJCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSw0QkFBb0IsdUJBTWhDLENBQUEifQ==