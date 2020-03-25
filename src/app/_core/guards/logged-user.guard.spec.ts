import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedUserGuard } from './logged-user.guard';
import { HttpClient } from '@angular/common/http';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedUserGuard, {
        provide: HttpClient, useClass: HttpClient
      }]
    });
  });

  it('should ...', inject([LoggedUserGuard], (guard: LoggedUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
