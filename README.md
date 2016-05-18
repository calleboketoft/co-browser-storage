# co-browser-storage

## Usage

- `npm install --save co-browser-storage`

When bootstrapping app, provide the store for the storage items

```javascript
import {provideStore} from '@ngrx/store'
import {cbsReducer} from 'co-browser-storage/co-browser-storage'
import {setCbsConfig, CoBrowserModel} from 'co-browser-storage/co-browser-storage'
import {browserStorageConfig} from './browser-storage-config'

setCbsConfig(browserStorageConfig)

bootstrap(AppCmp, [
  CoBrowserModel,
  // initial state is handled when store is initialized
  provideStore({cbsReducer}, {cbsReducer: []})
])
```

Import the component, provide model, and send in initial configuration

```javascript
import {CbsCmp} from 'co-browser-storage/co-browser-storage'

// Component providers need to provide the model
@Component({
  directives: [CbsCmp],
  template: `
    <cbs-cmp></cbs-cmp>
  `
})
export class AppComponent {
  exampleDbConfig = {
    namespace: 'coBrowserDb', // variables will be stored under localStorage['coBrowserDb' + '.' + 'myUserName']
    initialState: [
      {
        key: 'myUsername', // unique identifier
        default: 'calleboketoft', // default value (used when resetting or clearing browser storage)
        valueType: 'text', // sets input type in the management GUI (for example text/password/number)
        storageType: 'localStorage' // localStorage / sessionStorage
      }
    ]
  }
}
```

## Get, set, and delete values

The best way to use browser storage items from your app is to use the CoBrowserStorageModel functions

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