import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../../services/core/services/navbar.service';
import { NavbarConfig } from './navbar.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() layout: 'main' | 'auth' = 'main';

  config: NavbarConfig = { title: '', showMenu: false, cssClass: '', menuItems: [] };
  private subscription!: Subscription;

  constructor(private navbarService: NavbarService) {}

  ngOnInit() {
    // Subscribe to reactive navbar updates
    this.subscription = this.navbarService.navbarConfig$.subscribe((config) => {
      this.config = config;
    });
  }

  ngOnDestroy() {
    // Prevent memory leaks
    if (this.subscription) this.subscription.unsubscribe();
  }

  getToolbarColor(): 'primary' | 'accent' | 'warn' | undefined {
    switch (this.config.cssClass) {
      case 'navbar-home':
        return 'primary';
      case 'navbar-about':
        return 'accent';
      case 'navbar-contact':
        return 'warn';
      default:
        return undefined;
    }
  }
}
