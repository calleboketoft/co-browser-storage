import {Component, EventEmitter, Output} from 'angular2/core'

@Component({
  selector: 'new-item-cmp',
  template: `
    <input type="text" #key placeholder="Key">
    <input type="text" #value placeholder="Value">
    <input type="text" #type placeholder="Type">
    <button type="button" (click)="saveItem(key, value, type)">Add</button>
  `
})
export class NewItemCmp {
  @Output() create = new EventEmitter()
  
  saveItem (key, value, type) {
    this.create.emit({
      key: key.value,
      value: value.value,
      type: type.value
    })
  }
}