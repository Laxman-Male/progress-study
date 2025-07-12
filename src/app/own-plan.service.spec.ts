import { TestBed } from '@angular/core/testing';

import { OwnPlanService } from './own-plan.service';

describe('OwnPlanService', () => {
  let service: OwnPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
