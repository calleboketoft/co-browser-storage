import {Component} from 'angular2/core'
import {CoBrowserStorageModel} from '../co-browser-storage/services/co-browser-storage-model'
import {Store} from '@ngrx/store'

@Component({
  selector: 'third-party-usage-cmp',
  template: `
    <p>Third party cmp</p>
    <button (click)='createItem()'>Create item 'thirdPartyItem'</button>
  `
})
export class ThirdPartyUsageCmp {
  constructor (
    private _store: Store<any>,
    private _coStoreModel: CoBrowserStorageModel
  ) {}

  createItem () {
    this._coStoreModel.createItem({key: 'thirdPartyItem'})
  }
}