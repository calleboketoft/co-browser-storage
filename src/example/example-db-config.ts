export const NAMESPACE = 'cbsExample'
export const DEBUG_MODE = 'debugMode'
export const DEBUG_XHR = 'debugXhr'
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
      key: DEBUG_XHR,
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