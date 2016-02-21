developing:

- npm start
- npm run watch (typescript compilation watcher)

## Usage

- When bootstrapping app, provide the store for the kvps

```javascript
import {coBrowserStorageReducer} from 'co-browser-storage/services/co-browser-storage-reducer'

bootstrap(AppCmp, [
  // initial state is handled when store is initialized
  provideStore({coBrowserStorageReducer: kvpReducer}, {coBrowserStorageReducer: []})
])
```

- Import the component and send in initial state to it to get started.

```javascript
import {CoBrowserStorageCmp} from 'co-browser-storage/co-browser-storage-cmp'

let exampleDbConfig = {
  namespace: 'coBrowserDb', // variables will be stored under localStorage['coBrowserDb' + '.' + 'myUserName']
  initialState: [
    {
      key: 'myUsername', // unique identifier
      default: 'calleboketoft', // default value (used when reset)
      valueType: 'text', // sets input type in the management GUI (for example text/password/number)
      storageType: 'localStorage' // localStorage / sessionStorage
    }
  ]
}

...
template: `<co-browser-storage-cmp [coBrowserStorageConfig]="exampleDbConfig"></co-browser-storage-cmp>`
...
```

The best way to CRUD browser storage items from your app is to use the CoBrowserStorageModel functions

```javascript
import {CoBrowserStorageModel} from 'co-browser-storage/services/co-browser-storage-model'

...
coBrowserStorageModel.saveItem()
```
