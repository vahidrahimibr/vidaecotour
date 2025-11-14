import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-multi-step-wizard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatIconModule],
  templateUrl: './multi-step-wizard.component.html',
  styleUrls: ['./multi-step-wizard.component.scss'],
})
export class MultiStepWizardComponent {
  currentStep = 1;
  totalSteps = 2; // Update if you add more later

  constructor(public router: Router) {
    router.events.subscribe(() => {
      const url = router.url;
      if (url.includes('step1')) this.currentStep = 1;
      else if (url.includes('step2')) this.currentStep = 2;
    });
  }

  get progressValue(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
}
