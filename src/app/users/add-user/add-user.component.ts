import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {LibraryService} from '../../libraries/library.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  message: string = null;
  isError = false;
  isShowLibraries = false;
  libraries: object;

  constructor(private userService: UserService, private libraryService: LibraryService) { }

  ngOnInit() {
    this.libraryService.listLibraries().subscribe( result => {
      if (result && result.status && result.data) {
        this.libraries = result.data;
      }
    });
  }

  onRoleChange(myForm) {
    this.isShowLibraries = (myForm.value.role === '2');
  }

  addUser(myForm) {
    const libraryId = Number(myForm.value.library_id);
    const user: User = {
      name: myForm.value.name,
      phone: myForm.value.phone,
      username: myForm.value.username,
      password: myForm.value.password,
      library_id: libraryId
    };
    const {password, confirmPassword } = myForm.value;
    if (password !== confirmPassword) {
      console.log(password, confirmPassword);
      this.message = 'Mật khẩu mới chưa khớp';
      this.isError = true;
      return;
    }
    this.userService.addUser(user).subscribe( result => {
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
      console.log('Lỗi khi tạo tài khoản thủ thư', error);
    });
  }

}
