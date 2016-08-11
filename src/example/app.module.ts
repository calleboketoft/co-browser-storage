import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'

import { provideStore } from '@ngrx/store'
import { exampleDbConfig } from './example-db.config'
import {
  browserStorageReducer,
  initializeBrowserStorage,
  getInitialBrowserStorageState,
  BrowserStorageModule
} from '../../browser-storage'

initializeBrowserStorage(exampleDbConfig)

@NgModule({
  imports: [
    BrowserModule,
    BrowserStorageModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    provideStore({
      browserStorageReducer
    }, {
      browserStorageReducer: getInitialBrowserStorageState()
    })
  ]
})
export class AppModule { }
