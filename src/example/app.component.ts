import {Component} from '@angular/core'
import {CbsComponent} from '../co-browser-storage/cbs.component'
import {CbsModel} from '../co-browser-storage/services/cbs.model'
import {
  DEBUG_MODE,
  OFFLINE_MODE,
  MY_PASS
} from './example-db.config'

@Component({
  selector: 'app-cmp',
  directives: [CbsComponent],
  template: `
    <h2>co-browser-storage example app</h2>
    <br>

    <cbs-cmp
      [itemsToShow]='itemsToShow'>
    </cbs-cmp>

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
  public debugMode$ = this.cbsModel.getItemByKey(DEBUG_MODE);
  public debugModeTrue$ = this.cbsModel.truthy(DEBUG_MODE);
  public debugAndOffline$ = this.cbsModel.truthy([DEBUG_MODE, OFFLINE_MODE]);
  public itemsToShow = [
    DEBUG_MODE,
    OFFLINE_MODE,
    MY_PASS
  ]

  constructor (private cbsModel: CbsModel) {}
}
