export const NAMESPACE = 'cbsExample'

export const DEBUG_MODE = 'debugMode'
export const OFFLINE_MODE = 'offlineMode'
export const MY_PASS = 'myPass'
export const HIDDEN_ITEM = 'hiddenItem'
export const SESSION_ITEM = 'sessionItem'

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
    },
    {
      key: HIDDEN_ITEM,
      value: 'notInUi',
      storageType: 'localStorage',
      valueType: 'text'
    },
    {
      key: SESSION_ITEM,
      value: 'default session value',
      storageType: 'sessionStorage',
      valueType: 'text'
    }
  ]
}