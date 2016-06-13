import '../polyfills'

import {Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'
import {CbsModel} from './services/cbs.model'
import {StorageListComponent} from './components/storage-list.component'

@Component({
  selector: 'cbs-cmp',
  directives: [StorageListComponent],
  template: `
    <div>
      <storage-list-cmp
        [cbsReducer]='cbsReducer$ | async'
        (updateItem)='cbsModel.updateItem($event)'
        (resetItem)='cbsModel.resetItem($event)'>
      </storage-list-cmp>

      <div class='row'>
        <!-- match button position -->
        <div class='col-lg-9 col-xs-8'>
        </div>
        <div class='col-lg-3 col-xs-4'>
          <button class='btn btn-warning' (click)='resetAll()'>
            Reset all
          </button>
        </div>
      </div>
    </div>
  `
})
export class CbsCmp {
  public cbsReducer$ = this.store.select('cbsReducer');

  constructor (
    private store: Store<any>,
    private cbsModel: CbsModel
  ) {}

  public resetAll () {
    if (confirm('are you sure you want to reset all values to default?')) {
      this.cbsModel.resetAll()
    }
  }
}