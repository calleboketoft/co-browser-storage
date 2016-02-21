import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {StorageListItemCmp} from './storage-list-item-cmp'

@Component({
  selector: 'storage-list-cmp',
  // when the remove event comes from the child, call the removeKvp function
  template: `
    <div>
      <storage-list-item-cmp
        *ngFor='#storageItem of coBrowserStorageReducer'
        [storageItem]='storageItem'
        (remove)='remove.emit($event)'
        (update)='update.emit($event)'
        (reset)='reset.emit($event)'>
      </storage-list-item-cmp>
    </div>
  `,
  directives: [StorageListItemCmp]
})
export class StorageListCmp {
  @Input() coBrowserStorageReducer
  @Output() remove = new EventEmitter()
  @Output() update = new EventEmitter()
  @Output() reset = new EventEmitter()
}
