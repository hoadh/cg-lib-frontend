import { BookStatus } from './../book-status';
// import { BooksFakeService as BooksService } from './../books-fake.service';
import { BooksService } from '../../books/books.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book';
import { CategoriesService } from 'src/app/categories/categories.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
  providers: [CategoriesService]
})
export class ListBooksComponent implements OnInit {
  message: string = null;
  isError = false;

  books: Book[];
  bookStatus: BookStatus[];
  deleteIdBook: string;

  categories: any;

  libraryId: string;
  filter: Book;

  constructor(
    public router: Router,
    private booksService: BooksService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.resetFilter();
    this.libraryId = localStorage.getItem('LIBRARY_ID');
    this.getList();
    this.categoriesService.getList().subscribe(result => this.categories = result.data);
    this.booksService.getBookStatus().subscribe( result => {
      this.bookStatus = result.data;
    });
  }

  getList() {
    this.booksService.getList(this.libraryId).subscribe(result => {
      if (result && result.status && result.data) {
        this.books = result.data;
      }
    });
  }

  setDeleteIdBook(id: string) {
    this.deleteIdBook = id;
  }

  deleteBook() {
    const libraryId = localStorage.getItem('LIBRARY_ID');
    this.booksService.delete(libraryId, this.deleteIdBook).subscribe(result => {
      this.isError = !(result.status && result.status === 'success');
      this.message = result.message;
      this.getList();
    });
  }

  setUpdateIdBook(id: string, index: number) {
    localStorage.setItem('BOOK_ID_UPDATE', id);
    localStorage.setItem('BOOK_DATA_UPDATE', JSON.stringify(this.books[index]));
    this.router.navigate(['/lib/books/edit/' + id]);
  }

  getStatusById(id: number): BookStatus {
    return this.bookStatus[id - 1];
  }

  filterBooks() {
    this.booksService.filterBooksByFields(this.libraryId, this.filter).subscribe( result => {
      this.books = result.data;
    });
  }

  resetFilter() {
    this.filter = {
      library_id: '',
      title: '',
      authors: '',
      isbn: '',
      ages: '',
      publishing_company: '',
      category_id: 0,
      status_id: 0,
    };
  }

}
