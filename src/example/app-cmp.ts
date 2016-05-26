import {Component} from '@angular/core'
import {CbsCmp} from '../co-browser-storage/cbs-cmp'
import {Store} from '@ngrx/store'
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
    <br><br>
  `
})
export class AppCmp {
  private cbsReducer$ = this.store.select('cbsReducer')
  constructor (private store: Store<any>) {
    this.cbsReducer$
      .map(cbsItems => cbsItems['find'](i => i.key === 'debugMode'))
      .subscribe(debugMode => {
        console.log(debugMode.value)
      })

  }
}
