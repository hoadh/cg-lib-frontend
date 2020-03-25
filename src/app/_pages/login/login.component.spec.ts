import { USER_ROLE } from '../../_core/tokens/user-role';
import { ACCESS_TOKEN } from '../../_core/tokens/access-token';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/_core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../_shared/shared.module';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService,
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
      ],
      imports: [SharedModule, FormsModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
