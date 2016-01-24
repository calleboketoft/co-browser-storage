developing:

- npm start
- npm run gulp-ts:watch (tsc -p src -w was simply way too slow)

## Usage

```javascript
import {CoDebugManagerCmp} from 'co-browser-db'

let options = {
  namespace: 'debugDb', // variables will be stored under localStorage['debugDb' + '.' + 'myKey']
  initialState: [
    {
      key: 'debugMode', // unique identifier
      default: 'true', // default value, sessionStorage falls back to this
      type: 'boolean', // boolean / string / number (for GUI purpose)
      storageType: 'localStorage' // localStorage / sessionStorage
    }
  ]
}

let coBrowserDb = new CoBrowserDb(options)
```

After initializing the options, the state is stored like this

```javascript
localStorage[namespace + '.' + DB_MEMORY] = JSON.stringify([
  {
    key: 'debugMode',
    value: 'false', // modifications to the schema are persisted
    type: 'boolean',
    storageType: 'localStorage'
  },
  {
    key: 'soundType', // additions are saved
    value: 'frog',
    type: 'string',
    storageType: 'sessionStorage'
  }
])
```
