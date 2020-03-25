import { BorrowingBook } from './../borrow-return/borrowing-book';
import { BookStatus } from './book-status';
import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/_core/services/http-base.service';
import { Book } from './book';
import { Observable, of } from 'rxjs';
import { HttpResult } from 'src/app/_core/models/http-result';

@Injectable({
  providedIn: 'root'
})
export class BooksFakeService extends HttpBaseService {

  books: Book[] = [
    { id: 1, title: 'Conor McGregor', authors: 'Test', status: { id: 1, title: 'Mới' }, category: { name: 'Khoa học' }, library_id: '1' },
    { id: 2, title: 'Tony Ferguson', authors: '23', status: { id: 1, title: 'Mới' }, category: { name: 'Khoa học' }, library_id: '1' },
    { id: 3, title: 'Max Holloway', authors: '19', status: { id: 1, title: 'Mới' }, category: { name: 'Khoa học' }, library_id: '1' },
    { id: 4, title: 'Jon Jones', authors: '22', status: { id: 1, title: 'Mới' }, category: { name: 'Khoa học' }, library_id: '1' },
    { id: 5, title: 'Daniel Cormier', authors: '21', status: { id: 1, title: 'Mới' }, category: { name: 'Khoa học' }, library_id: '1' },
    { id: 6, title: 'Brock Lesnar', authors: '5', status: { id: 1, title: 'Mới' }, category: { name: 'Khoa học' }, library_id: '1' }
  ];

  borrowingBooks: BorrowingBook[] = [
    { id: 1,
      book_id: 1,
      book: {
        id: 1,
        title: 'Conor McGregor',
        authors: 'Test',
        status: { id: 1, title: 'Mới' },
        category: { name: 'Khoa học' },
        library_id: '1'
      },
      student_name: 'Nguyen Van A', student_code: 'AAAAA', school_name: 'THCS Nguyen Khuyen', class_name: '9A/1', 
      borrow_day: '2019-08-26',
      return_day: '2019-08-26',
      library_id: 1 },
  ];

bookStatus: BookStatus[] = [
  { id: 1, title: 'Mới' },
  { id: 2, title: 'Tương đối mới' },
  { id: 3, title: 'Bình thường' },
  { id: 4, title: 'Cũ' },
  { id: 5, title: 'Hỏng' },
  { id: 6, title: 'Mất' }
];

  public getBookStatus(): Observable < HttpResult > {
  return this.getHttpResult({ data: this.bookStatus });
}

  public getList(libraryId: string): Observable < HttpResult > {
  return this.getHttpResult({ data: this.books });
}

  public getAvailableBooks(libraryId: string): Observable<HttpResult> {
    return this.getHttpResult({ data: this.books });
  }

  public add(book: Book): Observable < HttpResult > {
  return(book.authors && book.authors !== '')
      ?this.getHttpResult({ message: 'Đã thêm sách thành công' })
      : this.getHttpErrorResult({ message: 'Cần cung cấp tựa sách' });
}

  public update(libraryId: string, bookId: string, book: Book): Observable < HttpResult > {
  return this.getHttpResult({ message: 'Đã cập nhật sách thành công' });
}

  public delete(libraryId: string, bookId: string): Observable < HttpResult > {
  return this.getHttpResult({ message: 'Đã xóa sách thành công' });
}

public borrowBook(libraryId: string, books: Book[], student: any, returnDay: string): Observable<HttpResult> {
  return this.getHttpResult({ message: 'Thêm mới phiếu mượn thành công'});
}

public getBorrowingList(libraryId: string): Observable < HttpResult > {
  return this.getHttpResult({ data: this.borrowingBooks });
}

  public returnBook(libraryId: string, borrowingBookId: string, statusId: number): Observable<HttpResult> {
  return this.getHttpResult({ message: 'Đã trả sách thành công' });
}

getHttpResult(data: any) {
  const status = { status: 'success' };
  return of({ ...status, ...data });
}

getHttpErrorResult(message: any) {
  const status = { status: 'error' };
  return of({ ...status, ...message });
}
}
