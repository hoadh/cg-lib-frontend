import { Library } from '../library';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-library-form',
  templateUrl: './library-form.component.html',
  styleUrls: ['./library-form.component.css']
})
export class LibraryFormComponent implements OnInit {
  @Input() library?: Library;
  @Output() formSubmit = new EventEmitter<Library>();
  @Output() formError = new EventEmitter<any>();
  fileToUpload: File;

  constructor() { }

  ngOnInit() { }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  submitHandler(myForm) {
    const library: Library = {
      name: myForm.value.name,
      address: myForm.value.address,
      phone: myForm.value.phone,
      image: this.fileToUpload,
      desc: myForm.value.desc,
      manager: myForm.value.manager,
      manager_address: myForm.value.manager_address,
      manager_phone: myForm.value.manager_phone
    };
    this.formSubmit.emit(library);
  }
}
