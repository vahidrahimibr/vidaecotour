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
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export const FOOTER_CONFIG: Record<string, FooterConfig> = {
  '/home': {
    text: 'Welcome to VidaEcoTour!',
    cssClass: 'footer-home',
    buttons: [
      { label: 'Contact Us', path: '/contact', color: 'primary', icon: 'email' },
      { label: 'About', path: '/about', color: 'accent' },
    ],
    social: [
      // { icon: faFacebook, link: '', label: 'Facebook' },
      //{ icon: faTwitter, link: '', label: 'Twitter' },
      { icon: faInstagram, link: 'https://www.instagram.com/vidaecotour/', label: 'Instagram' },
      //{ icon: faLinkedin, link: '', label: 'LinkedIn' },
      { icon: faWhatsapp, link: 'https://wa.me/5551981745303', label: 'WhatsApp' },
    ],
  },
  '/about': {
    text: `
  Get in Touch<br>
  Email: <a href="mailto:info@vidaecotour.com.br">info@vidaecotour.com.br</a><br>
  Phone: <a href="tel:+5551981745303">+55 51 98174-5303</a><br>
  Address: São José do Hortêncio - RS, 95755-000
`,
    cssClass: 'footer-about',
    social: [
      // { icon: faFacebook, link: 'https://www.facebook.com', label: 'Facebook' },
      { icon: faInstagram, link: 'https://www.instagram.com/vidaecotour/', label: 'Instagram' },
      { icon: faWhatsapp, link: 'https://wa.me/5551981745303', label: 'WhatsApp' },

      //{ icon: faLinkedin, link: 'https://www.linkedin.com', label: 'LinkedIn' },
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
