import {bootstrap} from 'angular2/platform/browser'
import {provideStore} from '@ngrx/store'
import {AppCmp} from './app-cmp'
import {kvpHandler} from './services/kvp-handler'

var initialState = 5
bootstrap(AppCmp, [
  // initial state is handled when store is initialized
  provideStore({kvpHandler}, {kvpHandler: initialState})
])