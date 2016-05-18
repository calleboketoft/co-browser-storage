let cbsConfig = {
  namespace: 'cbs',
  initialState: [],
  DB_CONFIG_KEY: 'CO_BROWSER_DB',
  DB_MEMORY_KEY: 'MEMORY_STATE',
  DB_INITIAL_KEY: 'INITIAL_SCHEMA'
}

function setCbsConfig (newCbsConfig) {
  Object.assign(cbsConfig, newCbsConfig)
}

export {
  cbsConfig,
  setCbsConfig
}