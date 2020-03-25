import { StatsService } from './../stats.service';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/books/books/book';
import { BookStatus } from 'src/app/books/books/book-status';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/books/books/books.service';
import { CategoriesService } from 'src/app/categories/categories.service';
import { LibraryService } from 'src/app/libraries/library.service';

@Component({
  selector: 'app-borrow-return',
  templateUrl: './borrow-return.component.html',
  styleUrls: ['./borrow-return.component.css'],
  providers: [CategoriesService]
})
export class BorrowReturnComponent implements OnInit {

  message: string = null;
  isError = false;

  books: Book[];
  categories: any;
  categoryId = 0;
  libraries: any;
  libraryId = 0;
  bookStatus: BookStatus[];
  deleteIdBook: string;
  firstDateOfMonth: string;
  lastDateOfMonth: string;

  statisticResults: any;

  constructor(
    public router: Router,
    private booksService: BooksService,
    private categoriesService: CategoriesService,
    private libraryService: LibraryService,
    private statsService: StatsService
  ) {
    this.firstDateOfMonth = this.getFirstDayOfMonth();
    this.lastDateOfMonth = this.getLastDayOfMonth();
  }

  ngOnInit() {
    this.categoriesService.getList().subscribe(result => this.categories = result.data);
    this.booksService.getBookStatus().subscribe(result => this.bookStatus = result.data);
    this.getLibraries();
    this.getStatistic();
  }

  getLibraries() {
    this.libraryService.listLibraries().subscribe(result => {
      if (result && result.status && result.data) {
        this.libraries = result.data;
      }
    });
  }

  getStatistic() {
    this.statsService.listBorrowReturnCounting(this.libraryId, this.categoryId, this.firstDateOfMonth, this.lastDateOfMonth)
    .subscribe(result => {
      if (result && result.status && result.data) {
        this.statisticResults = result.data;
      }
    });
  }

  getStatusById(id: number): BookStatus {
    return this.bookStatus[id - 1];
  }

  updateBorrowBookStatus(statusId, index) {
  }

  getToday() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  getFirstDayOfMonth() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const dd = '01';
    const mm = String(firstDay.getMonth() + 1).padStart(2, '0');
    const yyyy = firstDay.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }
  getLastDayOfMonth() {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const dd = String(lastDay.getDate()).padStart(2, '0');
    const mm = String(lastDay.getMonth() + 1).padStart(2, '0');
    const yyyy = lastDay.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

}
