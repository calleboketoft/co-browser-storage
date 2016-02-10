import {Component, Input, ChangeDetectionStrategy} from 'angular2/core'
import {Store} from '@ngrx/store'
import * as CoBrowserStorageActions from './services/co-browser-storage-reducer'
import {PersistenceService} from './services/persistence-service'
import {StorageListCmp} from './components/storage-list-cmp'
import {NewItemCmp} from './components/new-item-cmp'

@Component({
  selector: 'co-browser-storage-cmp',
  template: `
    <div *ngIf="!noRender">
      <h4>co-browser-storage</h4>
      <storage-list-cmp
        [kvps]="kvps | async"
        (remove)="removeKvp($event)"
        (update)="updateKvp($event)"
        (reset)="resetKvp($event)">
      </storage-list-cmp>
      <br>
      Add temporary item<br>
      <new-item-cmp (create)="addKvp($event)"></new-item-cmp>
    </div>
  `,
  directives: [StorageListCmp, NewItemCmp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PersistenceService]
})
export class CoBrowserStorageCmp {
  @Input() coBrowserStorageConfig;
  @Input() noRender;
  public kvps;
  private kvpsInited = false;

  constructor (
    private store: Store<any>,
    private persistenceService:PersistenceService
  ) {
    this.kvps = store.select('coBrowserStorageReducer')

    this.kvps.subscribe(state => {
      // Whenever the state has been updated, save it
      if (this.kvpsInited) {
        this.persistenceService.saveState(state)
      } else {
        this.kvpsInited = true
      }
    })
  }

  ngOnInit () {
    // Initialize stuff
    let initialState = this.persistenceService.initialize(this.coBrowserStorageConfig)
    this.store.dispatch({
      type: CoBrowserStorageActions.INIT_KVPS,
      payload: initialState
    })
  }

  addKvp (newKvp) {
    this.store.dispatch({
      type: CoBrowserStorageActions.ADD_KVP,
      payload: newKvp
    })
  }

  updateKvp (kvp) {
    var test = this.store.dispatch({
      type: CoBrowserStorageActions.UPDATE_KVP,
      payload: kvp
    })
  }

  resetKvp (kvp) {
    let resettedItem = this.persistenceService.getItemFromSchema(kvp.key)
    if (resettedItem) {
      this.store.dispatch({
        type: CoBrowserStorageActions.UPDATE_KVP,
        payload: resettedItem
      })
    }
  }

  removeKvp (kvp) {
    // Note: this is a bit of hack but it works
    this.persistenceService.removeItem(kvp)
    this.store.dispatch({
      type: CoBrowserStorageActions.REMOVE_KVP,
      payload: kvp
    })
  }
}