import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
  selector: 'storage-list-item-cmp',
  template: `
    <div>
      <input type="text" disabled [value]="kvp.storageType">
      <input type="text" disabled [value]="kvp.key">
      <input type="text" #newValue [value]="kvp.value">
      <button (click)="removeMe.emit(kvp)">Remove</button>
      <button (click)="updateKvp(kvp, newValue)">Save</button>
      <button *ngIf="kvp.inConfigFile" (click)="resetKvp.emit(kvp)">Reset</button>
    </div>
  `
})
export class StorageListItemCmp {
  @Input() kvp
  //       event:   local event emitter that will fire event:
  @Output('remove') removeMe = new EventEmitter()
  @Output('update') update = new EventEmitter()
  @Output('reset') resetKvp = new EventEmitter()

  updateKvp (kvp, newValue) {
    kvp.value = newValue.value
    this.update.emit(kvp)
  }
}
