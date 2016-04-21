import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
  selector: 'storage-list-item-cmp',
  styles: [`
    .row {
      margin-bottom: 10px;
    }
    .tiny {
      font-size: 0.8rem;
    }
  `],
  template: `
    <div class='row'>
      <div class='col-lg-3 col-xs-4'>
        <strong>{{storageItem.key}}</strong><br>
        <span class='tiny'>{{storageItem.storageType}}</span>
      </div>
      <div class='col-lg-6 col-xs-4'>
        <input [type]='storageItem.valueType'
          (change)='inputChanged(storageItem, newValue)'
          class='form-control'
          #newValue [value]='storageItem.value'>
      </div>
      <div class='col-lg-3 col-xs-4'>
        <button class='btn btn-success'
          *ngIf='!autosave'
          (click)='updateWrap(storageItem, newValue)'>
          Save
        </button>
        <button class='btn btn-info'
          *ngIf='storageItem.inConfigFile'
          (click)='reset.emit(storageItem)'>
          Reset
        </button>
      </div>
    </div>
  `
})
export class StorageListItemCmp {
  @Input() storageItem;
  @Input() autosave;
  @Output() remove = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() reset = new EventEmitter();

  inputChanged (storageItem, newValue) {
    if (this.autosave) {
      this.updateWrap(storageItem, newValue)
    }
  }

  updateWrap (storageItem, newValue) {
    storageItem.value = newValue.value
    this.update.emit(storageItem)
  }
}
