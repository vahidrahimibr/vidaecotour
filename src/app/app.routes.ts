import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Step1AgencyInfoComponent } from './pages/multi-step-form/step1-agency-info/step1-agency-info.component';
import { Step2RequestedServiceInfoComponent } from './pages/multi-step-form/step2-requested-service-info/step2-requested-service-info.component';
import { RegisterComponent } from './pages/register/register.component';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'multi-step-form/step1', component: Step1AgencyInfoComponent },
      { path: 'multi-step-form/step2', component: Step2RequestedServiceInfoComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
