import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent }, // Home now at /home
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // redirect '' to /home
    ],
  },
  { path: '**', redirectTo: 'home' }, // catch-all redirects to /home
];
