"use strict";
exports.ADDED_BROWSER_STORAGE_ITEMS = 'ADDED_BROWSER_STORAGE_ITEMS';
exports.UPDATE_BROWSER_STORAGE_ITEM = 'UPDATE_BROWSER_STORAGE_ITEM';
exports.browserStorageReducer = function (state, _a) {
    if (state === void 0) { state = []; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case exports.ADDED_BROWSER_STORAGE_ITEMS:
            return payload;
        case exports.UPDATE_BROWSER_STORAGE_ITEM:
            return state.map(function (item) {
                return item.key !== payload.key ? item : Object.assign({}, item, payload);
            });
        default:
            return state;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1zdG9yYWdlLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJicm93c2VyLXN0b3JhZ2UucmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRWEsbUNBQTJCLEdBQUcsNkJBQTZCLENBQUE7QUFDM0QsbUNBQTJCLEdBQUcsNkJBQTZCLENBQUE7QUFFM0QsNkJBQXFCLEdBQUcsVUFBQyxLQUFVLEVBQUUsRUFBZTtJQUEzQixxQkFBVSxHQUFWLFVBQVU7UUFBRyxjQUFJLEVBQUUsb0JBQU87SUFDOUQsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUViLEtBQUssbUNBQTJCO1lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUE7UUFFaEIsS0FBSyxtQ0FBMkI7WUFDOUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO2dCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDM0UsQ0FBQyxDQUFDLENBQUE7UUFFSjtZQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFDaEIsQ0FBQztBQUNILENBQUMsQ0FBQSJ9