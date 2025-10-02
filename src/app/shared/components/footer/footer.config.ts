// src/app/shared/components/footer/footer.config.ts
import { ThemePalette } from '@angular/material/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

export interface FooterButton {
  label: string;
  path?: string;
  icon?: string;
  color?: ThemePalette;
}

export interface FooterSocial {
  icon: IconDefinition; // FontAwesome icon
  link: string; // external URL
  label: string; // accessibility label
}

export interface FooterConfig {
  text?: string;
  cssClass?: string;
  buttons?: FooterButton[];
  social?: FooterSocial[];
  show?: boolean;
}

// FontAwesome imports
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

export const FOOTER_CONFIG: Record<string, FooterConfig> = {
  '/home': {
    text: 'Welcome to VidaEcoTour!',
    cssClass: 'footer-home',
    buttons: [
      { label: 'Contact Us', path: '/contact', color: 'primary', icon: 'email' },
      { label: 'About', path: '/about', color: 'accent' },
    ],
    social: [
      { icon: faFacebook, link: '', label: 'Facebook' },
      { icon: faTwitter, link: '', label: 'Twitter' },
      { icon: faInstagram, link: 'https://www.instagram.com/vidaecotour/', label: 'Instagram' }, // ✅ updated
      { icon: faLinkedin, link: '', label: 'LinkedIn' },
      { icon: faWhatsapp, link: '', label: 'WhatsApp' },
    ],
  },
  '/about': {
    text: `
    Get in Touch<br>
    Email: <a href="mailto:info@vidaecotour.com">info@vidaecotour.com</a><br>
    Phone: +55 51981745303<br>
    São José do Hortêncio - RS, 95755-000
  `,
    cssClass: 'footer-about',
    social: [
      { icon: faFacebook, link: 'https://www.facebook.com', label: 'Facebook' },
      { icon: faInstagram, link: 'https://www.instagram.com/vidaecotour/', label: 'Instagram' },
      { icon: faLinkedin, link: 'https://www.linkedin.com', label: 'LinkedIn' },
    ],
  },

  '/contact': {
    text: 'Get in touch with our team',
    cssClass: 'footer-contact',
    buttons: [
      { label: 'Home', path: '/home', color: 'primary' },
      { label: 'About', path: '/about', color: 'accent' },
    ],
  },
  '/login': { show: false },
  '/register': { show: false },
};
