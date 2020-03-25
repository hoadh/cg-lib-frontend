import { AuthService } from '../services/auth.service';
import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { USER_ROLE } from '../tokens/user-role';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, @Inject(USER_ROLE) public userRole,) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      const isLib = localStorage.getItem(this.userRole);
      return (isLib && isLib === '2');
    } else {
      return this.router.parseUrl('login');
    }
  }
}
