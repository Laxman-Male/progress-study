import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnPlanComponent } from './own-plan.component';

describe('OwnPlanComponent', () => {
  let component: OwnPlanComponent;
  let fixture: ComponentFixture<OwnPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
