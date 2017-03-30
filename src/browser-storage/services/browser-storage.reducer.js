"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=browser-storage.reducer.js.map