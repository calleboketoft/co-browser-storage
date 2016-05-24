# co-browser-storage

Manage browser storage variables in a convenient way using ngrx/store. Perfect for:

- debug flags
- feature flags
- base URL configs
- other "hidden" data

## Usage

- `npm install --save co-browser-storage`

Create browser storage config file `my-browser-storage-config.ts` where you specify all your browser storage variables.dme

```javascript
export const NAMESPACE = 'debugDb'
export const DEBUG_MODE = 'debugMode'

export const myBrowserStorageConfig = {
  namespace: NAMESPACE,
  initialState: [
    // List storage variables here
    {
      key: DEBUG_MODE,
      default: 'true',
      storageType: 'localStorage',
      valueType: 'text'
    }
  ]
}
```

Initialize the store and provide the model

```javascript
import {provideStore} from '@ngrx/store'
import {cbsReducer} from 'co-browser-storage/co-browser-storage'
import {
  initialzeCbs,
  getInitialCbsState,
  CbsModel
} from 'co-browser-storage/co-browser-storage'
import {myBrowserStorageConfig} from './my-browser-storage-config'

// initializing puts the config in browser storage immediately
// so the variables can be used by other services right away
initializeCbs(myBrowserStorageConfig)

bootstrap(AppCmp, [
  CbsModel,
  // initial state is handled when store is initialized
  provideStore({
    cbsReducer
  }, {
    cbsReducer: getInitialCbsState()
  })
])
```

Using the GUI component for managing browser storage variables

```javascript
import {CbsCmp} from 'co-browser-storage/co-browser-storage'

@Component({
  directives: [CbsCmp],
  template: `
    <cbs-cmp></cbs-cmp>
  `
})
export class AppComponent {}
```

## Get, set, and delete values

Use functions on cbs model to make use of @ngrx/store

```javascript
import {CbsModel} from 'co-browser-storage/co-browser-storage'

...
cbsModel.getItemByKey()
cbsModel.createItem()
cbsModel.removeItem()
cbsModel.updateItem()

cbsModel.allTrue(['key1', 'key2']) // find out if all are truthy
```

## Developing

- npm start
- npm run watch (typescript compilation watcher)