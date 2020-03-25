import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CategoriesService, HttpClient],
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: CategoriesService = TestBed.get(CategoriesService);
    expect(service).toBeTruthy();
  });
});
