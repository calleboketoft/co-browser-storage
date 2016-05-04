import {Component} from '@angular/core'
import {CbsCmp} from '../co-browser-storage/cbs-cmp'
import {exampleDbConfig} from './example-db-config'
import {CbsModel} from '../co-browser-storage/services/cbs-model'

@Component({
  selector: 'app-cmp',
  template: `
    <h2>co-browser-storage example app</h2>
    <br>

    <div class='row'>
      <div class='col-xs-12 col-xl-6'>
        <h3>Manual save</h3>
        <br>
        <cbs-cmp
          [cbsConfig]='exampleDbConfig'>
        </cbs-cmp>
      </div>
      <div class='col-xs-12 col-xl-6' style='border-left: 1px solid #E0E0E0;'>
        <h3>Auto save</h3>
        <br>
        <cbs-cmp
          [cbsConfig]='exampleDbConfig'
          [autosave]='true'>
        </cbs-cmp>
      </div>
    </div>
    <br><br>
  `,
  directives: [CbsCmp],
  providers: [CbsModel]
})
export class AppCmp {
  private exampleDbConfig = exampleDbConfig;
}
