import {Component, EventEmitter, Output} from 'angular2/core'

@Component({
  selector: 'new-item-cmp',
  template: `
    <input type="text" #storageType placeholder="Storage Type">
    <input type="text" #valueType placeholder="Value Type">
    <input type="text" #key placeholder="Key">
    <input type="text" #value placeholder="Value">
    <button type="button" (click)="saveItem(storageType.value, valueType.value, key.value, value.value)">Add</button>
  `
})
export class NewItemCmp {
  @Output() create = new EventEmitter()

  saveItem (storageType, valueType, key, value) {
    if (!key) {
      throw 'key please'
    }
    this.create.emit({
      key,
      value: value || '',
      storageType: storageType || 'localStorage',
      valueType: valueType || 'text'
    })
  }
}
