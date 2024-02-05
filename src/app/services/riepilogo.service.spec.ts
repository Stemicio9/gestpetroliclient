import { TestBed } from '@angular/core/testing';

import { RiepilogoService } from './riepilogo.service';

describe('RiepilogoService', () => {
  let service: RiepilogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiepilogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
