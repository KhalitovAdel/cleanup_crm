import { TestBed } from '@angular/core/testing';

import { MaterialCalculationService } from './material-calculation.service';

describe('MaterialCalculationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialCalculationService = TestBed.get(MaterialCalculationService);
    expect(service).toBeTruthy();
  });
});
