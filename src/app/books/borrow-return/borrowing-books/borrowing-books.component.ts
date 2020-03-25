import { Component, OnInit } from '@angular/core';
// import { BooksFakeService as BooksService } from '../../books/books-fake.service';
import { Router } from '@angular/router';
import { BookStatus } from '../../books/book-status';
import { BorrowingBook } from '../borrowing-book';
import { BooksService } from '../../books/books.service';

@Component({
  selector: 'app-borrowing-books',
  templateUrl: './borrowing-books.component.html',
  styleUrls: ['./borrowing-books.component.css']
})
export class BorrowingBooksComponent implements OnInit {
  message: string = null;
  isError = false;

  borrowingBooks: BorrowingBook[];
  bookStatus: BookStatus[];
  borrowingBookId: string;
  borrowingBookStatusId: number;

  defaultDate: string;

  constructor(
    public router: Router,
    private booksService: BooksService
  ) {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    this.defaultDate = yyyy + '-' + mm + '-' + dd;
  }


  ngOnInit() {
    this.getBorrowingList();
    this.booksService.getBookStatus().subscribe(result => {
      this.bookStatus = result.data;
    });
  }

  getBorrowingList() {
    const libraryId = localStorage.getItem('LIBRARY_ID');
    this.booksService.getBorrowingList(libraryId).subscribe(result => {
      if (result && result.status && result.data) {
        this.borrowingBooks = result.data;
      }
    });
  }


  setBorrowingIdForReturn(id: string, statusId: number) {
    this.borrowingBookId = id;
    this.borrowingBookStatusId = statusId;
  }

  returnBook(myForm) {
    const libraryId = localStorage.getItem('LIBRARY_ID');
    const { statusId } = myForm.value;

    if (statusId === undefined) {
      this.isError = true;
      this.message = 'Chưa chọn tình trạng sách!';
    } else {
      this.isError = false;
      this.message = '';
      this.booksService.returnBook(libraryId, this.borrowingBookId, statusId).subscribe(result => {
        this.isError = !(result.status && result.status === 'success');
        this.message = result.message;
        this.getBorrowingList();
      });
    }
  }

  getStatusById(id: number): BookStatus {
    return this.bookStatus[id - 1];
  }
}
