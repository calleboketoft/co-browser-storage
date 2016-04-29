"use strict";
exports.ADDED_CBS_ITEMS = 'ADDED_CBS_ITEMS';
exports.UPDATE_CBS_ITEM = 'UPDATE_CBS_ITEM';
exports.cbsReducer = function (state, _a) {
    if (state === void 0) { state = []; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case exports.ADDED_CBS_ITEMS:
            return payload;
        case exports.UPDATE_CBS_ITEM:
            return state.map(function (item) {
                return item.key !== payload.key ? item : Object.assign({}, item, payload);
            });
        default:
            return state;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2JzLXJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYnMtcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRWEsdUJBQWUsR0FBRyxpQkFBaUIsQ0FBQTtBQUNuQyx1QkFBZSxHQUFHLGlCQUFpQixDQUFBO0FBRW5DLGtCQUFVLEdBQUcsVUFBQyxLQUFVLEVBQUUsRUFBZTtJQUEzQixxQkFBVSxHQUFWLFVBQVU7UUFBRyxjQUFJLEVBQUUsb0JBQU87SUFDbkQsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUViLEtBQUssdUJBQWU7WUFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQTtRQUVoQixLQUFLLHVCQUFlO1lBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQzNFLENBQUMsQ0FBQyxDQUFBO1FBRUo7WUFDRSxNQUFNLENBQUMsS0FBSyxDQUFBO0lBQ2hCLENBQUM7QUFDSCxDQUFDLENBQUEifQ==