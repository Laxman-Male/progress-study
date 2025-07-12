import { TestBed } from '@angular/core/testing';

import { registerservice } from './register.service';

describe('ServicesService', () => {
  let service: registerservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(registerservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
