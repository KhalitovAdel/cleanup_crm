import { TestBed } from '@angular/core/testing';

import { myHTTPService } from './myhttp.service';

describe('myHTTPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: myHTTPService = TestBed.get(myHTTPService);
    expect(service).toBeTruthy();
  });
});
