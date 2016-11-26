import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { BrowserStorageModel } from './services/browser-storage.model'

@Component({
  selector: 'browser-storage-manager',
  template: `
    <div>
      <browser-storage-list
        [browserStorageReducer]="browserStorageReducer$ | async"
        [itemsToShow]="itemsToShow"
        (updateItem)="browserStorageModel.updateItem($event)"
        (resetItem)="browserStorageModel.resetItem($event)">
      </browser-storage-list>

      <div class="row" *ngIf="showResetAll">
        <!-- match button position -->
        <div class="col-lg-9 col-xs-8">
        </div>
        <div class="col-lg-3 col-xs-4">
          <button class="btn btn-outline-warning" (click)="resetAll()">
            Reset all
          </button>
        </div>
      </div>
    </div>
  `
})
export class BrowserStorageManagerComponent {
  @Input() itemsToShow: [string];
  @Input() showResetAll: boolean;
  public browserStorageReducer$ = this.store.select('browserStorageReducer');

  constructor (
    private store: Store<any>,
    private browserStorageModel: BrowserStorageModel
  ) {}

  public resetAll () {
    if (confirm('Are you sure you want to reset all values to default?')) {
      this.browserStorageModel.resetAll()
    }
  }

  public batchUpdate (items) {
    this.browserStorageModel.updateItems(items)
  }
}
