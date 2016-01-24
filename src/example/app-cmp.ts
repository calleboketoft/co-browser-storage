import {Component} from 'angular2/core'
import {CoDebugManagerCmp} from '../co-debug-manager/co-debug-manager-cmp'
import {exampleDbConfig} from './example-db-config'

@Component({
  selector: 'app-cmp',
  template: `
    <div class="container">
      <h2>co-debug-manager example app</h2>
      <co-debug-manager-cmp [coDebugManagerConfig]="exampleDbConfig"></co-debug-manager-cmp>
    </div>
  `,
  directives: [CoDebugManagerCmp]
})
export class AppCmp {
  private exampleDbConfig = exampleDbConfig
}