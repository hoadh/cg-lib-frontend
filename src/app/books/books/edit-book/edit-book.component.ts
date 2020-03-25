import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookStatus } from '../book-status';
import { BooksService } from '../books.service';
import { CategoriesService } from '../../../categories/categories.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  providers: [CategoriesService]
})
export class EditBookComponent implements OnInit {
  message: string = null;
  isError = false;

  bookId: string;
  book: Book;

  libraryId: string;
  categories: any;
  bookStatus: BookStatus[];

  constructor(
    private books: BooksService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.libraryId = localStorage.getItem('LIBRARY_ID');
    this.activatedRoute.params.subscribe( params => {
      this.bookId = params.id;
      this.getBookDetail(this.libraryId, this.bookId);
    });

    console.log(this.book);

    this.categoriesService.getList().subscribe(result => this.categories = result.data);
    this.books.getBookStatus().subscribe(result => this.bookStatus = result.data);
  }

  getBookDetail(libraryId: string, id: string) {
    this.books.getBookById(libraryId, id).subscribe( result => {
      this.book = result.data;
    });
  }

  updateBook(myForm) {
    this.books.update(this.libraryId, this.bookId, this.book).subscribe(result => {
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
