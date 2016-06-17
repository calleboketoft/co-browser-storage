# co-browser-storage

Manage browser storage variables in a convenient way using Angular 2 and @ngrx/store.

## Try the example
- `npm install`
- `npm run build`
- `npm start`
- navigate to http://localhost:3010

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
      value: 'true',
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

Only show selected items in GUI

```html
<cbs-cmp [itemsToShow]="['debugMode', 'otherItem']"></cbs-cmp>
```

## Get value

```javascript
import {CbsModel} from 'co-browser-storage/co-browser-storage'
...
let debugMode$ = cbsModel.getItemByKey('debugMode')
```

Or using store directly

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
  value: 'false'
})

// Multiple at once
cbsModel.updateItems([
  {
    key: 'debugMode',
    value: 'false'
  },
  {
    key: 'otherItem',
    value: 'otherValue'
  }
])

```

## Get boolean true if value is 'true'

```javascript
import {CbsModel} from 'co-browser-storage/co-browser-storage'
...
// cbsModel.truthy takes a string or an array of strings
let isDebugMode$ = cbsModel.truthy('debugMode')
```

## Developing

- npm start
- npm run watch (typescript compilation watcher)
