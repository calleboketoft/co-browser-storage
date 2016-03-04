"use strict";
exports.ADDED_CO_STORE_ITEMS = 'ADDED_CO_STORE_ITEMS';
exports.ADDED_CO_STORE_ITEM = 'ADDED_CO_STORE_ITEM';
exports.UPDATE_CO_STORE_ITEM = 'UPDATE_CO_STORE_ITEM';
exports.REMOVED_CO_STORE_ITEM = 'REMOVED_CO_STORE_ITEM';
exports.coBrowserStorageReducer = function (state, _a) {
    if (state === void 0) { state = []; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case exports.ADDED_CO_STORE_ITEMS:
            // Set all at once
            return payload;
        case exports.ADDED_CO_STORE_ITEM:
            // create a new array with the previous and new items
            return state.concat([Object.assign({}, payload)]);
        case exports.UPDATE_CO_STORE_ITEM:
            // if it's not the item being updated, just return it,
            // otherwise create a new item for it
            return state.map(function (item) {
                return item.key !== payload.key ?
                    item :
                    Object.assign({}, item, payload); // create copy of it
            });
        case exports.REMOVED_CO_STORE_ITEM:
            // filter out the item to remove
            return state.filter(function (item) {
                return item.key !== payload.key;
            });
        default:
            return state;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY28tYnJvd3Nlci1zdG9yYWdlLXJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjby1icm93c2VyLXN0b3JhZ2UtcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRWEsNEJBQW9CLEdBQUcsc0JBQXNCLENBQUE7QUFDN0MsMkJBQW1CLEdBQUcscUJBQXFCLENBQUE7QUFDM0MsNEJBQW9CLEdBQUcsc0JBQXNCLENBQUE7QUFDN0MsNkJBQXFCLEdBQUcsdUJBQXVCLENBQUE7QUFFL0MsK0JBQXVCLEdBQUcsVUFBQyxLQUFVLEVBQUUsRUFBZTtJQUEzQixxQkFBVSxHQUFWLFVBQVU7UUFBRyxjQUFJLEVBQUUsb0JBQU87SUFDaEUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUViLEtBQUssNEJBQW9CO1lBQ3ZCLGtCQUFrQjtZQUNsQixNQUFNLENBQUMsT0FBTyxDQUFBO1FBRWhCLEtBQUssMkJBQW1CO1lBQ3RCLHFEQUFxRDtZQUNyRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVuRCxLQUFLLDRCQUFvQjtZQUN2QixzREFBc0Q7WUFDdEQscUNBQXFDO1lBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUc7b0JBQzdCLElBQUk7b0JBQ0osTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBLENBQUMsb0JBQW9CO1lBQ3pELENBQUMsQ0FBQyxDQUFBO1FBRUosS0FBSyw2QkFBcUI7WUFDeEIsZ0NBQWdDO1lBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSTtnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQTtZQUNqQyxDQUFDLENBQUMsQ0FBQTtRQUVKO1lBQ0UsTUFBTSxDQUFDLEtBQUssQ0FBQTtJQUNoQixDQUFDO0FBQ0gsQ0FBQyxDQUFBIn0=