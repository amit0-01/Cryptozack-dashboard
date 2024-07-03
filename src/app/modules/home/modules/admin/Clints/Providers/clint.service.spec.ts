import { TestBed } from '@angular/core/testing';

import { ClintService } from './clint.service';

describe('ClintService', () => {
  let service: ClintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
