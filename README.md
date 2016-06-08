# co-browser-storage

Manage browser storage variables in a convenient way using ngrx/store. Perfect for:

- debug flags
- feature flags
- base URL configs
- other "hidden" data

## Try the example


## Usage

- `npm install --save co-browser-storage`

Create browser storage config file `my-browser-storage-config.ts` where you specify all your browser storage variables.

```javascript
export const NAMESPACE = 'myBrowserStore'
export const DEBUG_MODE = 'debugMode'

export const myBrowserStorageConfig = {
  namespace: NAMESPACE,
  initialState: [
    // List storage variables here
    {
      key: DEBUG_MODE,
      default: 'on',
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

initializeCbs(myBrowserStorageConfig)

bootstrap(AppCmp, [
  CbsModel,
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

## Get value using CbsModel
```javascript
import {CbsModel} from 'co-browser-storage/co-browser-storage'
...
let debugMode$ = cbsModel.getItemByKey('debugMode')
```

## Get value using store directly

```javascript
import {Store} from '@ngrx/store'
...
let cbsReducer$ = store.select('cbsReducer')
let debugMode$ = cbsReducer$.map(cbs => cbs.find(i => i.key === 'debugMode'))
```

## Update value

```javascript
import {CbsModel} from 'co-browser-storage/co-browser-storage'
...
cbsModel.updateItem({
  key: 'debugMode',
  value: 'off'
})
```

## Developing

- npm start
- npm run watch (typescript compilation watcher)
