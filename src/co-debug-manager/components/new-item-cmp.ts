import {Component, EventEmitter, Output} from 'angular2/core'

@Component({
  selector: 'new-item-cmp',
  template: `
    <input type="text" #key placeholder="Key">
    <input type="text" #value placeholder="Value">
    <input type="text" #type placeholder="Type">
    <input type="text" #storageType placeholder="Storage Type">
    <button type="button" (click)="saveItem(key.value, value.value, type.value, storageType.value)">Add</button>
  `
})
export class NewItemCmp {
  @Output() create = new EventEmitter()

  saveItem (key, value, type, storageType) {
    if (!key) {
      throw 'key please'
    }
    this.create.emit({
      key,
      value: value || '',
      type: type || 'string',
      storageType: storageType || 'localStorage'
    })
  }
}
