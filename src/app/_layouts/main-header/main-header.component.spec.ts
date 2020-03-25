import { ACCESS_TOKEN } from 'src/app/_core/tokens/access-token';
import { USER_ROLE } from 'src/app/_core/tokens/user-role';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderComponent } from './main-header.component';
import { AuthService } from 'src/app/_core/services/auth.service';
import { LocationStrategy } from '@angular/common';

describe('MainHeaderComponent', () => {
  let component: MainHeaderComponent;
  let fixture: ComponentFixture<MainHeaderComponent>;

  /*
  Failed: Can't resolve all parameters for Router: (?, ?, ?, ?, ?, ?, ?, ?).
  {
    provide: Router,
    useClass: class { navigate = jasmine.createSpy('navigate'); }
  }
  */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainHeaderComponent],
      providers: [
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
        AuthService,
        {
          provide: ActivatedRoute,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
        HttpClient,
        LocationStrategy,
        {
          provide: ACCESS_TOKEN, useValue: ACCESS_TOKEN
        },
        {
          provide: USER_ROLE, useValue: USER_ROLE
        }
      ],
      imports: [
        RouterModule,
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
