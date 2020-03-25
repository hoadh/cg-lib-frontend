import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Library } from '../library';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  createLibraryForm: FormGroup;
  library: Library;

  message: string = null;
  isError = false;
  fileToUpload: File = null;

  constructor(
    private libraryService: LibraryService
  ) {
  }

  ngOnInit() { }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload() {
    console.log('this.fileToUpload', this.fileToUpload);
    this.libraryService.uploadFile(this.fileToUpload).subscribe(
      result => {
        console.log(result);
        if (result.status === 'success') {
          this.isError = false;
        }
        if (result.message) {
          this.message = result.message;
        }
      }
    );
  }
}
