import {Component, Input} from 'angular2/core'
import {CoBrowserStorageModel} from '../co-browser-storage/services/co-browser-storage-model'
import {Store} from '@ngrx/store'

@Component({
  selector: 'third-party-usage-cmp',
  template: `
    <p>Third party cmp</p>
    <button (click)='_createItem()'>Create item 'thirdPartyItem'</button>
    <span style='color: blue;' (click)='_logItem()'>{{thirdPartyItem ? thirdPartyItem.key : 'item missing'}}</span>
  `
})
export class ThirdPartyUsageCmp {
  @Input() thirdPartyItem;
  constructor (
    private _store: Store<any>,
    private _coStoreModel: CoBrowserStorageModel
  ) {}

  private _createItem () {
    this._coStoreModel.createItem({key: 'thirdPartyItem'})
  }

  private _logItem () {
    console.log(this.thirdPartyItem)
  }
}