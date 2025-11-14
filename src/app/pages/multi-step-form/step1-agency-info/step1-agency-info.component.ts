// src/app/pages/multi-step-form/step1-agency-info/step1-agency-info.component.ts
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
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { FormDataService } from '../../../services/core/services/form-data.service';

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
  form: FormGroup;

  countries: string[] = ['Brazil', 'Argentina', 'United States', 'France', 'Germany', 'Japan'];
  cities: string[] = ['São Paulo', 'Rio de Janeiro', 'Buenos Aires', 'Paris', 'Berlin', 'Tokyo'];

  filteredCountries!: Observable<string[]>;
  filteredCities!: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService
  ) {
    // keep same controls and validators you already had
    this.form = this.fb.group({
      personType: ['', Validators.required],
      regionType: ['', Validators.required],
      identification: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: [''],
      city: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    this.filteredCountries = this.form.get('country')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.countries))
    );
    this.filteredCities = this.form.get('city')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.cities))
    );

    // Optional: If user navigated back from step2, repopulate form with stored data
    const existing = this.formDataService.getStep1Data();
    if (existing) {
      this.form.patchValue(existing);
    }
  }

  private _filter(value: string, list: string[]): string[] {
    const filterValue = value.toLowerCase();
    return list.filter((option) => option.toLowerCase().includes(filterValue));
  }

  get identificationLabel(): string {
    const person = this.form.get('personType')?.value;
    const region = this.form.get('regionType')?.value;
    if (person === 'Natural Person' && region === 'National') return 'CPF';
    if (person === 'Legal Person' && region === 'National') return 'CNPJ';
    if (person === 'Natural Person' && region === 'International') return 'Passport Number';
    if (person === 'Legal Person' && region === 'International') return 'Business ID';
    return 'Identification';
  }

  // Called on form submit (Continue / Next)
  onNext(): void {
    if (this.form.valid) {
      this.formDataService.saveStep1Data(this.form.value);
      this.router.navigate(['/multi-step-form/step2']); // Step 2 route
    } else {
      this.form.markAllAsTouched();
    }
  }
}
