import '../polyfills'

import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { CbsModel } from './services/cbs.model'

@Component({
  selector: 'cbs-cmp',
  template: `
    <div>
      <storage-list-cmp
        [cbsReducer]="cbsReducer$ | async"
        [itemsToShow]="itemsToShow"
        (updateItem)="cbsModel.updateItem($event)"
        (resetItem)="cbsModel.resetItem($event)">
      </storage-list-cmp>

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
      <br>

      <batch-update-component
        *ngIf="showBatchUpdate"
        (batchUpdate)="batchUpdate($event)">
      </batch-update-component>
    </div>
  `
})
export class CbsComponent {
  @Input() itemsToShow:[string];
  @Input() showBatchUpdate: boolean;
  @Input() showResetAll: boolean;
  public cbsReducer$ = this.store.select('cbsReducer');

  constructor (
    private store: Store<any>,
    private cbsModel: CbsModel
  ) {}

  public resetAll () {
    if (confirm('Are you sure you want to reset all values to default?')) {
      this.cbsModel.resetAll()
    }
  }

  public batchUpdate (items) {
    this.cbsModel.updateItems(items)
  }
}