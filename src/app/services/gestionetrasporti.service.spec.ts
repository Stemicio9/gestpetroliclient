import { TestBed } from '@angular/core/testing';

import { GestionetrasportiService } from './gestionetrasporti.service';

describe('GestionetrasportiService', () => {
  let service: GestionetrasportiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionetrasportiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
