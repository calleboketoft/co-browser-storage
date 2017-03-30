"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAMESPACE = 'cbsExample';
exports.DEBUG_MODE = 'debugMode';
exports.OFFLINE_MODE = 'offlineMode';
exports.MY_PASS = 'myPass';
exports.HIDDEN_ITEM = 'hiddenItem';
exports.SESSION_ITEM = 'sessionItem';
exports.exampleDbConfig = {
    namespace: exports.NAMESPACE,
    initialState: [
        {
            key: exports.DEBUG_MODE,
            value: 'true',
            storageType: 'localStorage',
            valueType: 'text'
        },
        {
            key: exports.OFFLINE_MODE,
            value: 'true',
            storageType: 'localStorage',
            valueType: 'text'
        },
        {
            key: exports.MY_PASS,
            value: 'secret',
            storageType: 'localStorage',
            valueType: 'password'
        },
        {
            key: exports.HIDDEN_ITEM,
            value: 'notInUi',
            storageType: 'localStorage',
            valueType: 'text'
        },
        {
            key: exports.SESSION_ITEM,
            value: 'default session value',
            storageType: 'sessionStorage',
            valueType: 'text'
        }
    ]
};
//# sourceMappingURL=example-db.config.js.map