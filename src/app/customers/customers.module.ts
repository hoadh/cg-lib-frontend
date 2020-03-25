import { SharedModule } from 'src/app/_shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routers: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'add', component: AddComponent },
  // { path: 'edit/:id', component: EditCategoriesComponent },
  { path: 'list', component: ListComponent }
];

@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers)
  ]
})
export class CustomersModule { }
