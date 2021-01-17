import { TestBed } from '@angular/core/testing';

import { StarbucksService } from './starbucks.service';

describe('StarbucksService', () => {
  let service: StarbucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarbucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
