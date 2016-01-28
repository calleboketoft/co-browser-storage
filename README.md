developing:

- npm start
- npm run gulp-ts:watch (tsc -p src -w was simply way too slow)

## Usage

- When bootstrapping app, provide the store for the kvps

```javascript
bootstrap(AppCmp, [
  // initial state is handled when store is initialized
  provideStore({kvps: kvpReducer}, {kvps: []})
])
```

- Import the component and send in initial state to it to get started.

```javascript
import {CoDebugManagerCmp} from 'co-debug-manager'

let exmapleDbConfig = {
  namespace: 'debugDb', // variables will be stored under localStorage['debugDb' + '.' + 'myKey']
  initialState: [
    {
      key: 'debugMode', // unique identifier
      default: 'true', // default value, sessionStorage falls back to this
      valueType: 'boolean', // text / password (simply hides passwords from GUI)
      storageType: 'localStorage' // localStorage / sessionStorage
    }
  ]
}

...
template: `<co-debug-manager-cmp [coDebugManagerConfig]="exampleDbConfig"></co-debug-manager-cmp>`
...
```
