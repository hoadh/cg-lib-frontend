import { Component, OnInit } from '@angular/core';
import {LibraryService} from '../library.service';
import { environment } from '../../../environments/environment';
import { Library } from '../library';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-libraries',
  templateUrl: './list-libraries.component.html',
  styleUrls: ['./list-libraries.component.css']
})
export class ListLibrariesComponent implements OnInit {
  libraries: object;
  baseUrl = environment.baseUrl;

  deleteIdLibrary: string;
  message: string = null;
  isError = false;

  constructor(
    private router: Router,
    private libraryService: LibraryService
  ) { }

  ngOnInit() {
    this.getLibraries();
  }

  getLibraries() {
    this.libraryService.listLibraries().subscribe( result => {
      if (result && result.status && result.data) {
        console.log(result.data);
        this.libraries = result.data;
      }
    });
  }

  setDeleteIdLibrary(id: string) {
    this.deleteIdLibrary = id;
  }

  deleteLibrary() {
    this.libraryService.deleteLibrary(this.deleteIdLibrary).subscribe(result => {
      if (result.status && result.status === 'success') {
        console.log('Xóa thông tin thành công');
        this.isError = false;
        this.message = (result.message) ? result.message : 'Xóa thông tin thành công';
      } else {
        this.isError = true;
        this.message = (result.message) ? result.message : 'Lỗi xóa thư viện';
      }
      this.getLibraries();
    });
  }

  setUpdateIdLibrary(id: string, index: number) {
    localStorage.setItem('LIBRARY_ID_UPDATE', id);
    localStorage.setItem('LIBRARY_DATA_UPDATE', JSON.stringify(this.libraries[index]));
    this.router.navigate(['/admin/libraries/edit/' + id]);
  }

}
