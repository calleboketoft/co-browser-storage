import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
  selector: 'storage-list-item-cmp',
  template: `
    <li>
      {{kvp.key}} : {{kvp.value}}
      <button (click)="remove.emit(kvp)">Remove</button>
    </li>
  `
})
export class StorageListItemCmp {
  @Input() kvp
  @Output('remove') remove = new EventEmitter() // Send the remove event updwards
}
