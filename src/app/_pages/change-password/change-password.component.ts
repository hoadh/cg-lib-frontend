import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../_core/services/auth.service';
import { Router } from '@angular/router';
import { USER_ROLE } from 'src/app/_core/tokens/user-role';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  showSpinner = false;
  password: string;
  message: string = null;
  isError = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(USER_ROLE) public userRole,
  ) { }

  ngOnInit() {
  }

  changePassword(myForm) {
    this.showSpinner = true;
    const {oldPassword , newPassword, confirmPassword } = myForm.value;
    if (newPassword !== confirmPassword) {
      this.message = 'Mật khẩu mới chưa khớp';
      this.isError = true;
      return;
    }

    if (confirmPassword.length < 8) {
      this.message = 'Mật khẩu phải từ 8 kí tự trở lên';
      this.isError = true;
      return;
    }

    this.authService.changePassword(oldPassword, newPassword).toPromise()
    .then( res => {
      this.showSpinner = false;
      if (res) {
        this.message = 'Thay đổi mật khẩu thành công';
        this.isError = false;
      } else {
        this.message = 'Thay đổi mật khẩu không thành công. Vui lòng thực hiện lại!';
        this.isError = true;
      }
    })
    .catch( () => {
      this.showSpinner = false;
    });
  }

  goBack() {
    localStorage.removeItem('SHOULD_RELOAD');
    const role = localStorage.getItem(this.userRole);
    const isAdmin = (role === '1');

    if (isAdmin) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/lib']);
    }
  }
}
