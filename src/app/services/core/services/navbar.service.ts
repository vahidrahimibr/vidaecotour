// src/app/services/core/services/navbar.service.ts

import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NAVBAR_CONFIG, NavbarConfig } from '../../../shared/components/navbar/navbar.config';

@Injectable({
  providedIn: 'root', // Makes this service globally available
})
export class NavbarService {
  // Private subject that holds the current navbar configuration state
  private navbarConfigSubject = new BehaviorSubject<NavbarConfig>({
    title: '',
    showMenu: false,
    cssClass: '',
    menuItems: [],
  });

  // Public observable so components can subscribe and react to changes
  navbarConfig$: Observable<NavbarConfig> = this.navbarConfigSubject.asObservable();

  constructor(private router: Router) {
    // On service initialization, set the initial navbar config
    this.updateNavbarConfig(this.router.url);

    // Listen to route changes and update config when navigation ends
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateNavbarConfig(event.urlAfterRedirects);
      });
  }

  /**
   * Updates the navbar configuration based on the current route
   */
  private updateNavbarConfig(route: string): void {
    // Remove trailing slash if present (for consistency)
    const cleanRoute = route.endsWith('/') && route.length > 1 ? route.slice(0, -1) : route;

    // Get corresponding config from NAVBAR_CONFIG or default empty
    const config = NAVBAR_CONFIG[cleanRoute] ?? {
      title: '',
      showMenu: false,
      cssClass: '',
      menuItems: [],
    };

    // Push the new configuration to all subscribers
    this.navbarConfigSubject.next(config);
  }

  /**
   * Returns the current navbar configuration snapshot (synchronously)
   */
  getCurrentConfig(): NavbarConfig {
    return this.navbarConfigSubject.value;
  }
}
