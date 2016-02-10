exports.ADD_KVP = 'ADD_KVP';
exports.UPDATE_KVP = 'UPDATE_KVP';
exports.REMOVE_KVP = 'REMOVE_KVP';
exports.INIT_KVPS = 'INIT_KVPS';
// Send in initial state here, defaults to an empty array of kvp:s
// Actions come with a type and payload (destructuring second arg to 'type' and 'payload')
exports.coBrowserStorageReducer = function (state, _a) {
    if (state === void 0) { state = []; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case exports.INIT_KVPS:
            // Set all at once
            return payload;
        case exports.ADD_KVP:
            // create a new array with the previous and new kvp:s
            return state.concat([Object.assign({}, payload)]);
        case exports.UPDATE_KVP:
            // if it's not the interesting kvp, just return it,
            // otherwise create a new kvp for it
            return state.map(function (kvp) {
                return kvp.key !== payload.key ?
                    kvp :
                    Object.assign({}, kvp, payload); // create copy of it
            });
        case exports.REMOVE_KVP:
            // filter out the kvp to remove
            return state.filter(function (kvp) {
                return kvp.key !== payload.key;
            });
        default:
            return state;
    }
};

//# sourceMappingURL=co-browser-storage-reducer.js.map
