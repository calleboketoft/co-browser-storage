import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {StorageListItemCmp} from './storage-list-item-cmp'
import {ArraySortPipe} from '../services/array-sort-pipe'

@Component({
  selector: 'storage-list-cmp',
  pipes: [ArraySortPipe],
  template: `
    <div>
      <storage-list-item-cmp
        *ngFor='#storageItem of cbsReducer | arraySort:"key"'
        [storageItem]='storageItem'
        [autosave]='autosave'
        (removeItem)='removeItem.emit($event)'
        (updateItem)='updateItem.emit($event)'
        (resetItem)='resetItem.emit($event)'>
      </storage-list-item-cmp>
      <br>
    </div>
  `,
  directives: [StorageListItemCmp]
})
export class StorageListCmp {
  @Input() cbsReducer;
  @Input() autosave;
  @Output() removeItem = new EventEmitter();
  @Output() updateItem = new EventEmitter();
  @Output() resetItem = new EventEmitter();
}
