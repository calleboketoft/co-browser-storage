import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
  selector: 'storage-list-item-cmp',
  template: `
    <div>
      <input type='text' disabled [value]='storageItem.storageType'>
      <input type='text' disabled [value]='storageItem.valueType'>
      <input type='text' disabled [value]='storageItem.key'>
      <input [type]='storageItem.valueType' #newValue [value]='storageItem.value'>
      <button *ngIf='false' (click)='remove.emit(storageItem)'>Remove</button> <!-- skip for now -->
      <button (click)='updateWrap(storageItem, newValue)'>Save</button>
      <button *ngIf='storageItem.inConfigFile' (click)='reset.emit(storageItem)'>
        Reset
      </button>
    </div>
  `
})
export class StorageListItemCmp {
  @Input() storageItem;
  @Output() remove = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() reset = new EventEmitter();

  updateWrap (storageItem, newValue) {
    storageItem.value = newValue.value
    this.update.emit(storageItem)
  }
}
