import {Component, ChangeDetectionStrategy} from 'angular2/core'
import {Store} from '@ngrx/store'

import * as KvpActions from './services/kvps'

import {StorageListCmp} from './components/storage-list-cmp'

@Component({
  selector: 'app',
  template: `
    <div class="container">
      <h3>List</h3>
      <storage-list-cmp
        [kvps]="kvps | async"
        (remove)="removeKvp($event)">
      </storage-list-cmp>
    </div>
  `,
  directives: [StorageListCmp],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppCmp {
  public kvps
  constructor (private store: Store) {
    this.kvps = store.select('kvps')
  }
  addKvp () {
    this.store.dispatch({
      type: KvpActions.ADD_KVP
    })
  }
  removeKvp (kvp) {
    this.store.dispatch({
      type: KvpActions.REMOVE_KVP,
      payload: kvp
    })
  }
}