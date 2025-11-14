import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { map, Observable, startWith } from 'rxjs';

// Define type for South America data
interface SouthAmericaData {
  [country: string]: {
    states: {
      [state: string]: string[];
    };
  };
}

@Component({
  selector: 'app-step2-requested-service-info',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './step2-requested-service-info.component.html',
  styleUrls: ['./step2-requested-service-info.component.scss'],
})
export class Step2RequestedServiceInfoComponent implements OnInit {
  // Main reactive form
  form!: FormGroup;

  // Dataset for countries → states → cities
  southAmerica: SouthAmericaData = {
    Brazil: {
      states: {
        'Rio Grande do Sul': ['Porto Alegre', 'Caxias do Sul', 'Gramado'],
        'São Paulo': ['São Paulo', 'Campinas', 'Santos'],
      },
    },
    Argentina: {
      states: {
        'Buenos Aires': ['Buenos Aires City', 'La Plata'],
        Mendoza: ['Mendoza City'],
      },
    },
    Chile: {
      states: {
        'Santiago Metropolitan': ['Santiago', 'Providencia'],
        Valparaíso: ['Valparaíso', 'Viña del Mar'],
      },
    },
  };
  // Flag to enable custom country input after selecting 'Not listed'
  enableCustomCountry: boolean = false;
  // List of services
  serviceTypes: string[] = [
    'Flights',
    'Transfer',
    'Accommodation',
    'Package',
    'Tour',
    'Not listed',
  ];

  // Predefined services (excluding 'Not listed')
  predefinedServices: string[] = this.serviceTypes.filter((s) => s !== 'Not listed');

  // Control for service input typing
  serviceInput = new FormControl<string>('');

  // Flag to enable custom service input after selecting 'Not listed'
  enableCustomService: boolean = false;

  // Observable for filtered services in autocomplete
  filteredServices$!: Observable<string[]>;

  // Observable for filtered country names in autocomplete
  filteredCountries$!: Observable<string[]>;

  // All country names extracted from dataset
  allCountries: string[] = Object.keys(this.southAmerica);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      serviceTypes: [[], Validators.required],
      destinations: this.fb.array([this.createDestinationGroup()]),
    });

    // Service autocomplete
    this.filteredServices$ = this.serviceInput.valueChanges.pipe(
      startWith(''),
      map((value) => value ?? ''), // Ensure value is a string
      map((value: string) => this.filterServices(value))
    );

    this.initializeCountryFilter(0);
  }

  /** Filter service list by typed value */
  filterServices(value: string): string[] {
    const filterValue = value.toLowerCase();
    let options = this.predefinedServices.filter((s) => s.toLowerCase().includes(filterValue));
    if (!this.enableCustomService) {
      options = options.concat(['Not listed']);
    }
    return options;
  }

  /** filter to show "Not listed" only if custom is OFF */
  filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    let options = this.allCountries.filter((c) => c.toLowerCase().includes(filterValue));

    if (!this.enableCustomCountry) {
      options = options.concat(['Not listed']);
    }
    return options;
  }

  /**
   * Add a service to the selected list
   * @param service - selected or typed service name
   */
  addServiceSelection(service: string): void {
    const trimmed = service.trim();
    if (!trimmed) return; // Ignore empty input

    if (trimmed === 'Not listed') {
      this.enableCustomService = true;
      this.serviceInput.reset('');
      return;
    }

    if (this.predefinedServices.includes(trimmed) || this.enableCustomService) {
      const selected: string[] = this.form.get('serviceTypes')?.value || [];
      if (!selected.includes(trimmed)) {
        selected.push(trimmed);
        this.form.patchValue({ serviceTypes: selected });
      }
      this.serviceInput.reset('');
      this.enableCustomService = false; // Reset after adding custom
    }
  }

  /** Remove a service from the selected list */
  removeService(service: string): void {
    const selected: string[] = this.form.get('serviceTypes')?.value || [];
    const index = selected.indexOf(service);
    if (index >= 0) {
      selected.splice(index, 1);
      this.form.patchValue({ serviceTypes: selected });
    }
  }

  removeCountry(country: string, index: number): void {
    const dest = this.destinations.at(index) as FormGroup;
    const selected: string[] = dest.value.countries || [];
    const idx = selected.indexOf(country);
    if (idx > -1) {
      selected.splice(idx, 1);
      dest.patchValue({ countries: selected });
    }
  }

  /** Shortcut getter for selected services */
  get selectedServices(): string[] {
    return this.form.get('serviceTypes')?.value || [];
  }

  /** Creates a full destination block with countries, states, and cities */
  createDestinationGroup(): FormGroup {
    return this.fb.group({
      countries: [[]],
      states: [[]],
      cities: [[]],
      countryInput: [''], // Only this input
    });
  }

  /** Creates a *minimal* block that is used ONLY for custom countries */

  /** Returns destinations FormArray */
  get destinations(): FormArray {
    return this.form.get('destinations') as FormArray;
  }

  /** Initializes the filtering observable for country autocomplete */
  initializeCountryFilter(index: number): void {
    const dest = this.destinations.at(index) as FormGroup;
    const inputControl = dest.get('countryInput') as FormControl;
    this.filteredCountries$ = inputControl.valueChanges.pipe(
      startWith(''),
      map((c: string) => this.filterCountries(c)) // Explicitly type c as string
    );
  }

  /**
   * Add a country to the selected list
   * @param country - selected country name
   * @param index - index of destination block
   */
  /**
   * Add a country to the selected list
   */
  addCountrySelection(country: string, index: number): void {
    const dest = this.destinations.at(index) as FormGroup;
    const selected: string[] = dest.value.countries || [];
    const trimmed = country.trim();

    if (!trimmed) return;

    if (trimmed === 'Not listed') {
      this.enableCustomCountry = true;
      dest.get('countryInput')?.reset('');
      return;
    }

    // Allow predefined OR custom (if enabled)
    if (this.allCountries.includes(trimmed) || this.enableCustomCountry) {
      if (!selected.includes(trimmed)) {
        selected.push(trimmed);
        dest.patchValue({ countries: selected });
      }
      dest.get('countryInput')?.reset('');
      this.enableCustomCountry = false; // Reset after use
    }
  }
  /** Add a **full** destination block (real countries) */
  addDestinationBlock(): void {
    const newDest = this.createDestinationGroup();
    this.destinations.push(newDest);
    this.initializeCountryFilter(this.destinations.length - 1);
  }

  /**
   * Get states for a country
   * @param country - selected country
   * @returns list of states
   */
  getStates(country: string): string[] {
    if (!country || country === 'Not listed') return [];
    return Object.keys(this.southAmerica[country]?.states || {});
  }

  /**
   * Get cities for a country & state
   * @param country - selected country
   * @param state - selected state
   * @returns list of cities
   */
  getCities(country: string, state: string): string[] {
    if (!country || !state || country === 'Not listed' || state === 'Not listed') return [];
    return this.southAmerica[country]?.states[state] || [];
  }

  /** Handle form submission */
  onSubmit(): void {
    console.log('Form Value:', this.form.value);
  }
}
