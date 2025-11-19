import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { WizardStateService } from '../../../services/core/services/wizard-state.service';
@Component({
  selector: 'app-multi-step-wizard',
  standalone: true,
  imports: [RouterModule, MatProgressBarModule, MatIconModule],
  templateUrl: './multi-step-wizard.component.html',
  styleUrls: ['./multi-step-wizard.component.scss'],
})
export class MultiStepWizardComponent implements OnInit {
  totalSteps = 2;

  constructor(public router: Router, public wizard: WizardStateService) {}

  ngOnInit(): void {
    // Sync current step with URL
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const url = this.router.url;
      if (url.includes('step1')) this.wizard.setCurrentStep(1);
      if (url.includes('step2')) this.wizard.setCurrentStep(2);
    });

    // Load saved progress when wizard loads
    this.wizard.loadFromStorage();
  }

  get currentStep(): number {
    return this.wizard.getCurrentStep();
  }

  get progressValue(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  canGoToStep(step: number): boolean {
    return step === 1 || !!this.wizard.getStep(step - 1);
  }
}
