import { TestBed } from '@angular/core/testing';

import { GestioneprezziService } from './gestioneprezzi.service';

describe('GestioneprezziService', () => {
  let service: GestioneprezziService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestioneprezziService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
