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
          [ngFormControl]='storageItemInput'>
      </div>
      <div class='col-lg-3 col-xs-4'>
        <button class='btn btn-success'
          *ngIf='!autosave'
          (click)='updateWrap(storageItemInput.value)'>
          Save
        </button>
        <button class='btn btn-info'
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
  @Output() updateItem = new EventEmitter();
  @Output() resetItem = new EventEmitter();

  storageItemInput = new Control();

  ngOnInit () {
    this.storageItemInput.updateValue(this.storageItem.value)

    if (this.autosave) {
      this.storageItemInput.valueChanges
        .debounceTime(300)
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
