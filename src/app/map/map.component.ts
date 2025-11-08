import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, MatCardModule], // Required for ngStyle, ngIf, mat-card
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {}
