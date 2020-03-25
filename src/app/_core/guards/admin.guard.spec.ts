import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule } from '@angular/router';
import { USER_ROLE } from './../tokens/user-role';
import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { HttpClient } from '@angular/common/http';
import { ACCESS_TOKEN } from '../tokens/access-token';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, AuthService, HttpClient,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
        {
          provide: ACCESS_TOKEN, useValue: ACCESS_TOKEN
        },
        {
          provide: USER_ROLE, useValue: USER_ROLE
        }
      ],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
    });
  });

  // TODO
  // it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
  //   expect(guard).toBeTruthy();
  // }));
});
