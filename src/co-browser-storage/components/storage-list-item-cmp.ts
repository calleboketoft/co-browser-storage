import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {Control} from 'angular2/common'
import 'rxjs/add/operator/debounceTime'

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
        <input [type]='storageItem.valueType' class='form-control'
          [ngFormControl]='storageItemValue' #newValue>
      </div>
      <div class='col-lg-3 col-xs-4'>
        <button class='btn btn-success'
          *ngIf='!autosave'
          (click)='updateWrap(newValue.value)'>
          Save
        </button>
        <button class='btn btn-info'
          *ngIf='storageItem.inConfigFile'
          (click)='resetItem.emit(storageItem)'>
          Reset
        </button>
      </div>
    </div>
  `
})
export class StorageListItemCmp {
  @Input() storageItem;
  @Input() autosave;
  @Output() removeItem = new EventEmitter();
  @Output() updateItem = new EventEmitter();
  @Output() resetItem = new EventEmitter();

  storageItemValue = new Control();

  ngOnInit () {
    this.storageItemValue.updateValue(this.storageItem.value)

    if (this.autosave) {
      this.storageItemValue.valueChanges
        .debounceTime(500)
        .subscribe((val) => {
          this.updateWrap(val)
        })
    }
  }

  updateWrap (newValue) {
    this.storageItem.value = newValue
    this.updateItem.emit(this.storageItem)
  }
}
