///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser'
import {provideStore} from '@ngrx/store'
import {AppCmp} from './app-cmp'
import {cbsReducer} from '../co-browser-storage/services/cbs-reducer'
import {exampleDbConfig} from './example-db-config'
import {setCbsConfig} from '../co-browser-storage/services/cbs-model'

setCbsConfig(exampleDbConfig)

bootstrap(AppCmp, [
  // initial state is handled when store is initialized
  provideStore({cbsReducer}, {cbsReducer: []})
])
