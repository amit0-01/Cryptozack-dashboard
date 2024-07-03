import { TestBed } from '@angular/core/testing';

import { WallettierService } from './wallettier.service';

describe('WallettierService', () => {
  let service: WallettierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WallettierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
