import { BookStatus } from './../book-status';
import { CategoriesService } from '../../../categories/categories.service';
// import { BooksFakeService as BooksService } from './../books-fake.service';
import { BooksService } from '../../books/books.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  providers: [CategoriesService]
})
export class AddBookComponent implements OnInit {
  message: string = null;
  isError = false;

  libraryId: string;
  categories: any;
  bookStatus: BookStatus[];

  constructor(private books: BooksService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.libraryId = localStorage.getItem('LIBRARY_ID');
    this.categoriesService.getList().subscribe(result => this.categories = result.data);
    this.books.getBookStatus().subscribe(result => this.bookStatus = result.data);
  }

  addBook(myForm) {
    const { title, authors, isbn, category_id, status_id, ages, publisher } = myForm.value;
    const book: Book = { title, authors, isbn, category_id, status_id, library_id: this.libraryId, ages, publishing_company: publisher };

    this.books.add(book).subscribe(result => {
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
  }
}
