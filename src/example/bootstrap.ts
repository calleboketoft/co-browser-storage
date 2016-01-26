import {bootstrap} from 'angular2/platform/browser'
import {provideStore} from '@ngrx/store'
import {AppCmp} from './app-cmp'
import {kvpReducer} from '../co-browser-storage/services/kvp-reducer'

bootstrap(AppCmp, [
  // initial state is handled when store is initialized
  provideStore({kvps: kvpReducer}, {kvps: []})
])
