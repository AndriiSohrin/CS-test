import { TestBed } from '@angular/core/testing';

import { WebApiDBService } from './web-api-db.service';

describe('WebApiDBService', () => {
  let service: WebApiDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebApiDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
