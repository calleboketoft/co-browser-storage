import '../polyfills'

import {Component, Input, ChangeDetectionStrategy} from 'angular2/core'
import {Store} from '@ngrx/store'
import {CoBrowserStorageModel} from './services/co-browser-storage-model'
import {StorageListCmp} from './components/storage-list-cmp'
import {NewItemCmp} from './components/new-item-cmp'

@Component({
  selector: 'co-browser-storage-cmp',
  template: `
    <div *ngIf='!noRender'>
      <h4>co-browser-storage</h4>
      <storage-list-cmp
        [coBrowserStorageReducer]='coBrowserStorageReducer | async'
        (remove)='coStoreModel.removeItem($event)'
        (update)='coStoreModel.updateItem($event)'
        (reset)='coStoreModel.resetItem($event)'>
      </storage-list-cmp>
      <br>
      <div *ngIf='false'><!-- skip for now -->
        Add temporary item<br>
        <new-item-cmp (create)='coStoreModel.createItem($event)'></new-item-cmp>
      </div>
    </div>
  `,
  directives: [StorageListCmp, NewItemCmp],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoBrowserStorageCmp {
  @Input() coBrowserStorageConfig;
  @Input() noRender;
  coBrowserStorageReducer;

  constructor (
    private store: Store<any>,
    private coStoreModel:CoBrowserStorageModel
  ) {
    this.coBrowserStorageReducer = this.store.select('coBrowserStorageReducer')
  }

  ngOnInit () {
    this.coStoreModel.initialize(this.coBrowserStorageConfig)
  }
}