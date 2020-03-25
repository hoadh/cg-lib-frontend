import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    console.log('clicked logout()');
    this.authService.logout().subscribe( res => {
      console.log(res);
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
      this.router.navigate(['login']);
    });
  }
}
