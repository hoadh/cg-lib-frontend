import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BooksFakeService } from './books-fake.service';

describe('BooksFakeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [HttpClient],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: BooksFakeService = TestBed.get(BooksFakeService);
    expect(service).toBeTruthy();
  });
});
