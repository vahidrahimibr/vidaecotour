import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // ensures it's available app-wide
})
export class FormDataService {
  private step1Data: any = null;

  // Save Step 1 data (Agency/Person info)
  saveStep1Data(data: any): void {
    this.step1Data = data;
  }

  // Retrieve Step 1 data
  getStep1Data(): any {
    return this.step1Data;
  }

  // Optional: clear all stored data (e.g., after submission)
  clearAllData(): void {
    this.step1Data = null;
  }
}
