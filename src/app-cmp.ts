import {Component, ChangeDetectionStrategy} from 'angular2/core'
import {Store} from '@ngrx/store'

import * as KvpActions from './services/kvps'

import {StorageListCmp} from './components/storage-list-cmp'
import {NewItemCmp} from './components/new-item-cmp'

@Component({
  selector: 'app',
  template: `
    <div class="container">
      <new-item-cmp (create)="addKvp($event)"></new-item-cmp>

      <h3>List <button type="button" (click)="logState()">State</button></h3>
      <storage-list-cmp
        [kvps]="kvps | async"
        (remove)="removeKvp($event)"
        (update)="updateKvp($event)">
      </storage-list-cmp>
    </div>
  `,
  directives: [StorageListCmp, NewItemCmp],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppCmp {
  public kvps

  constructor (private store: Store<any>) {
    this.kvps = store.select('kvps')
  }

  logState () {
    console.log(this.store.dispatch({type:''}))
  }

  addKvp (newKvp) {
    this.store.dispatch({
      type: KvpActions.ADD_KVP,
      payload: newKvp
    })
  }

  updateKvp (kvp) {
    this.store.dispatch({
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