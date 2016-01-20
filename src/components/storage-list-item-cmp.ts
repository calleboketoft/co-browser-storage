import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
  selector: 'storage-list-item-cmp',
  template: `
    <li>
      <input type="text" #newValue [value]="kvp.value">
      <button (click)="removeMe.emit(kvp)">Remove</button>
      <button (click)="updateKvp(kvp)">Update</button>
    </li>
  `
})
export class StorageListItemCmp {
  @Input() kvp
        // event            local function
  @Output('removeEventFromItem') removeMe = new EventEmitter() // Send the remove event updwards
  @Output('update') update = new EventEmitter()

  updateKvp (kvp) {
    this.update.emit(kvp)
  }
}
