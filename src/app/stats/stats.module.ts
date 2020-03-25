import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books/books.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../_shared/shared.module';
import { BorrowReturnComponent } from './borrow-return/borrow-return.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routers: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'borrow-return', component: BorrowReturnComponent },
];


@NgModule({
  declarations: [BooksComponent, BorrowReturnComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers)
  ]
})
export class StatsModule { }
