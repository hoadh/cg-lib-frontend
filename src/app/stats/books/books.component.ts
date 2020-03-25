import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/books/books/book';
import { BookStatus } from 'src/app/books/books/book-status';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/books/books/books.service';
import { CategoriesService } from 'src/app/categories/categories.service';
import { LibraryService } from 'src/app/libraries/library.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [CategoriesService]
})
export class BooksComponent implements OnInit {
  message: string = null;
  isError = false;

  books: Book[];
  categories: any;
  libraries: any;
  categoryId = 0;
  libraryId = 0;
  statusId = 0;
  bookStatus: BookStatus[];
  deleteIdBook: string;

  constructor(
    public router: Router,
    private booksService: BooksService,
    private categoriesService: CategoriesService,
    private libraryService: LibraryService
  ) { }

  ngOnInit() {
    this.getLibraries();
    this.categoriesService.getList().subscribe(result => this.categories = result.data);
    this.booksService.getBookStatus().subscribe(result => {
      this.bookStatus = result.data;
    });
    this.getList();
  }

  getList() {
    this.booksService.filterBooks(this.libraryId, this.categoryId, this.statusId).subscribe(result => {
      if (result && result.status && result.data) {
        this.books = result.data;
        console.log(result.data);
      }
    });
  }

  getLibraries() {
    this.libraryService.listLibraries().subscribe(result => {
      if (result && result.status && result.data) {
        console.log(result.data);
        this.libraries = result.data;
      }
    });
  }

  getStatusById(id: number): BookStatus {
    return this.bookStatus[id - 1];
  }


  updateBorrowBookStatus(statusId, index) {
  }

  getLibraryById(id: number): any {
    return this.libraries.filter( (el) => el.id === id);
  }

}
