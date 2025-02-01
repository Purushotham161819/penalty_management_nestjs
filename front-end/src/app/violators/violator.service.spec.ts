import { TestBed } from '@angular/core/testing';

import { ViolatorService } from './violator.service';

describe('ViolatorService', () => {
  let service: ViolatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViolatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
