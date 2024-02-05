import { TestBed } from '@angular/core/testing';

import { FabbisognoService } from './fabbisogno.service';

describe('FabbisognoService', () => {
  let service: FabbisognoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabbisognoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
