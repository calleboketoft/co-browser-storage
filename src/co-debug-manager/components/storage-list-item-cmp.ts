import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
  selector: 'storage-list-item-cmp',
  template: `
    <div>
      <input type="text" disabled [value]="kvp.key">
      <input type="text" #newValue [value]="kvp.value">
      <input type="text" #newType [value]="kvp.type">
      <input type="text" #newStorageType [value]="kvp.storageType">
      <button (click)="removeMe.emit(kvp)">Remove</button>
      <button (click)="updateKvp(kvp, newValue)">Save</button>
      <button *ngIf="kvp.inConfigFile" (click)="resetKvp.emit(kvp)">Reset</button>
    </div>
  `
})
export class StorageListItemCmp {
  @Input() kvp
  //       event:   local event emitter that will fire event:
  @Output('remove') removeMe = new EventEmitter() // Send the remove event updwards
  @Output('update') update = new EventEmitter()
  @Output('reset') resetKvp = new EventEmitter()

  updateKvp (kvp, newValue) {
    kvp.value = newValue.value
    this.update.emit(kvp)
  }
}
