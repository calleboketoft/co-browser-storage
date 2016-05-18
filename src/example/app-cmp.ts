import {Component} from '@angular/core'
import {CbsCmp} from '../co-browser-storage/cbs-cmp'

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
    <br><br>
  `
})
export class AppCmp {}
