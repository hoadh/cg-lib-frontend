import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  listUsers: object;
  deleteIdUser: string;

  message: string = null;
  isError = false;

  constructor(
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.listUsers().subscribe( result => {
      if (result && result.status && result.data) {
        console.log(result.data);
        this.listUsers = result.data;
      }
    });
  }

  setDeleteIdUser(id: string) {
    this.deleteIdUser = id;
  }

  deleteUser() {
    this.userService.deleteUser(this.deleteIdUser).subscribe(result => {
      if (result.status && result.status === 'success') {
        console.log('Xóa thông tin thành công');
        this.isError = false;
        this.message = (result.message) ? result.message : 'Xóa thông tin thành công';
      } else {
        this.isError = true;
        this.message = (result.message) ? result.message : 'Lỗi xóa tài khoản thủ thư';
      }
      this.getUsers();
    });
  }

  setUpdateIdUser(id: string, index: number) {
    localStorage.setItem('USER_ID_UPDATE', id);
    localStorage.setItem('USER_DATA_UPDATE', JSON.stringify(this.listUsers[index]));
    this.router.navigate(['/admin/users/edit/' + id]);
  }
}
