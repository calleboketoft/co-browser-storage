import {Component, ChangeDetectionStrategy} from 'angular2/core'
import {Store} from '@ngrx/store'

import * as KvpActions from './services/kvp-reducer'

import {PersistanceService} from './services/persistance-service'
import {coBrowserDbConfig} from './co-browser-db.config'
import {StorageListCmp} from './components/storage-list-cmp'
import {NewItemCmp} from './components/new-item-cmp'

@Component({
  selector: 'app',
  template: `
    <div class="container">
      <new-item-cmp (create)="addKvp($event)"></new-item-cmp>

      <h3>List</h3>
      <storage-list-cmp
        [kvps]="kvps | async"
        (removeEventFromItemList)="removeKvp($event)"
        (update)="updateKvp($event)">
      </storage-list-cmp>
    </div>
  `,
  directives: [StorageListCmp, NewItemCmp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PersistanceService]
})
export class AppCmp {
  public kvps

  constructor (private store: Store<any>, persistanceService:PersistanceService) {
    this.kvps = store.select('kvps')
    this.kvps.subscribe(state => console.log(state))

    // Initialize stuff
    let initialState = persistanceService.initialize(coBrowserDbConfig)
    this.store.dispatch({
      type: KvpActions.INIT_KVPS,
      payload: initialState
    })
  }

  addKvp (newKvp) {
    this.store.dispatch({
      type: KvpActions.ADD_KVP,
      payload: newKvp
    })
  }

  updateKvp (kvp) {
    var test = this.store.dispatch({
      type: KvpActions.UPDATE_KVP,
      payload: kvp
    })
  }

  removeKvp (kvp) {
    this.store.dispatch({
      type: KvpActions.REMOVE_KVP,
      payload: kvp
    })
  }
}