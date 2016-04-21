import '../polyfills'

import {Component, Input, ChangeDetectionStrategy} from 'angular2/core'
import {Store} from '@ngrx/store'
import {CbsModel} from './services/cbs-model'
import {StorageListCmp} from './components/storage-list-cmp'
import {NewItemCmp} from './components/new-item-cmp'

@Component({
  selector: 'cbs-cmp',
  template: `
    <div *ngIf='!noRender'>
      <storage-list-cmp
        [cbsReducer]='cbsReducer | async'
        [autosave]='autosave'
        (remove)='cbsModel.removeItem($event)'
        (update)='cbsModel.updateItem($event)'
        (reset)='cbsModel.resetItem($event)'>
      </storage-list-cmp>
      <!-- <br>
        Add temporary item<br>
        <new-item-cmp (create)='cbsModel.createItem($event)'></new-item-cmp>
      </div> -->

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
  directives: [StorageListCmp, NewItemCmp],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CbsCmp {
  @Input() cbsConfig;
  @Input() noRender;
  @Input() autosave = false;
  cbsReducer;

  constructor (
    private store: Store<any>,
    private cbsModel:CbsModel
  ) {
    this.cbsReducer = this.store.select('cbsReducer')
  }

  ngOnInit () {
    this.cbsModel.initialize(this.cbsConfig)
  }

  resetAll () {
    if (confirm('are you sure you want to reset all values to default?')) {
      this.cbsModel.resetAll()
    }
  }
}