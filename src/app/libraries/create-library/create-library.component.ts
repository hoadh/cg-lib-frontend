import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Library } from '../library';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-create-library',
  templateUrl: './create-library.component.html',
  styleUrls: ['./create-library.component.css']
})
export class CreateLibraryComponent implements OnInit {
  createLibraryForm: FormGroup;
  library: Library;

  message: string = null;
  isError = false;

  fileToUpload: File;

  constructor(private fb: FormBuilder, private libraryService: LibraryService) { }

  ngOnInit() {
    this.createLibraryForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      desc: ['', Validators.required],
      image: [''],
      manager: ['', Validators.required],
      manager_address: ['', Validators.required],
      manager_phone: ['', Validators.required],
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  create(library: Library) {
    this.libraryService.create(library).subscribe(
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

  onSubmit() {
    const libForm = this.createLibraryForm;
    const library: Library = {
      name: libForm.value.name,
      address: libForm.value.name,
      phone: libForm.value.phone,
      image: this.fileToUpload,
      desc: libForm.value.desc,
      manager: libForm.value.manager,
      manager_address: libForm.value.manager_address,
      manager_phone: libForm.value.manager_phone
    };
    this.create(library);
  }

  get name() {
    return this.createLibraryForm.get('name');
  }

  get address() {
    return this.createLibraryForm.get('address');
  }

  get phone() {
    return this.createLibraryForm.get('phone');
  }

  get desc() {
    return this.createLibraryForm.get('desc');
  }

  get image() {
    return this.createLibraryForm.get('image');
  }

  get manager() {
    return this.createLibraryForm.get('manager');
  }

  get manager_address() {
    return this.createLibraryForm.get('manager_address');
  }

  get manager_phone() {
    return this.createLibraryForm.get('manager_phone');
  }
}
