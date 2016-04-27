/**
 * let array = [{name: 'Calle', age: 31}, {name: 'Lasse', age: 26}]
 * <li *ngFor="#item of array | arraySort:'-name'">{{item.name}}</li>
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
var core_1 = require('angular2/core');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXktc29ydC1waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJyYXktc29ydC1waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7Ozs7Ozs7Ozs7QUFFSCxxQkFBbUIsZUFFbkIsQ0FBQyxDQUZpQztBQUtsQztJQUFBO0lBMkJBLENBQUM7SUExQkMsaUNBQVMsR0FBVCxVQUFVLEtBQW9CLEVBQUUsSUFBWTtRQUMxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDZCxDQUFDO1FBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZCLElBQUksTUFBTSxDQUFBO1FBQ1YsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxHQUFHLElBQUksQ0FBQTtRQUNmLENBQUM7UUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBTSxFQUFFLENBQU07WUFDeEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDekMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7WUFFMUMsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUM5QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQzlCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBN0JIO1FBQUMsV0FBSSxDQUFDO1lBQ0osSUFBSSxFQUFFLFdBQVc7U0FDbEIsQ0FBQzs7cUJBQUE7SUE0QkYsb0JBQUM7QUFBRCxDQUFDLEFBM0JELElBMkJDO0FBM0JZLHFCQUFhLGdCQTJCekIsQ0FBQSJ9