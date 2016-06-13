import {bootstrap} from '@angular/platform-browser-dynamic'
import {provideStore} from '@ngrx/store'
import {AppComponent} from './app.component'
import {cbsReducer} from '../co-browser-storage/services/cbs.reducer'
import {exampleDbConfig} from './example-db.config'
import {
  CbsModel,
  initializeCbs,
  getInitialCbsState
} from '../../co-browser-storage'

initializeCbs(exampleDbConfig)

bootstrap(AppComponent, [
  CbsModel,
  provideStore({
    cbsReducer
  }, {
    cbsReducer: getInitialCbsState()
  })
])
