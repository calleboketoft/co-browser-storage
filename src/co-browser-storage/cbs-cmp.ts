import '../polyfills'

import {Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'
import {CbsModel} from './services/cbs-model'
import {StorageListCmp} from './components/storage-list-cmp'

@Component({
  selector: 'cbs-cmp',
  directives: [StorageListCmp],
  template: `
    <div>
      <storage-list-cmp
        [cbsReducer]='cbsReducer | async'
        [autosave]='autosave'
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
  @Input() autosave = false;
  public cbsReducer;

  constructor (
    private store: Store<any>,
    private cbsModel: CbsModel
  ) {
    this.cbsReducer = this.store.select('cbsReducer')
  }

  public resetAll () {
    if (confirm('are you sure you want to reset all values to default?')) {
      this.cbsModel.resetAll()
    }
  }
}