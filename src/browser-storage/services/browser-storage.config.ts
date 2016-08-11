let browserStorageConfig = {
  namespace: 'cbs',
  initialState: [],
  DB_CONFIG_KEY: 'CO_BROWSER_DB',
  DB_INITIAL_KEY: 'INITIAL'
}

function setBrowserStorageConfig (newCbsConfig) {
  Object.assign(browserStorageConfig, newCbsConfig)
}

export {
  browserStorageConfig,
  setBrowserStorageConfig
}
