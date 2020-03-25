import { BooksService } from './../books.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-import-books',
  templateUrl: './import-books.component.html',
  styleUrls: ['./import-books.component.css']
})
export class ImportBooksComponent implements OnInit {
  downloadUrl = environment.apiUrl + 'download-excel-sample';
  message: string = null;
  isError = false;
  libraryId: string;
  filedata: any;
  myFile: any;

  fileEvent(e) {
    this.filedata = e.target.files[0];
  }

  constructor(private books: BooksService) { }

  ngOnInit() {
    this.libraryId = localStorage.getItem('LIBRARY_ID');
  }

  onSubmit(f: NgForm) {

    let myFormData = new FormData();
    myFormData.append('file', this.filedata);

    this.books.importBooks(this.libraryId, myFormData).subscribe(result => {
      console.log(result);

      const status = result.status;
      switch (status) {
        case 'success':
          this.isError = false;
          this.message = result.message;
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

}
