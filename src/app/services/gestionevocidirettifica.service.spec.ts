import { TestBed } from '@angular/core/testing';

import { GestionevocidirettificaService } from './gestionevocidirettifica.service';

describe('GestionevocidirettificaService', () => {
  let service: GestionevocidirettificaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionevocidirettificaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
