import { Component, OnInit } from '@angular/core';
import { BookStatus } from '../../books/book-status';
// import { BooksFakeService as BooksService } from '../../books/books-fake.service';
import { BooksService } from '../../books/books.service';
import { CustomersService } from '../../../customers/customers.service';
import { Customer } from '../../../customers/customer';
import { Book } from '../../books/book';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {
  message: string = null;
  isError = false;

  libraryId: string;
  categories: any;
  bookStatus: BookStatus[];
  borrowBooks: Book[] = [];
  booksList: Book[];
  filterBookList: Book[];
  customersList: Customer[];
  filterCustomersList: Customer[];
  selectedCustomer: Customer = {
    name: ''
  };
  defaultDate: string;
  todayDate: string;
  private filterBookSubject: Subject<string> = new Subject();
  private filterCustomerSubject: Subject<string> = new Subject();

  constructor(
    private books: BooksService,
    private customers: CustomersService
  ) {
    this.getDateString();
  }

  getDateString() {
    const today = new Date();
    const next7days = new Date();
    next7days.setDate(today.getDate() + 10);

    let dd = String(next7days.getDate()).padStart(2, '0');
    let mm = String(next7days.getMonth() + 1).padStart(2, '0');
    let yyyy = next7days.getFullYear();
    this.defaultDate = yyyy + '-' + mm + '-' + dd;

    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0');
    yyyy = today.getFullYear();
    this.todayDate = yyyy + '-' + mm + '-' + dd;
  }

  ngOnInit(): void {
    this.books.getBookStatus().subscribe(result => this.bookStatus = result.data);
    this.libraryId = localStorage.getItem('LIBRARY_ID');

    this.books.getAvailableBooks(this.libraryId).subscribe(result => {
      if (result && result.status && result.data) {
        this.booksList = result.data;
        this.filterBookList = this.booksList;
      }
    });

    this.customers.getList(this.libraryId).subscribe(result => {
      if (result && result.status && result.data) {
        this.customersList = result.data;
        this.filterCustomersList = this.customersList;
      }
    });

    // waiting 300ms after key up in filter book text
    this.filterBookSubject.pipe(debounceTime(300)).subscribe(searchTextValue => {
      this.handleFilterBook(searchTextValue);
    });

    // waiting 300ms after key up in filter customer text
    this.filterCustomerSubject.pipe(debounceTime(300)).subscribe(searchTextValue => {
      this.handleFilterCustomer(searchTextValue);
    });
  }

  filterBookKeyUp(searchTextValue: string) {
    this.filterBookSubject.next(searchTextValue);
  }

  handleFilterBook(searchTextValue) {
    this.filterBookList = this.booksList.filter(book =>
        book.title.toLowerCase().includes(searchTextValue.toLowerCase())
        || book.isbn.toLowerCase().includes(searchTextValue.toLowerCase())
      );
  }

  filterCustomerKeyUp(searchTextValue: string) {
    this.filterCustomerSubject.next(searchTextValue);
  }

  handleFilterCustomer(searchTextValue) {
    this.filterCustomersList = this.customersList.filter(
      customer =>
      customer.name.toLowerCase().includes(searchTextValue.toLowerCase())
      ||
      customer.code.toLowerCase().includes(searchTextValue.toLowerCase())
    );
  }


  addBorrowBook($event, bookIndex: number) {
    console.log($event, bookIndex);
    const clickedBook = this.filterBookList[bookIndex];
    if ($event.target.checked === true) {
      if (this.checkExistBorrowBook(clickedBook.id) === false) {
        this.borrowBooks.push(clickedBook);
      }
    }
  }

  removeBorrowBook($event, bookIndex: number) {
    console.log($event, bookIndex);
    const removeBook = this.borrowBooks[bookIndex];
    if (this.checkExistBorrowBook(removeBook.id) === true) {
      this.borrowBooks.splice(bookIndex, 1);
    }
  }

  selectCustomer($event, customerIndex: number) {
    console.log($event, customerIndex);
    this.selectedCustomer = this.filterCustomersList[customerIndex];
  }

  checkExistBorrowBook(id: number) {
    for (const key in this.borrowBooks) {
      if (this.borrowBooks.hasOwnProperty(key)) {
        const element = this.borrowBooks[key];
        if (element.id === id) {
          return true;
        }
      }
    }
    return false;
  }

  saveBorrow(myForm) {
    const { fullname, code, school, studentClass, returnDate } = myForm.value;
    // const student: any = { name: fullname, code, school, class: studentClass};
    this.books.borrowBook(this.libraryId, this.borrowBooks, this.selectedCustomer, returnDate).subscribe(result => {
      const status = result.status;

      switch (status) {
        case 'success':
          this.isError = false;
          this.message = result.message;
          this.resetForm(myForm);
          break;
        case 'error':
          this.isError = true;
          this.message = (result.message === 'Token is Expired')
            ? 'Hết phiên đăng nhập. Vui lòng đăng nhập lại'
            : result.message;
          break;
        default:
          this.isError = true;
          this.message = 'Lỗi chưa rõ nguyên nhân!';
      }
    }, error => {
      let message = 'Có lỗi xảy ra!';
      if (error.error) {
        message = error.error.message;
      }
      this.isError = true;
      this.message = message;
    });
  }

  resetForm(myForm) {
    myForm.value.name = '';
    this.selectedCustomer = {
      name: ''
    };
    this.borrowBooks = [];
  }

  updateBorrowBookStatus(statusId, index) {
    const borrowBook = this.borrowBooks[index];
    borrowBook.status_id = statusId;
  }

  printComponent(cmpName) {

    // Method 1: with style
    const printContents = document.getElementById(cmpName).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    // Method 2: without format
    // const printContent = document.getElementById(cmpName);
    // const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write(printContent.innerHTML);
    // WindowPrt.document.close();
    // WindowPrt.focus();
    // WindowPrt.print();
    // WindowPrt.close();
  }

}
