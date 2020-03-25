import { USER_ROLE } from 'src/app/_core/tokens/user-role';
import { AuthService } from 'src/app/_core/services/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ControlSidebarComponent } from './../control-sidebar/control-sidebar.component';
import { MainFooterComponent } from './../main-footer/main-footer.component';
import { LeftSideBarComponent } from './../left-side-bar/left-side-bar.component';
import { MainHeaderComponent } from './../main-header/main-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutComponent } from './app-layout.component';
import { NotificationComponent } from './../notification/notification.component';
import { ACCESS_TOKEN } from 'src/app/_core/tokens/access-token';
import { NotificationService } from 'src/app/_core/services/notification.service';
import { NavigationService } from 'src/app/_core/services/navigation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppLayoutComponent,
        NotificationComponent,
        MainHeaderComponent,
        LeftSideBarComponent,
        MainFooterComponent,
        ControlSidebarComponent,
      ],
      providers: [
        AuthService,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
        {
          provide: ACCESS_TOKEN, useValue: ACCESS_TOKEN
        },
        {
          provide: USER_ROLE, useValue: USER_ROLE
        },
        { provide: APP_BASE_HREF, useValue: '/' },
        NotificationService,
        NavigationService,
        HttpClient
      ],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
