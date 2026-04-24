import { TestBed } from '@angular/core/testing';

import { EnseignantService } from './enseignant.service';
import { provideHttpClient } from '@angular/common/http';

describe('EnseignantService', () => {
  let service: EnseignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(EnseignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
