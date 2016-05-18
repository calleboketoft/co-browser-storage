import '../polyfills'

import {Component, Input, ChangeDetectionStrategy} from '@angular/core'
import {Store} from '@ngrx/store'
import {CbsModel} from './services/cbs-model'
import {StorageListCmp} from './components/storage-list-cmp'

@Component({
  selector: 'cbs-cmp',
  template: `
    <div *ngIf='!noRender'>
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
  `,
  directives: [StorageListCmp],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CbsCmp {
  @Input() noRender;
  @Input() autosave = false;
  cbsReducer;

  constructor (
    private store: Store<any>,
    private cbsModel: CbsModel
  ) {
    this.cbsReducer = this.store.select('cbsReducer')
  }

  resetAll () {
    if (confirm('are you sure you want to reset all values to default?')) {
      this.cbsModel.resetAll()
    }
  }
}