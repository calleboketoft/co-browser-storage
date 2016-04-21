import {Component} from 'angular2/core'
import {CbsCmp} from '../co-browser-storage/cbs-cmp'
import {exampleDbConfig} from './example-db-config'
import {ThirdPartyUsageCmp} from './third-party-usage-cmp'
import {CbsModel} from '../co-browser-storage/services/cbs-model'

@Component({
  selector: 'app-cmp',
  template: `
    <div class='container'>
      <h2>co-browser-storage example app</h2>
      <br><br>
      <cbs-cmp
        [cbsConfig]='exampleDbConfig'
        [autosave]='true'>
      </cbs-cmp>
    </div>
    <hr>
    <br>
    <third-party-usage-cmp
      [thirdPartyItem]='_thirdPartyItem | async'>
    </third-party-usage-cmp>
  `,
  directives: [CbsCmp, ThirdPartyUsageCmp],
  providers: [CbsModel]
})
export class AppCmp {
  private exampleDbConfig = exampleDbConfig;
  private _thirdPartyItem;
  constructor (private _cbsModel: CbsModel) {
    this._thirdPartyItem = _cbsModel.getItemByKey('thirdPartyItem')
  }
}
