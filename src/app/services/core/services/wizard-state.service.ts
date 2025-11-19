// src/app/pages/services/wizard-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WizardData {
  step1?: any;
  step2?: any;
  step3?: any;
}

@Injectable({
  providedIn: 'root',
})
export class WizardStateService {
  private data = new BehaviorSubject<WizardData>({});
  private currentStep = new BehaviorSubject<number>(1);

  // Public observables
  data$ = this.data.asObservable();
  currentStep$ = this.currentStep.asObservable();

  getCurrentStep(): number {
    return this.currentStep.value;
  }

  setCurrentStep(step: number): void {
    this.currentStep.next(step);
  }

  updateStep(step: number, stepData: any): void {
    const current = this.data.value;
    this.data.next({ ...current, [`step${step}`]: stepData } as WizardData);
  }

  getStep(step: number): any {
    return (this.data.value as any)[`step${step}`] ?? null;
  }
  getAllData(): WizardData {
    return this.data.value;
  }

  // Optional: survive page refresh
  saveToStorage(): void {
    localStorage.setItem('vidaecotour_wizard', JSON.stringify(this.data.value));
  }

  loadFromStorage(): void {
    const saved = localStorage.getItem('vidaecotour_wizard');
    if (saved) {
      this.data.next(JSON.parse(saved));
    }
  }

  clear(): void {
    this.data.next({});
    this.currentStep.next(1);
    localStorage.removeItem('vidaecotour_wizard');
  }
}
