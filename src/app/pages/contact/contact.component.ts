import { CommonModule } from '@angular/common'; // Needed for *ngIf
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, // For *ngIf
    ReactiveFormsModule, // For reactive forms
    MatFormFieldModule, // For mat-form-field
    MatInputModule, // For matInput and mat-label
    MatButtonModule, // For mat-raised-button
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      alert('Thank you for contacting us!');
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }
}
