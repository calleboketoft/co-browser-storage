import {Component} from 'angular2/core'
import {CoBrowserStorageCmp} from '../co-browser-storage/co-browser-storage-cmp'
import {exampleDbConfig} from './example-db-config'
import {ThirdPartyUsageCmp} from './third-party-usage-cmp'
import {CoBrowserStorageModel} from '../co-browser-storage/services/co-browser-storage-model'

@Component({
  selector: 'app-cmp',
  template: `
    <div class='container'>
      <h2>co-browser-storage example app</h2>
      <co-browser-storage-cmp
        [coBrowserStorageConfig]='exampleDbConfig'>
      </co-browser-storage-cmp>
    </div>
    <hr>
    <br>
    <third-party-usage-cmp></third-party-usage-cmp>
  `,
  directives: [CoBrowserStorageCmp, ThirdPartyUsageCmp],
  providers: [CoBrowserStorageModel]
})
export class AppCmp {
  private exampleDbConfig = exampleDbConfig
}