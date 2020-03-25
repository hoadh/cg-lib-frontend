import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ACCESS_TOKEN } from '../tokens/access-token';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: HttpClient, useClass: HttpClient,
    },
    {
      provide: ACCESS_TOKEN, useValue: ACCESS_TOKEN
    }],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
