import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'

import { BrowserStorageManagerComponent } from './browser-storage-manager.component'
import { BrowserStorageListItemComponent } from './components/browser-storage-list-item.component'
import { BrowserStorageListComponent } from './components/browser-storage-list.component'
import { BrowserStorageModel } from './services/browser-storage.model'
import { ArraySortPipe } from './services/array-sort.pipe'

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    BrowserStorageManagerComponent,
    BrowserStorageListComponent,
    BrowserStorageListItemComponent,
    ArraySortPipe
  ],
  exports: [
    BrowserStorageManagerComponent
  ],
  providers: [
    BrowserStorageModel
  ]
})
export class BrowserStorageModule {}