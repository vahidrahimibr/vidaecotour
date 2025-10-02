import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NAVBAR_CONFIG, NavbarConfig } from './navbar.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    // Normalize route: remove trailing slash
    const cleanRoute = route.endsWith('/') && route.length > 1 ? route.slice(0, -1) : route;

    this.currentRoute = cleanRoute;

    // Load navbar config or fallback
    this.config = NAVBAR_CONFIG[cleanRoute] ?? {
      title: '',
      showMenu: false,
      cssClass: '',
      menuItems: [],
    };
  }
}
