import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routers: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'add', component: AddCategoryComponent },
  { path: 'edit/:id', component: EditCategoriesComponent },
  { path: 'list', component: ListCategoriesComponent }
];

@NgModule({
  declarations: [
    AddCategoryComponent,
    EditCategoriesComponent,
    CategoryFormComponent,
    ListCategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers)
  ]
})
export class CategoriesModule { }
