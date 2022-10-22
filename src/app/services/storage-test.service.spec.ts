import { TestBed } from '@angular/core/testing';

import { StorageTestService } from './storage-test.service';

describe('StorageTestService', () => {
  let service: StorageTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
