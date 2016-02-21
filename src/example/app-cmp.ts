import {Component} from 'angular2/core'
import {CoBrowserStorageCmp} from '../co-browser-storage/co-browser-storage-cmp'
import {exampleDbConfig} from './example-db-config'

@Component({
  selector: 'app-cmp',
  template: `
    <div class='container'>
      <h2>co-browser-storage example app</h2>
      <co-browser-storage-cmp
        [coBrowserStorageConfig]='exampleDbConfig'>
      </co-browser-storage-cmp>
    </div>
  `,
  directives: [CoBrowserStorageCmp]
})
export class AppCmp {
  private exampleDbConfig = exampleDbConfig
}