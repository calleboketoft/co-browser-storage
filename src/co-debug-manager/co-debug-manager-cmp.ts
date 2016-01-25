import {Component, Input, ChangeDetectionStrategy} from 'angular2/core'
import {Store} from '@ngrx/store'
import * as KvpActions from './services/kvp-reducer'
import {PersistenceService} from './services/persistence-service'
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
        (remove)="removeKvp($event)"
        (update)="updateKvp($event)"
        (reset)="resetKvp($event)">
      </storage-list-cmp>
    </div>
  `,
  directives: [StorageListCmp, NewItemCmp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PersistenceService]
})
export class CoDebugManagerCmp {
  @Input() coDebugManagerConfig;
  public kvps;
  private kvpsInited = false;

  constructor (private store: Store<any>, private persistenceService:PersistenceService) {
    this.kvps = store.select('kvps')

    this.kvps.subscribe(state => {
      // Whenever the state has been updated, save it
      console.log(state)
      if (this.kvpsInited) {
        this.persistenceService.saveState(state)
      } else {
        this.kvpsInited = true
      }
    })
  }

  ngOnInit () {
    // Initialize stuff
    let initialState = this.persistenceService.initialize(this.coDebugManagerConfig)
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
    let resettedItem = this.persistenceService.getItemFromSchema(kvp.key)
    if (resettedItem) {
      this.store.dispatch({
        type: KvpActions.UPDATE_KVP,
        payload: resettedItem
      })
    }
  }

  removeKvp (kvp) {
    // Note: this is a bit of hack but it works
    this.persistenceService.removeItem(kvp)
    this.store.dispatch({
      type: KvpActions.REMOVE_KVP,
      payload: kvp
    })
  }
}