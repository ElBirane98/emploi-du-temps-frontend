import { TestBed } from '@angular/core/testing';

import { SeanceService } from './seance.service';
import { provideHttpClient } from '@angular/common/http';

describe('SeanceService', () => {
  let service: SeanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(SeanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
