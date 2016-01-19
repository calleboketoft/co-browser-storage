import {bootstrap} from 'angular2/platform/browser'
import {provideStore} from '@ngrx/store'
import {AppCmp} from './app-cmp'
import {kvps} from './services/kvps'

var initialState = [
  {
    id: 1,
    key: 'debugz',
    value: 'true',
    type: 'boolean'
  }
]

bootstrap(AppCmp, [
  // initial state is handled when store is initialized
  provideStore({kvps}, {kvps: initialState})
])
