import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

// Angular Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NAVBAR_CONFIG, NavbarConfig } from './navbar.config';

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
export class NavbarComponent implements OnInit {
  @Input() layout: 'main' | 'auth' = 'main';

  currentRoute: string = '';
  config: NavbarConfig = { title: '', showMenu: false, cssClass: '', menuItems: [] };

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateNavbar(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateNavbar(event.urlAfterRedirects);
      });
  }

  private updateNavbar(route: string) {
    const cleanRoute = route.endsWith('/') && route.length > 1 ? route.slice(0, -1) : route;
    this.currentRoute = cleanRoute;

    this.config = NAVBAR_CONFIG[cleanRoute] ?? {
      title: '',
      showMenu: false,
      cssClass: '',
      menuItems: [],
    };
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
