import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'app-step1-agency-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './step1-agency-info.component.html',
  styleUrls: ['./step1-agency-info.component.scss'],
})
export class Step1AgencyInfoComponent {
  // Reactive form group
  form: FormGroup;

  // Country & city options for autocomplete
  countries: string[] = ['Brazil', 'Argentina', 'United States', 'France', 'Germany', 'Japan'];
  cities: string[] = ['São Paulo', 'Rio de Janeiro', 'Buenos Aires', 'Paris', 'Berlin', 'Tokyo'];

  filteredCountries!: Observable<string[]>;
  filteredCities!: Observable<string[]>;

  constructor(private fb: FormBuilder) {
    // Initialize the form with required and optional fields
    this.form = this.fb.group({
      personType: ['', Validators.required], // Natural or Legal person
      regionType: ['', Validators.required], // National or International
      identification: ['', Validators.required], // CPF, CNPJ, Passport, Business ID
      email: ['', [Validators.required, Validators.email]], // Always required
      phone: ['', Validators.required], // Always required
      country: [''], // Optional but visible
      city: [''], // Optional but visible
      address: [''], // Optional
    });
  }

  ngOnInit(): void {
    // Setup filtered autocomplete options
    this.filteredCountries = this.form.get('country')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.countries))
    );
    this.filteredCities = this.form.get('city')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.cities))
    );
  }

  // Filter helper for autocomplete
  private _filter(value: string, list: string[]): string[] {
    const filterValue = value.toLowerCase();
    return list.filter((option) => option.toLowerCase().includes(filterValue));
  }

  // Determine the label dynamically for identification field
  get identificationLabel(): string {
    const person = this.form.get('personType')?.value;
    const region = this.form.get('regionType')?.value;
    if (person === 'Natural Person' && region === 'National') return 'CPF';
    if (person === 'Legal Person' && region === 'National') return 'CNPJ';
    if (person === 'Natural Person' && region === 'International') return 'Passport Number';
    if (person === 'Legal Person' && region === 'International') return 'Business ID';
    return 'Identification';
  }

  // Handle form submission
  onSubmit(): void {
    if (this.form.valid) {
      console.log('✅ Step 1 form data:', this.form.value);
      alert('Form submitted successfully!');
    } else {
      this.form.markAllAsTouched();
    }
  }
}
