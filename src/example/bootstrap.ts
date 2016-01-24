import {bootstrap} from 'angular2/platform/browser'
import {provideStore} from '@ngrx/store'
import {AppCmp} from './app-cmp'
import {kvpReducer} from '../co-debug-manager/services/kvp-reducer'

bootstrap(AppCmp, [
  // initial state is handled when store is initialized
  provideStore({kvps: kvpReducer}, {kvps: []})
])
