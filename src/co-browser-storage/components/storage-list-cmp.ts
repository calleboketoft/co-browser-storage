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
        (remove)='remove.emit($event)'
        (update)='update.emit($event)'
        (reset)='reset.emit($event)'>
      </storage-list-item-cmp>
      <br>
    </div>
  `,
  directives: [StorageListItemCmp]
})
export class StorageListCmp {
  @Input() cbsReducer;
  @Input() autosave;
  @Output() remove = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() reset = new EventEmitter();
}
