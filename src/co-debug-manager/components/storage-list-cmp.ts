import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {StorageListItemCmp} from './storage-list-item-cmp'

@Component({
  selector: 'storage-list-cmp',
  // when the remove event comes from the child, call the removeKvp function
  template: `
    <div>
      <storage-list-item-cmp
        *ngFor="#kvp of kvps"
        [kvp]="kvp"
        (remove)="removeMyItem.emit($event)"
        (update)="updateKvp.emit($event)"
        (reset)="resetKvp.emit($event)"
      ></storage-list-item-cmp>
    </div>
  `,
  directives: [StorageListItemCmp]
})
export class StorageListCmp {
  @Input() kvps
  @Output('remove') removeMyItem = new EventEmitter()
  @Output('update') updateKvp = new EventEmitter() // send upwards
  @Output('reset') resetKvp = new EventEmitter()
}
