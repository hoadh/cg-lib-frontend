import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LibraryService } from '../library.service';
import { Library } from '../library';

@Component({
  selector: 'app-edit-library',
  templateUrl: './edit-library.component.html',
  styleUrls: ['./edit-library.component.css']
})
export class EditLibraryComponent implements OnInit {
  library: Library;
  libraryId: string;

  message: string = null;
  isError = false;
  constructor(private fb: FormBuilder, private libraryService: LibraryService) {}

  ngOnInit() {
    this.libraryId = localStorage.getItem('LIBRARY_ID_UPDATE');
    this.library = JSON.parse(localStorage.getItem('LIBRARY_DATA_UPDATE'));
  }

  formSubmit(library: Library) {
    console.log('formSubmit', library);
    this.libraryService.update(this.libraryId, library).subscribe(result => {
      if (result) {
        this.isError = false;
        this.message = result.message;
      }
    }, error => {
      this.isError = true;
      if (error.error && error.error.message instanceof Array) {
        this.message = error.error.message.join('; ');
      } else {
        this.message = error.error.message;
      }
    });
  }

  formError(error) {
    console.log('formError', error);
  }

}
