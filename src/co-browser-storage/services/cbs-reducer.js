"use strict";
exports.ADDED_CBS_ITEMS = 'ADDED_CBS_ITEMS';
exports.ADDED_CBS_ITEM = 'ADDED_CBS_ITEM';
exports.UPDATE_CBS_ITEM = 'UPDATE_CBS_ITEM';
exports.REMOVED_CBS_ITEM = 'REMOVED_CBS_ITEM';
exports.cbsReducer = function (state, _a) {
    if (state === void 0) { state = []; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case exports.ADDED_CBS_ITEMS:
            // Set all at once
            return payload;
        case exports.ADDED_CBS_ITEM:
            // create a new array with the previous and new items
            return state.concat([Object.assign({}, payload)]);
        case exports.UPDATE_CBS_ITEM:
            // if it's not the item being updated, just return it,
            // otherwise create a new item for it
            return state.map(function (item) {
                return item.key !== payload.key ?
                    item :
                    Object.assign({}, item, payload); // create copy of it
            });
        case exports.REMOVED_CBS_ITEM:
            // filter out the item to remove
            return state.filter(function (item) {
                return item.key !== payload.key;
            });
        default:
            return state;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLXJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYnMtcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRWEsdUJBQWUsR0FBRyxpQkFBaUIsQ0FBQTtBQUNuQyxzQkFBYyxHQUFHLGdCQUFnQixDQUFBO0FBQ2pDLHVCQUFlLEdBQUcsaUJBQWlCLENBQUE7QUFDbkMsd0JBQWdCLEdBQUcsa0JBQWtCLENBQUE7QUFFckMsa0JBQVUsR0FBRyxVQUFDLEtBQVUsRUFBRSxFQUFlO0lBQTNCLHFCQUFVLEdBQVYsVUFBVTtRQUFHLGNBQUksRUFBRSxvQkFBTztJQUNuRCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWIsS0FBSyx1QkFBZTtZQUNsQixrQkFBa0I7WUFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQTtRQUVoQixLQUFLLHNCQUFjO1lBQ2pCLHFEQUFxRDtZQUNyRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVuRCxLQUFLLHVCQUFlO1lBQ2xCLHNEQUFzRDtZQUN0RCxxQ0FBcUM7WUFDckMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO2dCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRztvQkFDN0IsSUFBSTtvQkFDSixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUEsQ0FBQyxvQkFBb0I7WUFDekQsQ0FBQyxDQUFDLENBQUE7UUFFSixLQUFLLHdCQUFnQjtZQUNuQixnQ0FBZ0M7WUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFBO1lBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBRUo7WUFDRSxNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2hCLENBQUM7QUFDSCxDQUFDLENBQUEifQ==