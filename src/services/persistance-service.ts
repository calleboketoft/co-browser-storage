import {Injectable} from 'angular2/core'

@Injectable()
export class PersistanceService {
  private DB_CONFIG_NAME = 'CO_BROWSER_DB_CONFIG';
  private options;

  // Initialize
  // ----------
  initialize (options) {
    this.options = options
    var currStateStr = localStorage[options.namespace]
    if (typeof currStateStr === 'undefined') {
      // there is no current state stored, initialize from scratch
      this.initFromScratch (options)
    } else {
      // a current state is existing, validate against schema
      this.initExisting (options.namespace, currStateStr)
    }

    // Initialization will set defaults for missing keys etc, so the state
    // might have been updated
    var stateAfterInitStr = localStorage[options.namespace + '.' + this.DB_CONFIG_NAME]
    var stateAfterInitJson = JSON.parse(stateAfterInitStr)
    return stateAfterInitJson
  }

  // Validate each existing item from storage against the schema
  initExisting (namespace, currStateStr) {
    var currStateJson = JSON.parse(currStateStr)
    currStateJson.DB_CONFIG.SCHEMA.forEach((schemaItem) => {
      var storageItem = window[schemaItem.storageType][namespace][schemaItem.key]
      if (typeof storageItem === 'undefined') {
        // the item doesn't exist at all, set it
        window[schemaItem.storageType][namespace][schemaItem.key] = schemaItem.default
      }
    })
  }

  // Initialize the storage from scratch
  initFromScratch (options) {
    options.initialState.forEach((schemaItem) => {
      window[schemaItem.storageType][options.namespace + '.' + schemaItem.key] = schemaItem.default
    })
    let initialStateStr = JSON.stringify(options.initialState)
    window.localStorage[this.options.namespace + '.' + this.DB_CONFIG_NAME] = initialStateStr
  }

  // Save state
  // -------------
  saveState (stateArr) {
    // Save all items like window.localStorage['coBrowserNamespace.myKey'] = 'my value'
    stateArr.forEach((stateItem) => {
      window[stateItem.storageType][this.options.namespace + '.' + stateItem.key] = stateItem.default
    })

    // serialize the whole state
    window.localStorage[this.options.namespace + '.' + this.DB_CONFIG_NAME] = JSON.stringify(stateArr)
  }
}
