import {Component, ChangeDetectionStrategy} from 'angular2/core'
import {Store} from '@ngrx/store'
import {INCREMENT, DECREMENT, RESET} from '../services/kvp-handler'

@Component({
  selector: 'storage-matrix-cmp',
  template: `
    <h3>Storage matrix</h3>
    <button (click)="increment()">Increment</button>
      <div>Current Count: {{ kvpHandler | async }}</div>
      <button (click)="decrement()">Decrement</button>
  `
})
export class StorageMatrixCmp {
  kvpHandler
  constructor (public store: Store<number>) {
    this.kvpHandler = store.select('kvpHandler')
  }
  increment () {
    this.store.dispatch({type: INCREMENT})
  }
  decrement () {
    this.store.dispatch({type: DECREMENT})
  }
  reset () {
    this.store.dispatch({type: RESET})
  }
}