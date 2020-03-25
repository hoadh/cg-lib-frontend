import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HttpBaseService } from './http-base.service';

describe('BaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [HttpClient],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: HttpBaseService = TestBed.get(HttpBaseService);
    expect(service).toBeTruthy();
  });
});
