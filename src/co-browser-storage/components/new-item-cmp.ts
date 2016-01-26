import {Component, EventEmitter, Output} from 'angular2/core'

@Component({
  selector: 'new-item-cmp',
  template: `
    <input type="text" #storageType placeholder="Storage Type">
    <input type="text" #key placeholder="Key">
    <input type="text" #value placeholder="Value">
    <button type="button" (click)="saveItem(key.value, value.value, storageType.value)">Add</button>
  `
})
export class NewItemCmp {
  @Output() create = new EventEmitter()

  saveItem (key, value, storageType) {
    if (!key) {
      throw 'key please'
    }
    this.create.emit({
      key,
      value: value || '',
      storageType: storageType || 'localStorage'
    })
  }
}
