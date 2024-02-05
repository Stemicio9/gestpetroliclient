import { TestBed } from '@angular/core/testing';

import { GestionebasidicaricoService } from './gestionebasidicarico.service';

describe('GestionebasidicaricoService', () => {
  let service: GestionebasidicaricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionebasidicaricoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
