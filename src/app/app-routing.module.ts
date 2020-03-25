import { LoginComponent } from './_pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedUserGuard } from './_core/guards/logged-user.guard';
import { AppLayoutComponent } from './_layouts/app-layout/app-layout.component';
import { AdminGuard } from './_core/guards/admin.guard';
import { ChangePasswordComponent } from './_pages/change-password/change-password.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AppLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'stats', pathMatch: 'full' },
      { path: 'users', loadChildren: './users/users.module#UsersModule' },
      { path: 'libraries', loadChildren: './libraries/libraries.module#LibrariesModule' },
      { path: 'stats', loadChildren: './stats/stats.module#StatsModule' },
      { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule' }
    ]
  },
  {
    path: 'lib',
    component: AppLayoutComponent,
    canActivate: [LoggedUserGuard],
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      { path: 'books', loadChildren: './books/books.module#BooksModule' },
      { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  // redirect to /
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
