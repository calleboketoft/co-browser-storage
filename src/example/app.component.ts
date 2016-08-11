import { Component } from '@angular/core'
import { BrowserStorageModel } from '../browser-storage/services/browser-storage.model'
import {
  DEBUG_MODE,
  OFFLINE_MODE,
  MY_PASS,
  SESSION_ITEM
} from './example-db.config'

@Component({
  selector: 'app',
  template: `
    <h2>browser-storage example app</h2>
    <br>

    <browser-storage-manager
      [itemsToShow]='itemsToShow'
      [showResetAll]='true'>
    </browser-storage-manager>

    <p>
      <strong>debugMode value:</strong>
      {{(debugMode$ | async).value}}
    </p>
    <p>
      <strong>debugMode && offlineMode truthy:</strong>
      {{debugAndOffline$ | async}}
    </p>
    <p>
      <strong>debugMode truthy</strong>
      {{debugModeTrue$ | async}}
    </p>
  `
})
export class AppComponent {
  public debugMode$ = this.browserStorageModel.getItemByKey(DEBUG_MODE);
  public debugModeTrue$ = this.browserStorageModel.truthy(DEBUG_MODE);
  public debugAndOffline$ = this.browserStorageModel.truthy([DEBUG_MODE, OFFLINE_MODE]);
  public itemsToShow = [
    DEBUG_MODE,
    OFFLINE_MODE,
    MY_PASS,
    SESSION_ITEM
  ]

  constructor (private browserStorageModel: BrowserStorageModel) {}
}
