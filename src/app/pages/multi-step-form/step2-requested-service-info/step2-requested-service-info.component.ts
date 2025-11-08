import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-step2-requested-service-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatAutocompleteModule,
  ],
  templateUrl: './step2-requested-service-info.component.html',
  styleUrls: ['./step2-requested-service-info.component.scss'],
})
export class Step2RequestedServiceInfoComponent {
  // Reactive form
  serviceForm: FormGroup = new FormGroup({
    serviceType: new FormControl(''), // Tour, Transfer, Package, Flights, Other
    passengersType: new FormControl('individual'), // Individual / Group
    numberOfPassengers: new FormControl(1),
    numberOfDestinations: new FormControl(1),
    destinationCountry: new FormControl(''),
    destinationState: new FormControl(''),
    destinationCity: new FormControl(''),
    startDate: new FormControl(new Date()),
  });

  // Static lists for demo purposes
  countries: string[] = ['Brazil', 'USA', 'France', 'Germany', 'Other'];
  states: { [key: string]: string[] } = {
    Brazil: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais'],
    USA: ['California', 'New York', 'Texas'],
    France: ['Île-de-France', 'Provence', 'Normandy'],
    Germany: ['Bavaria', 'Berlin', 'Hesse'],
  };
  cities: { [key: string]: string[] } = {
    'São Paulo': ['São Paulo City', 'Campinas'],
    'Rio de Janeiro': ['Rio City', 'Niterói'],
    'Minas Gerais': ['Belo Horizonte', 'Uberlândia'],
    California: ['Los Angeles', 'San Francisco'],
    'New York': ['New York City', 'Buffalo'],
    Texas: ['Houston', 'Dallas'],
    'Île-de-France': ['Paris', 'Versailles'],
    Provence: ['Marseille', 'Nice'],
    Normandy: ['Rouen', 'Caen'],
    Bavaria: ['Munich', 'Nuremberg'],
    Berlin: ['Berlin City'],
    Hesse: ['Frankfurt', 'Wiesbaden'],
  };

  // Filtered lists for autocomplete
  filteredCountries: Observable<string[]>;
  filteredStates: string[] = [];
  filteredCities: string[] = [];

  constructor() {
    // Initialize filteredCountries
    this.filteredCountries = this.serviceForm.get('destinationCountry')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value, this.countries))
    );
  }

  // Filter helper
  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  // When country changes → filter states
  onCountrySelected() {
    const country = this.serviceForm.get('destinationCountry')!.value;
    this.filteredStates = this.states[country] || [];
    this.serviceForm.patchValue({ destinationState: '', destinationCity: '' });
    this.filteredCities = [];
  }

  // When state changes → filter cities
  onStateSelected() {
    const state = this.serviceForm.get('destinationState')!.value;
    this.filteredCities = this.cities[state] || [];
    this.serviceForm.patchValue({ destinationCity: '' });
  }

  // Next Step button clicked
  nextStep() {
    if (this.serviceForm.valid) {
      console.log('Step 2 data:', this.serviceForm.value);
      // Pass data to parent or save in service
    } else {
      this.serviceForm.markAllAsTouched();
    }
  }

  // Helper to check if Flights selected
  isFlightsSelected(): boolean {
    return this.serviceForm.get('serviceType')!.value === 'Flights';
  }
}
