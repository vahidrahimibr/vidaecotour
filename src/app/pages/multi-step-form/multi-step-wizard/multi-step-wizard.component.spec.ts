import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStepWizardComponent } from './multi-step-wizard.component';

describe('MultiStepWizardComponent', () => {
  let component: MultiStepWizardComponent;
  let fixture: ComponentFixture<MultiStepWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiStepWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiStepWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
