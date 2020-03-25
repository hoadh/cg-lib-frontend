import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { USER_ROLE } from '../tokens/user-role';

describe('NavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: USER_ROLE, useValue: USER_ROLE
    }]
  }));

  it('should be created', () => {
    const service: NavigationService = TestBed.get(NavigationService);
    expect(service).toBeTruthy();
  });
});
