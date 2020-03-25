import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../_core/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { USER_ROLE } from '../../_core/tokens/user-role';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  isLoggedIn = false;
  email: string;
  password: string;
  message: string = null;
  isError = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(USER_ROLE) public userRole,
  ) { }

  ngOnInit() {
  }

  login(myForm: NgForm) {
    this.showSpinner = true;
    const { username, password } = myForm.value;
    this.auth.login(username, password).subscribe(success => {
      this.showSpinner = false;
      console.log('login.component:login', success);
      if (success) {
        this.auth.getProfile().subscribe(profile => {
          localStorage.setItem(this.userRole, profile.role);
          localStorage.setItem('LIBRARY_ID', profile.library_id);
          localStorage.removeItem('SHOULD_RELOAD');

          const isAdmin = (profile.role === '1');
          if (isAdmin) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/lib']);
          }
        });
      } else {
        this.isError = true;
        this.message = 'Thông tin đăng nhập không chính xác';
      }
    }, () => {
      this.isError = true;
      this.message = 'Thông tin đăng nhập không chính xác';
    });
  }

  resetMessageStatus() {
    this.isError = false;
    this.message = '';
  }

}
