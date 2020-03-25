import { SharedModule } from './_shared/shared.module';
import { ACCESS_TOKEN } from './_core/tokens/access-token';
import { USER_ROLE } from './_core/tokens/user-role';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './_pages/login/login.component';
import { ChangePasswordComponent } from './_pages/change-password/change-password.component';
import { HttpConfigInterceptor } from './_core/interceptors/http-config-interceptor';
import { AppLayoutComponent } from './_layouts/app-layout/app-layout.component';
import { PageLayoutComponent } from './_layouts/page-layout/page-layout.component';
import { LeftSideBarComponent } from './_layouts/left-side-bar/left-side-bar.component';
import { MainHeaderComponent } from './_layouts/main-header/main-header.component';
import { MainFooterComponent } from './_layouts/main-footer/main-footer.component';
import { ControlSidebarComponent } from './_layouts/control-sidebar/control-sidebar.component';
import { GlobalErrorHandler } from './_core/global-error-handler';
import { ServerErrorInterceptor } from './_core/interceptors/server-error-interceptor';
import { NotificationComponent } from './_layouts/notification/notification.component';
import { UsersModule } from './users/users.module';
import { LibrariesModule } from './libraries/libraries.module';
import { BooksModule } from './books/books.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    AppLayoutComponent,
    PageLayoutComponent,
    LeftSideBarComponent,
    MainHeaderComponent,
    MainFooterComponent,
    ControlSidebarComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    UsersModule,
    LibrariesModule,
    BooksModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: ServerErrorInterceptor },
    // { provide: HTTP_INTERCEPTORS, multi: true, useClass: HttpConfigInterceptor },
    { provide: ACCESS_TOKEN, useValue: ACCESS_TOKEN },
    { provide: USER_ROLE, useValue: USER_ROLE },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
