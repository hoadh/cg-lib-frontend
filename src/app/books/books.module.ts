import { SharedModule } from './../_shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './books/add-book/add-book.component';
import { ListBooksComponent } from './books/list-books/list-books.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BorrowBookComponent } from './borrow-return/borrow-book/borrow-book.component';
import { ReturnBookComponent } from './borrow-return/return-book/return-book.component';
import { BorrowingBooksComponent } from './borrow-return/borrowing-books/borrowing-books.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { ImportBooksComponent } from './books/import-books/import-books.component';

const routers: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'add', component: AddBookComponent },
  { path: 'edit/:id', component: EditBookComponent },
  { path: 'list', component: ListBooksComponent },
  { path: 'borrow', component: BorrowBookComponent },
  { path: 'borrowing', component: BorrowingBooksComponent },
  { path: 'return', component: ReturnBookComponent },
  { path: 'import', component: ImportBooksComponent }
];

@NgModule({
  declarations: [
    AddBookComponent,
    ListBooksComponent,
    BorrowBookComponent,
    ReturnBookComponent,
    BorrowingBooksComponent,
    EditBookComponent,
    ImportBooksComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers)
  ]
})
export class BooksModule { }
