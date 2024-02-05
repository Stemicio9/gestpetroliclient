import { TestBed } from '@angular/core/testing';

import { GestionefornitoriService } from './gestionefornitori.service';

describe('GestionefornitoriService', () => {
  let service: GestionefornitoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionefornitoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
