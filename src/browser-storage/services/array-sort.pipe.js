/**
 * let array = [{name: 'Calle', age: 31}, {name: 'Lasse', age: 26}]
 * <li *ngFor="let item of array | arraySort:'-name'">{{item.name}}</li>
 */
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
var ArraySortPipe = (function () {
    function ArraySortPipe() {
    }
    ArraySortPipe.prototype.transform = function (array, args) {
        if (typeof args === 'undefined') {
            return array;
        }
        var direction = args[0];
        var column;
        if (direction === '-') {
            column = args.slice(1);
        }
        else {
            column = args;
        }
        array.sort(function (a, b) {
            var left = (a[column] + '').toLowerCase();
            var right = (b[column] + '').toLowerCase();
            if (direction === '-') {
                return left < right ? 1 : -1;
            }
            else {
                return left > right ? 1 : -1;
            }
        });
        return array;
    };
    ArraySortPipe = __decorate([
        core_1.Pipe({
            name: 'arraySort'
        }), 
        __metadata('design:paramtypes', [])
    ], ArraySortPipe);
    return ArraySortPipe;
}());
exports.ArraySortPipe = ArraySortPipe;
//# sourceMappingURL=array-sort.pipe.js.map