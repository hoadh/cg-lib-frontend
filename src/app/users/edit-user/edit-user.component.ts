import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { LibraryService } from 'src/app/libraries/library.service';
import { User } from '../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: string;
  user: User;
  libraries: object;

  message: string = null;
  isError = false;

  constructor(private userService: UserService, private libraryService: LibraryService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('USER_ID_UPDATE');
    this.user = JSON.parse(localStorage.getItem('USER_DATA_UPDATE'));
    this.libraryService.listLibraries().subscribe(result => {
      if (result && result.status && result.data) {
        this.libraries = result.data;
      }
    });
  }

  formSubmit(user: any) {
    console.log('formSubmit', user);
    const updatedUser = {
      name: user.name,
      phone: user.phone,
      library_id: user.library_id
    };
    this.userService.updateUser(this.userId, updatedUser).subscribe(result => {
      if (result) {
        this.isError = false;
        this.message = result.message;
      }
    }, error => {
      this.isError = true;
      this.message = error;
    });
  }

  formError(error) {
    console.log('formError', error);
  }

}
