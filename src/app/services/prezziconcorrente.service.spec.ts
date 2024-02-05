import { TestBed } from '@angular/core/testing';

import { PrezziconcorrenteService } from './prezziconcorrente.service';

describe('PrezziconcorrenteService', () => {
  let service: PrezziconcorrenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrezziconcorrenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
