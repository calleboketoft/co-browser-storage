import {Component, Input, Output, EventEmitter} from '@angular/core'
import {StorageListItemComponent} from './storage-list-item.component'
import {ArraySortPipe} from '../services/array-sort.pipe'

@Component({
  selector: 'storage-list-cmp',
  pipes: [ArraySortPipe],
  template: `
    <div>
      <storage-list-item-cmp
        *ngFor="let storageItem of cbsItems | arraySort:'key'"
        [itemsToShow]="itemsToShow"
        [storageItem]="storageItem"
        (updateItem)="updateItem.emit($event)"
        (resetItem)="resetItem.emit($event)">
      </storage-list-item-cmp>
      <br>
    </div>
  `,
  directives: [StorageListItemComponent]
})
export class StorageListComponent {
  @Input() cbsReducer;
  @Input() itemsToShow: [string];
  @Output() updateItem = new EventEmitter();
  @Output() resetItem = new EventEmitter();

  private initialized = false;
  public cbsItems = [];

  ngOnChanges (changes) {
    // Only render the list once. The list itself is not going to change.
    if (!this.initialized && changes.cbsReducer) {
      this.initialized = true;
      this.cbsItems = changes.cbsReducer.currentValue
    }
  }
}
