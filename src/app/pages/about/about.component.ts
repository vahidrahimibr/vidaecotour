import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule, FontAwesomeModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;

  constructor(private titleService: Title, private metaService: Meta) {
    // ✅ Set SEO meta tags for About page
    this.titleService.setTitle('About Vida Eco Tour - Sustainable Travel Experts');
    this.metaService.addTags([
      {
        name: 'description',
        content: 'Learn about Vida Eco Tour, our mission, and sustainable travel services',
      },
      { name: 'keywords', content: 'about us, eco-tourism, sustainable travel, company' },
      { property: 'og:title', content: 'About Vida Eco Tour - Sustainable Travel Experts' },
      {
        property: 'og:description',
        content: 'Learn about Vida Eco Tour, our mission, and sustainable travel services',
      },
      { property: 'og:url', content: 'https://www.vidaecotour.com.br/about' },
    ]);
  }
}
