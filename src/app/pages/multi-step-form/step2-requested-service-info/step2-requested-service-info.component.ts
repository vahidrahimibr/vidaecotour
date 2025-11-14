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
  // Observable for filtered state names in autocomplete
  filteredStates$!: Observable<string[]>;
  // Observable for filtered city names in autocomplete
  filteredCities$!: Observable<string[]>;

  // All country names extracted from dataset
  allCountries: string[] = Object.keys(this.southAmerica);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      serviceTypes: [[], Validators.required],
      destinations: this.fb.array([this.createDestinationGroup()]), // Only one
    });

    // Initialize filters for the only destination block
    this.initializeFilters(0);

    // Service filter
    this.filteredServices$ = this.serviceInput.valueChanges.pipe(
      startWith(''),
      map((value) => value ?? ''),
      map((value: string) => this.filterServices(value))
    );
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

  // Filter countries (show "Not listed" only if custom is OFF)
  filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filtered = this.allCountries.filter((c) => c.toLowerCase().includes(filterValue));

    // Show "Not listed" only if we're not in custom mode
    const dest = this.destinations.at(0) as FormGroup;
    const enableCustom = dest?.get('enableCustomCountry')?.value;

    if (!enableCustom) {
      filtered.push('Not listed');
    }

    return filtered;
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
    const countries = (dest.value.countries || []).filter((c: string) => c !== country);
    dest.patchValue({ countries });
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

      countryInput: [''],
      stateInput: [''],
      cityInput: [''],

      // Flags for custom mode
      enableCustomState: [false],
      enableCustomCity: [false],
      enableCustomCountry: [false],
    });
  }
  /** Creates a *minimal* block that is used ONLY for custom countries */

  /** Returns destinations FormArray */
  get destinations(): FormArray {
    return this.form.get('destinations') as FormArray;
  }

  /** Initializes the filtering observable for country autocomplete */
  initializeFilters(index: number): void {
    const dest = this.destinations.at(index) as FormGroup;

    // Country filter
    const countryCtrl = dest.get('countryInput') as FormControl;
    this.filteredCountries$ = countryCtrl.valueChanges.pipe(
      startWith(''),
      map((v) => v ?? ''),
      map((v) => this.filterCountries(v))
    );

    // State filter
    const stateCtrl = dest.get('stateInput') as FormControl;
    this.filteredStates$ = stateCtrl.valueChanges.pipe(
      startWith(''),
      map((v) => v ?? ''),
      map((v) => this.filterStates(v, index))
    );

    // City
    const cityCtrl = dest.get('cityInput') as FormControl;
    this.filteredCities$ = cityCtrl.valueChanges.pipe(
      startWith(''),
      map((v) => v ?? ''),
      map((v) => this.filterCities(v, index))
    );
  }

  /**
   * Add a country to the selected list
   * @param country - selected country name
   * @param index - index of destination block
   */
  /**
   * // Add country (with custom support)
   */
  addCountrySelection(country: string, index: number): void {
    const dest = this.destinations.at(index) as FormGroup;
    const trimmed = (country || '').trim();
    if (!trimmed) return;

    if (trimmed === 'Not listed') {
      dest.patchValue({ enableCustomCountry: true });
      dest.get('countryInput')?.reset('');
      return;
    }

    const countries = dest.value.countries || [];
    if (!countries.includes(trimmed)) {
      countries.push(trimmed);
      dest.patchValue({ countries });
    }

    dest.get('countryInput')?.reset('');
    dest.patchValue({ enableCustomCountry: false }); // Reset after use
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

  filterStates(value: string, index: number): string[] {
    const dest = this.destinations.at(index) as FormGroup;
    const countries = dest.value.countries || [];
    const enableCustom = dest.get('enableCustomState')?.value;

    // Collect all states from selected real countries
    const statesSet = new Set<string>();
    for (const country of countries) {
      if (this.allCountries.includes(country)) {
        const countryStates = Object.keys(this.southAmerica[country]?.states || {});
        countryStates.forEach((s) => statesSet.add(s));
      }
    }

    const filtered = Array.from(statesSet).filter((s) =>
      s.toLowerCase().includes(value.toLowerCase())
    );

    // Show "Not listed" only if custom mode is off
    if (!enableCustom) {
      filtered.push('Not listed');
    }

    return filtered;
  }
  addStateSelection(state: string, index: number): void {
    const dest = this.destinations.at(index) as FormGroup;
    const trimmed = (state || '').trim();
    if (!trimmed) return;

    if (trimmed === 'Not listed') {
      dest.patchValue({ enableCustomState: true });
      dest.get('stateInput')?.reset('');
      return;
    }

    const states = dest.value.states || [];
    if (!states.includes(trimmed)) {
      states.push(trimmed);
      dest.patchValue({ states });
    }

    dest.get('stateInput')?.reset('');
    dest.patchValue({ enableCustomState: false });
  }

  removeState(state: string, index: number): void {
    const dest = this.destinations.at(index) as FormGroup;
    const states = (dest.value.states || []).filter((s: string) => s !== state);
    dest.patchValue({ states });
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
  filterCities(value: string, index: number): string[] {
    const dest = this.destinations.at(index) as FormGroup;
    const countries = dest.value.countries || [];
    const states = dest.value.states || [];
    const enableCustom = dest.get('enableCustomCity')?.value;

    const citiesSet = new Set<string>();

    for (const country of countries) {
      if (!this.allCountries.includes(country)) continue;

      const countryData = this.southAmerica[country];
      if (!countryData) continue;

      for (const state of states) {
        const cityList = countryData.states[state] || [];
        cityList.forEach((city: string) => citiesSet.add(city));
      }
    }

    const filtered = Array.from(citiesSet).filter((c) =>
      c.toLowerCase().includes(value.toLowerCase())
    );

    if (!enableCustom) {
      filtered.push('Not listed');
    }

    return filtered;
  }
  addCitySelection(city: string, index: number): void {
    const dest = this.destinations.at(index) as FormGroup;
    const trimmed = (city || '').trim();
    if (!trimmed) return;

    if (trimmed === 'Not listed') {
      dest.patchValue({ enableCustomCity: true });
      dest.get('cityInput')?.reset('');
      return;
    }

    const cities = dest.value.cities || [];
    if (!cities.includes(trimmed)) {
      cities.push(trimmed);
      dest.patchValue({ cities });
    }

    dest.get('cityInput')?.reset('');
    dest.patchValue({ enableCustomCity: false });
  }

  removeCity(city: string, index: number): void {
    const dest = this.destinations.at(index) as FormGroup;
    const cities = (dest.value.cities || []).filter((c: string) => c !== city);
    dest.patchValue({ cities });
  }
  /** Handle form submission */
  onSubmit(): void {
    console.log('Form Value:', this.form.value);
  }
}
