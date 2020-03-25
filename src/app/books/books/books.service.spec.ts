import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('BooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [HttpClient],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: BooksService = TestBed.get(BooksService);
    expect(service).toBeTruthy();
  });
});
