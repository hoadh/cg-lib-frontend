import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { SharedModule } from '../_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routers: Routes =  [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'add', component: AddUserComponent},
  { path: 'edit/:id', component: EditUserComponent},
  { path: 'list', component: ListUsersComponent}
];


@NgModule({
  declarations: [AddUserComponent, ListUsersComponent, UserFormComponent, EditUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers)
  ],
  exports: [AddUserComponent, ListUsersComponent]
})
export class UsersModule { }
