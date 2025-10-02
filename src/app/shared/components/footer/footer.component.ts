import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; //
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { Observable } from 'rxjs';
import { FooterService } from '../../../services/core/services/footer.service';
import { FooterConfig } from './footer.config';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    NgFor,
    AsyncPipe,
    FontAwesomeModule,
  ], // ✅ include here
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faWhatsapp = faWhatsapp;

  footerConfig$!: Observable<FooterConfig>;

  constructor(private footerService: FooterService) {
    this.footerConfig$ = this.footerService.footerConfig$;
  }
}
