import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'

import { provideStore } from '@ngrx/store'
import { exampleDbConfig } from './example-db.config'
import {
  browserStorageReducer,
  initializeCbs,
  getInitialCbsState,
  BrowserStorageModule
} from '../../browser-storage'

initializeCbs(exampleDbConfig)

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserStorageModule],
  bootstrap: [AppComponent],
  providers: [
    provideStore({
      browserStorageReducer
    }, {
      browserStorageReducer: getInitialCbsState()
    })
  ]
})
export class AppModule { }
