import { Component, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'batch-update-component',
  template: `
    <div class="row">
      <div class="col-lg-3 col-xs-4">
        <strong>Batch update</strong>
      </div>
      <div class="col-lg-6 col-xs-4">
        <textarea #configTextarea class="form-control"></textarea>
      </div>
      <div class="col-lg-3 col-xs-4">
        <button type="button" class="btn btn-primary"
          (click)="setConfig(configTextarea.value)">
          Set values
        </button>
      </div>
    </div>
  `
})
export class BatchUpdateComponent {
  @Output() batchUpdate = new EventEmitter();
  public setConfig (values) {
    let jsonValues = JSON.parse(values)
    this.batchUpdate.emit(jsonValues)
  }
}