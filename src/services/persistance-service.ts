import {Injectable} from 'angular2/core'

@Injectable()
export class PersistanceService {
  private DB_MEMORY = 'CO_BROWSER_DB_MEMORY';
  private options;

  // Initialize
  // ----------
  initialize (options) {
    this.options = options
    var memoryState = localStorage[options.namespace + '.' + this.DB_MEMORY]
    if (typeof memoryState === 'undefined') {
      // there is no current state stored, initialize from scratch
      this.initFromScratch (options)
    } else {
      // a current state is existing, validate against schema
      this.initExisting (options.namespace, memoryState)
    }

    // Initialization will set defaults for missing keys etc, so the state
    // might have been updated
    var stateAfterInitStr = localStorage[options.namespace + '.' + this.DB_MEMORY]
    var stateAfterInitJson = JSON.parse(stateAfterInitStr)
    return stateAfterInitJson
  }

  // Validate each existing item from storage against the schema
  initExisting (namespace, memoryState) {
    var memoryStateJson = JSON.parse(memoryState)
    let actualMemory = memoryStateJson.map((memoryItem) => {
      var storageItem = window[memoryItem.storageType][namespace + '.' + memoryItem.key]
      if (typeof storageItem === 'undefined') {
        // the item doesn't exist at all, set it
        window[memoryItem.storageType][namespace + '.' + memoryItem.key] = memoryItem.value
        return memoryItem
      } else {
        let actualValue = window[memoryItem.storageType][namespace + '.' + memoryItem.key]
        if (actualValue === memoryItem.value) {
          // the value has not been touched outside of this GUI
          return memoryItem
        } else {
          // the value has been manually modified by a user
          return {
            key: memoryItem.key,
            value: actualValue,
            type: memoryItem.value, // TODO: If someone manually modified the value, the type
                                    // might no longer match...
            storageType: memoryItem.storageType
          }
        }
      }
    })
    let actualMemoryStr = JSON.stringify(actualMemory)
    window.localStorage[this.options.namespace + '.' + this.DB_MEMORY] = actualMemoryStr
  }

  // Initialize the storage from scratch
  initFromScratch (options) {
    let stateForMemory = options.initialState.map((schemaItem) => {
      window[schemaItem.storageType][options.namespace + '.' + schemaItem.key] = schemaItem.default
      return {
        key: schemaItem.key,
        value: schemaItem.default,
        type: schemaItem.type,
        storageType: schemaItem.storageType
      }
    })
    let stateForMemoryStr = JSON.stringify(stateForMemory)
    window.localStorage[this.options.namespace + '.' + this.DB_MEMORY] = stateForMemoryStr
  }

  // Save state
  // -------------
  saveState (stateArr) {
    // Save all items like window.localStorage['coBrowserNamespace.myKey'] = 'my value'
    let that = this // how come this is needed?
    stateArr.forEach((stateItem) => {
      window[stateItem.storageType][that.options.namespace + '.' + stateItem.key] = stateItem.value
    })

    // serialize the whole state and save under localStorage[DB_MEMORY]
    window.localStorage[this.options.namespace + '.' + this.DB_MEMORY] = JSON.stringify(stateArr)
  }
}
