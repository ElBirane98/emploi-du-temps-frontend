import { TestBed } from '@angular/core/testing';

import { CoursService } from './cours.service';
import { provideHttpClient } from '@angular/common/http';

describe('CoursService', () => {
  let service: CoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(CoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
