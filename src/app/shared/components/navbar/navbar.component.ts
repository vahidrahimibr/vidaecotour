import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NAVBAR_CONFIG, NavbarConfig } from './navbar.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- RouterModule added
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() layout: 'main' | 'auth' = 'main';

  currentRoute: string = '';
  config: NavbarConfig = { title: '', showMenu: false };

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateNavbar(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateNavbar((event as NavigationEnd).urlAfterRedirects);
      });
  }

  private updateNavbar(route: string) {
    this.currentRoute = route;
    this.config = NAVBAR_CONFIG[route] || { title: '', showMenu: false };
  }
}
