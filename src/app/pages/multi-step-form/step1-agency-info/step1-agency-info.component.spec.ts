import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1AgencyInfoComponent } from './step1-agency-info.component';

describe('Step1AgencyInfoComponent', () => {
  let component: Step1AgencyInfoComponent;
  let fixture: ComponentFixture<Step1AgencyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step1AgencyInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Step1AgencyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
