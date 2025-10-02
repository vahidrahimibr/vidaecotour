// src/app/services/core/services/footer.service.ts
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FOOTER_CONFIG, FooterConfig } from '../../../shared/components/footer/footer.config';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  // Current footer config observable
  private footerConfigSubject = new BehaviorSubject<FooterConfig>({ show: true });
  footerConfig$ = this.footerConfigSubject.asObservable();

  constructor(private router: Router) {
    // Update footer whenever route changes
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const config = FOOTER_CONFIG[event.urlAfterRedirects] || { show: true };
        this.footerConfigSubject.next(config);
      });
  }

  // Optional: allow manual update from a component
  setFooterConfig(config: FooterConfig) {
    this.footerConfigSubject.next(config);
  }
}
