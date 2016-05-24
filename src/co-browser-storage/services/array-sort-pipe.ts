/**
 * let array = [{name: 'Calle', age: 31}, {name: 'Lasse', age: 26}]
 * <li *ngFor="let item of array | arraySort:'-name'">{{item.name}}</li>
 */

import {Pipe} from '@angular/core'

@Pipe({
  name: 'arraySort'
})
export class ArraySortPipe {
  transform(array: Array<string>, args: string): Array<string> {
    if (typeof args === 'undefined') {
      return array
    }

    let direction = args[0]
    let column
    if (direction === '-') {
      column = args.slice(1)
    } else {
      column = args
    }

    array.sort((a: any, b: any) => {
      let left = (a[column] + '').toLowerCase()
      let right = (b[column] + '').toLowerCase()

      if (direction === '-') {
        return left < right ? 1 : -1
      } else {
        return left > right ? 1 : -1
      }
    })

    return array
  }
}