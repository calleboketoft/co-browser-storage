let cbsConfig = {
  namespace: 'cbs',
  initialState: [],
  DB_CONFIG_KEY: 'CO_BROWSER_DB',
  DB_INITIAL_KEY: 'INITIAL'
}

function setCbsConfig (newCbsConfig) {
  Object.assign(cbsConfig, newCbsConfig)
}

export {
  cbsConfig,
  setCbsConfig
}