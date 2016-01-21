export let coBrowserDbConfig = {
  namespace: 'debugDb',
  initialState: [
    {
      key: 'debugMode',
      default: 'true',
      type: 'boolean',
      storageType: 'localStorage'
    },
    {
      key: 'food',
      default: 'banana',
      type: 'string',
      storageType: 'sessionStorage'
    }
  ]
}