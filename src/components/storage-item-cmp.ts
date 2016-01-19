import {Component} from 'angular2/core'

@Component({
  selector: 'storage-item-cmp',
  template: `
    <strong>Storage item</strong>
  `
})
export class StorageItemCmp {
  constructor () {
    console.log('storage item cmp')
  }
}