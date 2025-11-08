import { CommonModule } from '@angular/common'; // Needed for *ngIf
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Meta, Title } from '@angular/platform-browser';
import { ContactService } from '../../services/core/services/contact.service';
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

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
    // ✅ Set SEO meta tags for Contact page
    this.titleService.setTitle('Contact Vida Eco Tour - Get in Touch');
    this.metaService.addTags([
      {
        name: 'description',
        content: 'Contact Vida Eco Tour for inquiries or booking eco-friendly travel experiences',
      },
      { name: 'keywords', content: 'contact, eco-tourism, travel inquiry, sustainable travel' },
      { property: 'og:title', content: 'Contact Vida Eco Tour - Get in Touch' },
      {
        property: 'og:description',
        content: 'Contact Vida Eco Tour for inquiries or booking eco-friendly travel experiences',
      },
      { property: 'og:url', content: 'https://www.vidaecotour.com.br/contact' },
    ]);
  }

  isSubmitting = false;

  submitForm(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.contactService.sendContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          alert(response.message || 'Thank you for contacting us!');
          this.contactForm.reset();
        },
        error: (err) => {
          const errorMsg = err?.error?.error || 'Oops! Something went wrong.';
          alert(errorMsg);
        },
        complete: () => (this.isSubmitting = false),
      });
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
