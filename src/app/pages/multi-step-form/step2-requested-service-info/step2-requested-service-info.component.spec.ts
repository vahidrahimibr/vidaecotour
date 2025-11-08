import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2RequestedServiceInfoComponent } from './step2-requested-service-info.component';

describe('Step2RequestedServiceInfoComponent', () => {
  let component: Step2RequestedServiceInfoComponent;
  let fixture: ComponentFixture<Step2RequestedServiceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step2RequestedServiceInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2RequestedServiceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
