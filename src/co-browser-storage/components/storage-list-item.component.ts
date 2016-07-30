import {Component, Input, Output, EventEmitter} from '@angular/core'
import {Store} from '@ngrx/store'
import {REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms'

@Component({
  selector: 'storage-list-item-cmp',
  directives: [REACTIVE_FORM_DIRECTIVES],
  styles: [`
    .row {
      margin-bottom: 10px;
    }
    .tiny {
      font-size: 0.8rem;
    }
  `],
  template: `
    <div class="row" [hidden]="itemToHide(storageItem)">
      <div class="col-lg-3 col-xs-4">
        <strong>{{storageItem.key}}</strong><br>
        <span class="tiny">{{storageItem.storageType}}</span>
      </div>
      <div class="col-lg-6 col-xs-4">
        <input [type]="storageItem.valueType" class="form-control"
          [formControl]="storageItemInput">
      </div>
      <div class="col-lg-3 col-xs-4">
        <button class="btn btn-outline-warning"
          (click)="resetItem.emit(storageItem)">
          Reset
        </button>
      </div>
    </div>
  `
})
export class StorageListItemComponent {
  @Input() storageItem;
  @Input() itemsToShow: [string];
  @Output() updateItem = new EventEmitter();
  @Output() resetItem = new EventEmitter();

  private cbsReducer$ = this.store.select('cbsReducer');
  public storageItemInput = new FormControl();

  constructor (private store: Store<any>) {}

  ngOnInit () {
    this.storageItemInput.updateValue(this.storageItem.value)

    this.cbsReducer$.map(cbs => cbs['find'](i => i.key === this.storageItem.key))
      .subscribe((item) => {
        let currentValue = this.storageItemInput.value
        let incomingValue = item.value
        // This happens if the value is changed from outside of this component
        if (currentValue !== incomingValue) {
          this.storageItemInput.updateValue(incomingValue)
        }
      })

    this.storageItemInput.valueChanges
      .subscribe((val) => {
        this.updateWrap(val)
      })
  }

  public itemToHide (storageItem) {
    let hideItem = false
    if (this.itemsToShow) {
      hideItem = this.itemsToShow.indexOf(storageItem.key) === -1
    }
    return hideItem
  }

  updateWrap (newValue) {
    this.storageItem.value = newValue
    this.updateItem.emit(this.storageItem)
  }
}
