import {Component} from '@angular/core'
import {CbsCmp} from '../co-browser-storage/cbs-cmp'
import {CbsModel} from '../co-browser-storage/services/cbs-model'
import 'rxjs/add/operator/find'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-cmp',
  directives: [CbsCmp],
  template: `
    <h2>co-browser-storage example app</h2>
    <br>

    <div class='row'>
      <div class='col-xs-12'>
        <cbs-cmp></cbs-cmp>
      </div>
    </div>
    <strong>debugMode value:</strong>
    {{(debugMode$ | async).value}}
    <br>
    <strong>debugMode && offlineMode truthy:</strong>
    {{debugAndOffline$ | async}}
    <br>
    <strong>debugMode truthy</strong>
    {{debugModeTrue$ | async}}
  `
})
export class AppCmp {
  public debugMode$ = this.cbsModel.getItemByKey('debugMode');
  public debugModeTrue$ = this.cbsModel.truthy('debugMode');
  public debugAndOffline$ = this.cbsModel.truthy(['debugMode', 'offlineMode']);

  constructor (private cbsModel: CbsModel) {}
}
