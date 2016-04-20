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
        (remove)='cbsModel.removeItem($event)'
        (update)='cbsModel.updateItem($event)'
        (reset)='cbsModel.resetItem($event)'>
      </storage-list-cmp>
      <!-- <br>
        Add temporary item<br>
        <new-item-cmp (create)='cbsModel.createItem($event)'></new-item-cmp>
      </div> -->
    </div>
  `,
  directives: [StorageListCmp, NewItemCmp],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CbsCmp {
  @Input() cbsConfig;
  @Input() noRender;
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
}