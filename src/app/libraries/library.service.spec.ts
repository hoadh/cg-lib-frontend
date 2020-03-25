import { TestBed } from '@angular/core/testing';

import { LibraryService } from './library.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('LibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [HttpClient],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: LibraryService = TestBed.get(LibraryService);
    expect(service).toBeTruthy();
  });
});
