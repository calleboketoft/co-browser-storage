# ng2-browser-storage

Manage browser storage variables in a convenient way using Angular 2 and @ngrx/store.

## Try the example
- `npm install`
- `npm run build`
- `npm start`
- navigate to http://localhost:3010

## Usage

- `npm install --save @calle/ng2-browser-storage`

Create browser storage config file `my-browser-storage.config.ts` where you specify all your browser storage variables.

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
import {
  browserStorageReducer,
  initializeBrowserStorage,
  getInitialBrowserStorageState,
  BrowserStorageModule
} from '@calle/ng2-browser-storage/browser-storage'

// Populate localStorage and sessionStorage before Angular 2 starts up
initializeBrowserStorage(myBrowserStorageConfig)

@NgModule({
  imports: [BrowserStorageModule],
  providers: [
    provideStore({
      browserStorageReducer
    }, {
      browserStorageReducer: getInitialBrowserStorageState()
    })
  ]
})
```

Using the GUI component for managing browser storage variables

```html
  <browser-storage-manager></browser-storage-manager>
```

Only show selected items in GUI and show reset-all button

```html
<browser-storage-manager
  [itemsToShow]="['debugMode', 'otherItem']"
  [showResetAll="true">
</browser-storage-manager>
```

## Get value

```javascript
import {BrowserStorageModel} from '@calle/ng2-browser-storage/browser-storage'
...
let debugMode$ = browserStorageModel.getItemByKey('debugMode')
```

Or using store directly

```javascript
import {Store} from '@ngrx/store'
...
let browserStorageReducer$ = store.select('browserStorageReducer')
let debugMode$ = browserStorageReducer$
  .map(cbs => cbs.find(i => i.key === 'debugMode'))
```

## Update value

```javascript
import {BrowserStorageModel} from '@calle/ng2-browser-storage/browser-storage'
...
browserStorageModel.updateItem({
  key: 'debugMode',
  value: 'false'
})

// Multiple at once
browserStorageModel.updateItems([
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
// cbsModel.truthy takes a string or an array of strings
let isDebugMode$ = browserStorageModel.truthy('debugMode')
```

## Developing

- npm start
- npm run watch (typescript compilation watcher)
