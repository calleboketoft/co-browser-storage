import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'

import { provideStore } from '@ngrx/store'
import { exampleDbConfig } from './example-db.config'
import { provideForms } from '@angular/forms'
import {
  cbsReducer,
  CbsModel,
  initializeCbs,
  getInitialCbsState
} from '../../co-browser-storage'

initializeCbs(exampleDbConfig)

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
  providers: [
    CbsModel,
    provideForms(),
    provideStore({
      cbsReducer
    }, {
      cbsReducer: getInitialCbsState()
    })
  ]
})
export class AppModule { }
