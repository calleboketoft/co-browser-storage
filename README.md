# co-browser-storage

## Usage

- `npm install --save co-browser-storage`

When bootstrapping app, provide the store for the storage items

```javascript
import {coBrowserStorageReducer} from 'co-browser-storage/services/co-browser-storage-reducer'

bootstrap(AppCmp, [
  // initial state is handled when store is initialized
  provideStore({coBrowserStorageReducer}, {coBrowserStorageReducer: []})
])
```

Import the component, provide model, and send in initial configuration

```javascript
import {CoBrowserStorageCmp} from 'co-browser-storage/co-browser-storage-cmp'
import {CoBrowserStorageModel} from 'co-browser-storage/services/co-browser-storage-model'

// Component providers need to provide the model
@Component({
  providers: [CoBrowserStorageModel],
  directives: [CoBrowserStorageCmp],
  template: `
    <co-browser-storage-cmp
      [noRender]='false'
      [coBrowserStorageConfig]="exampleDbConfig">
    </co-browser-storage-cmp>
  ` // Set [noRender]='true' to just initialise the component (sure, it's a hack)
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
import {CoBrowserStorageModel} from 'co-browser-storage/services/co-browser-storage-model'

...
coBrowserStorageModel.getItemByKey()
coBrowserStorageModel.createItem()
coBrowserStorageModel.removeItem()
coBrowserStorageModel.updateItem()

coBrowserStorageModel.allTrue(['key1', 'key2']) // find out if all are truthy
```

## Developing

- npm start
- npm run watch (typescript compilation watcher)