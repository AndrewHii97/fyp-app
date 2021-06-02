import { TestBed } from '@angular/core/testing';

import { HousingUnitService } from './housing-unit.service';

describe('HousingUnitService', () => {
  let service: HousingUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
