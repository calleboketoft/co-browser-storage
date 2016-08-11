import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { CbsComponent } from './cbs.component'
import { ArraySortPipe } from './services/array-sort.pipe'
import { CbsModel } from './services/cbs.model'
import { BatchUpdateComponent } from './components/batch-update.component'
import { StorageListItemComponent } from './components/storage-list-item.component'
import { StorageListComponent } from './components/storage-list.component'

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    CbsComponent,
    ArraySortPipe,
    BatchUpdateComponent,
    StorageListComponent,
    StorageListItemComponent
  ],
  exports: [
    CbsComponent
  ],
  providers: [
    CbsModel
  ]
})
export class CbsModule {}