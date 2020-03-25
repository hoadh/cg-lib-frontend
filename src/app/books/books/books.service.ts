import { HttpBaseService } from '../../_core/services/http-base.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpResult } from 'src/app/_core/models/http-result';
import { Book } from './book';
import { BookStatus } from './book-status';

@Injectable({
  providedIn: 'root'
})
export class BooksService extends HttpBaseService {

  bookStatus: BookStatus[] = [
    { id: 1, title: 'Mới' },
    { id: 2, title: 'Tương đối mới' },
    { id: 3, title: 'Bình thường' },
    { id: 4, title: 'Cũ' },
    { id: 5, title: 'Hỏng' },
    { id: 6, title: 'Mất' }
  ];

  public getBookStatus(): Observable<HttpResult> {
    return this.getHttpResult({ data: this.bookStatus });
  }

  public getList(libraryId: string): Observable<HttpResult> {
    return this.http.get(`${this.apiUrl}libraries/${libraryId}/books`, { headers: this.getHeaders() });
  }

  public getAllBooks(): Observable<HttpResult> {
    return this.http.get(`${this.apiUrl}books`, { headers: this.getHeaders() });
  }

  public getBookById(libraryId: string, id: string): Observable<HttpResult> {
    return this.http.get(`${this.apiUrl}libraries/${libraryId}/books/${id}`, { headers: this.getHeaders() });;
  }

  public filterBooksByFields(libraryId: string, filterBook: Book): Observable<HttpResult> {
    let filter = '';

    for (const key in filterBook) {
      if (filterBook.hasOwnProperty(key)) {
        const value = filterBook[key];
        switch (key) {
          case 'category_id':
          case 'status_id':
            if (value !== 0) {
              filter += `${key}=${value}&`;
            }
            break;
          default:
            if (value !== '') {
              filter += `${key}=${value}&`;
            }
        }
      }
    }
    const url = `${this.apiUrl}libraries/${libraryId}/books?${filter}`;
    console.log('url = ' + url);
    return this.http.get(url, { headers: this.getHeaders() });
  }

  public filterBooks(libraryId: number, categoryId: number, statusId: number): Observable<HttpResult> {
    let filter = '';
    if (libraryId > 0) {
      filter += `library_id=${libraryId}&`;
    }

    if (categoryId > 0) {
      filter += `category_id=${categoryId}&`;
    }

    if (statusId > 0) {
      filter += `status_id=${statusId}&`;
    }
    return this.http.get(`${this.apiUrl}books/filter?${filter}`, { headers: this.getHeaders() });
  }

  public add(book: Book): Observable<HttpResult> {
    return this.http.post(`${this.apiUrl}books`, book, { headers: this.getHeaders() });
  }

  public update(libraryId: string, bookId: string, book: Book): Observable<HttpResult> {
    return this.http.put(`${this.apiUrl}libraries/${libraryId}/books/${bookId}`, book, { headers: this.getHeaders() });
  }

  public delete(libraryId: string, bookId: string): Observable<HttpResult> {
    return this.http.delete(`${this.apiUrl}libraries/${libraryId}/books/${bookId}`, { headers: this.getHeaders() });
  }

  public borrowBook(libraryId: string, books: Book[], customer: any, returnDay: string): Observable<HttpResult> {
    const bookIds = [];
    for (const key in books) {
      if (books.hasOwnProperty(key)) {
        const element = books[key];
        bookIds.push({
          id: element.id,
          status: element.status_id
        });
      }
    }
    const borrow = {
      customer_id: customer.id,
      book: bookIds,
      pay_day: returnDay
    };

    return this.http.post(`${this.apiUrl}libraries/${libraryId}/borrows/create`, borrow, { headers: this.getHeaders() });
  }

  public getBorrowingList(libraryId: string): Observable<HttpResult> {
    return this.http.get(`${this.apiUrl}libraries/${libraryId}/borrows`, { headers: this.getHeaders() });
  }

  public getAvailableBooks(libraryId: string): Observable<HttpResult> {
    return this.http.get(`${this.apiUrl}libraries/${libraryId}/books/borrow-status/0`, { headers: this.getHeaders() });
  }

  public returnBook(libraryId: string, borrowingBookId: string, statusId: number): Observable<HttpResult> {
    const returnInfo = {
      status_book: statusId
    };
    return this.http.put(`${this.apiUrl}libraries/${libraryId}/borrows/${borrowingBookId}`, returnInfo, { headers: this.getHeaders() });
  }

  getHttpResult(data: any) {
    const status = { status: 'success' };
    return of({ ...status, ...data });
  }

  public importBooks(libraryId: string, books: FormData): Observable<HttpResult> {
    let headers = this.getHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.apiUrl}libraries/${libraryId}/books/import`, books, { headers });
  }
}
