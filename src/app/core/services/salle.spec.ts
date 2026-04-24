import { TestBed } from '@angular/core/testing';

import { SalleService } from './salle.service';
import { provideHttpClient } from '@angular/common/http';

describe('SalleService', () => {
  let service: SalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(SalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
