import {Component, Input, ChangeDetectionStrategy} from 'angular2/core'
import {Store} from '@ngrx/store'
import * as KvpActions from './services/kvp-reducer'
import {PersistanceService} from './services/persistance-service'
import {StorageListCmp} from './components/storage-list-cmp'
import {NewItemCmp} from './components/new-item-cmp'

@Component({
  selector: 'co-debug-manager-cmp',
  template: `
    <div>
      <h4>New</h4>
      <new-item-cmp (create)="addKvp($event)"></new-item-cmp>
      <br><br>
      <h4>Existing</h4>
      <storage-list-cmp
        [kvps]="kvps | async"
        (removeEventFromItemList)="removeKvp($event)"
        (update)="updateKvp($event)"
        (reset)="resetKvp($event)">
      </storage-list-cmp>
    </div>
  `,
  directives: [StorageListCmp, NewItemCmp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PersistanceService]
})
export class CoDebugManagerCmp {
  @Input() coDebugManagerConfig;
  public kvps;
  private kvpsInited = false;

  constructor (private store: Store<any>, private persistanceService:PersistanceService) {
    this.kvps = store.select('kvps')

    this.kvps.subscribe(state => {
      // Whenever the state has been updated, save it
      console.log(state)
      if (this.kvpsInited) {
        persistanceService.saveState(state)
      } else {
        this.kvpsInited = true
      }
    })
  }

  ngOnInit () {
    // Initialize stuff
    let initialState = this.persistanceService.initialize(this.coDebugManagerConfig)
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

  resetKvp (kvp) {
    alert('implement me')
  }

  removeKvp (kvp) {
    // Note: this is a bit of hack but it works
    this.persistanceService.removeItem(kvp)
    this.store.dispatch({
      type: KvpActions.REMOVE_KVP,
      payload: kvp
    })
  }
}