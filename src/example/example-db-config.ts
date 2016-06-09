export const NAMESPACE = 'cbsExample'
export const DEBUG_MODE = 'debugMode'
export const OFFLINE_MODE = 'offlineMode'
export const MY_PASS = 'myPass'

export const exampleDbConfig = {
  namespace: NAMESPACE,
  initialState: [
    {
      key: DEBUG_MODE,
      default: 'true',
      storageType: 'localStorage',
      valueType: 'text'
    },
    {
      key: OFFLINE_MODE,
      default: 'true',
      storageType: 'localStorage',
      valueType: 'text'
    },
    {
      key: MY_PASS,
      default: 'secret',
      storageType: 'localStorage',
      valueType: 'password'
    }
  ]
}