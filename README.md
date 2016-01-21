developing:

- npm start
- npm run gulp-ts:watch (tsc -p src -w was simply way too slow)

## Usage

```javascript
import {CoBrowserDb} from 'co-browser-db'

let options = {
  namespace: 'debugDb', // variables will be stored under localStorage['debugDb' + '.' + 'myKey']
  initialState: [
    {
      key: 'debugMode', // unique identifier
      default: 'true', // default value
      type: 'boolean', // boolean / string / number (for GUI purpose)
      storageType: 'localStorage' // localStorage / sessionStorage
    }
  ]
}

let coBrowserDb = new CoBrowserDb(options)
```

After initializing the options, the schema is stored like this

```javascript
localStorage[namespace + '.' + DB_CONFIG] = "{
  SCHEMA: [
    {
      key: 'debugMode',
      default: 'false', // modifications to the schema are persisted
      type: 'boolean',
      storage: 'localStorage'
    },
    {
      key: 'soundType', // additions are saved
      default: 'frog',
      type: 'string',
      storage: 'sessionStorage'
    }
  ]
}"
```
