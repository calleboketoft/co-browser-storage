import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {StorageListItemCmp} from './storage-list-item-cmp'
import {ArraySortPipe} from '../services/array-sort-pipe'

@Component({
  selector: 'storage-list-cmp',
  pipes: [ArraySortPipe],
  template: `
    <div>
      <storage-list-item-cmp
        *ngFor='let storageItem of cbsReducer | arraySort:"key"'
        [storageItem]='storageItem'
        [autosave]='autosave'
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
  @Output() updateItem = new EventEmitter();
  @Output() resetItem = new EventEmitter();
}
