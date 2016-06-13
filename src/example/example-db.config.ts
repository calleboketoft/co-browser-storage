export const NAMESPACE = 'cbsExample'
export const DEBUG_MODE = 'debugMode'
export const OFFLINE_MODE = 'offlineMode'
export const MY_PASS = 'myPass'

export const exampleDbConfig = {
  namespace: NAMESPACE,
  initialState: [
    {
      key: DEBUG_MODE,
      value: 'true',
      storageType: 'localStorage',
      valueType: 'text'
    },
    {
      key: OFFLINE_MODE,
      value: 'true',
      storageType: 'localStorage',
      valueType: 'text'
    },
    {
      key: MY_PASS,
      value: 'secret',
      storageType: 'localStorage',
      valueType: 'password'
    }
  ]
}