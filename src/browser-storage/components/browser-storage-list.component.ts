import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'browser-storage-list',
  template: `
    <div>
      <browser-storage-list-item
        *ngFor="let storageItem of browserStorageItems | arraySort:'key'"
        [itemsToShow]="itemsToShow"
        [storageItem]="storageItem"
        (updateItem)="updateItem.emit($event)"
        (resetItem)="resetItem.emit($event)">
      </browser-storage-list-item>
      <br>
    </div>
  `
})
export class BrowserStorageListComponent {
  @Input() browserStorageReducer
  @Input() itemsToShow: [string]
  @Output() updateItem = new EventEmitter()
  @Output() resetItem = new EventEmitter()

  public initialized = false
  public browserStorageItems = []

  ngOnChanges (changes) {
    // Only render the list once. The list itself is not going to change.
    if (!this.initialized && changes.browserStorageReducer) {
      this.initialized = true;
      this.browserStorageItems = changes.browserStorageReducer.currentValue
    }
  }
}
