/**
 * let array = [{name: 'Calle', age: 31}, {name: 'Lasse', age: 26}]
 * <li *ngFor="#item of array | arraySort:'-name'">{{item.name}}</li>
 */

import {Pipe} from 'angular2/core'

@Pipe({
  name: 'arraySort'
})
export class ArraySortPipe {
  transform(array: Array<string>, args: string): Array<string> {
    if (typeof args[0] === 'undefined') {
      return array
    }

    let direction = args[0][0]
    let column
    if (direction === '-') {
      column = args[0].slice(1)
    } else {
      column = args[0]
    }

    array.sort((a: any, b: any) => {
      let left = a[column]
      let right = b[column]

      if (direction === '-') {
        return left < right ? 1 : -1
      } else {
        return left > right ? 1 : -1
      }
    })

    return array
  }
}