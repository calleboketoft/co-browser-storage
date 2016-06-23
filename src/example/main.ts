import {bootstrap} from '@angular/platform-browser-dynamic'
import {provideStore} from '@ngrx/store'
import {AppComponent} from './app.component'
import {exampleDbConfig} from './example-db.config'
import {provideForms} from '@angular/forms'
import {
  cbsReducer,
  CbsModel,
  initializeCbs,
  getInitialCbsState
} from '../../co-browser-storage'

initializeCbs(exampleDbConfig)

bootstrap(AppComponent, [
  CbsModel,
  provideForms(),
  provideStore({
    cbsReducer
  }, {
    cbsReducer: getInitialCbsState()
  })
])
