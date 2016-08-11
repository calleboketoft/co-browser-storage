"use strict";
var browserStorageConfig = {
    namespace: 'cbs',
    initialState: [],
    DB_CONFIG_KEY: 'CO_BROWSER_DB',
    DB_INITIAL_KEY: 'INITIAL'
};
exports.browserStorageConfig = browserStorageConfig;
function setBrowserStorageConfig(newCbsConfig) {
    Object.assign(browserStorageConfig, newCbsConfig);
}
exports.setBrowserStorageConfig = setBrowserStorageConfig;
//# sourceMappingURL=browser-storage.config.js.map