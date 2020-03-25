import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLibrariesComponent } from './list-libraries/list-libraries.component';
import { CreateLibraryComponent } from './create-library/create-library.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditLibraryComponent } from './edit-library/edit-library.component';
import { LibraryFormComponent } from './library-form/library-form.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routers: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'add', component: CreateLibraryComponent },
  { path: 'list', component: ListLibrariesComponent },
  { path: 'upload', component: UploadFileComponent }, // test upload-file
  { path: 'edit/:id', component: EditLibraryComponent },
];

@NgModule({
  declarations: [
    ListLibrariesComponent,
    CreateLibraryComponent,
    EditLibraryComponent,
    LibraryFormComponent,
    UploadFileComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers)
  ],
  exports: []
})
export class LibrariesModule { }
