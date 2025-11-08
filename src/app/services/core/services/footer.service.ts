// src/app/services/core/services/footer.service.ts

import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FOOTER_CONFIG, FooterConfig } from '../../../shared/components/footer/footer.config';

@Injectable({
  providedIn: 'root', // Makes the service available globally
})
export class FooterService {
  // Internal subject holding the current footer configuration
  private footerConfigSubject = new BehaviorSubject<FooterConfig>({ show: true });

  // Public observable exposed to components
  footerConfig$: Observable<FooterConfig> = this.footerConfigSubject.asObservable();

  constructor(private router: Router) {
    // Listen to route changes and update the footer accordingly
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd), // Only trigger on navigation completion
        map((event: NavigationEnd) => event.urlAfterRedirects || event.url)
      )
      .subscribe((currentRoute) => {
        // Match the route with our FOOTER_CONFIG
        const matchedConfig = this.findConfigForRoute(currentRoute);
        this.footerConfigSubject.next(matchedConfig);
      });
  }

  /**
   * Finds the footer configuration that matches the current route.
   * If no specific config is found, defaults to an empty footer.
   */
  private findConfigForRoute(route: string): FooterConfig {
    // Try exact match
    if (FOOTER_CONFIG[route]) {
      return FOOTER_CONFIG[route];
    }

    // Try partial matches (useful for nested routes like /about/team)
    const matchedKey = Object.keys(FOOTER_CONFIG).find((key) => route.startsWith(key));
    return matchedKey ? FOOTER_CONFIG[matchedKey] : { show: true };
  }

  /**
   * Allows manual override — e.g., temporarily hide footer
   */
  setFooterConfig(config: FooterConfig): void {
    this.footerConfigSubject.next(config);
  }
}
