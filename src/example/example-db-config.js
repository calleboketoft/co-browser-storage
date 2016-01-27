exports.exampleDbConfig = {
    namespace: 'debugDb',
    initialState: [
        {
            key: 'debugMode',
            default: 'true',
            storageType: 'localStorage',
            valueType: 'text'
        },
        {
            key: 'food',
            default: 'banana',
            storageType: 'sessionStorage',
            valueType: 'text'
        },
        {
            key: 'myPass',
            default: 'secret',
            storageType: 'localStorage',
            valueType: 'password'
        }
    ]
};
//# sourceMappingURL=example-db-config.js.map