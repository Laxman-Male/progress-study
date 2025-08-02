import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnPlanDescriptionComponent } from './own-plan-description.component';

describe('OwnPlanDescriptionComponent', () => {
  let component: OwnPlanDescriptionComponent;
  let fixture: ComponentFixture<OwnPlanDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnPlanDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnPlanDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
