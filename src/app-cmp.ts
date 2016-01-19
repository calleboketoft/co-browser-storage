import {Component} from 'angular2/core'
import {StorageMatrixCmp} from './components/storage-matrix-cmp'
@Component({
  selector: 'app',
  template: `
    <div class="container">
      <storage-matrix-cmp></storage-matrix-cmp>
    </div>
  `,
  directives: [StorageMatrixCmp]
})
export class AppCmp {}