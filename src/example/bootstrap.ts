import {bootstrap} from 'angular2/platform/browser'
import {provideStore} from '@ngrx/store'
import {AppCmp} from './app-cmp'
import {coBrowserStorageReducer} from '../co-browser-storage/services/co-browser-storage-reducer'

bootstrap(AppCmp, [
  // initial state is handled when store is initialized
  provideStore({coBrowserStorageReducer}, {coBrowserStorageReducer: []})
])
