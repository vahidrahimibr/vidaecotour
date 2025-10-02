// Centralized navbar configuration

export interface NavbarConfig {
  title: string;
  showMenu: boolean;
  cssClass?: string; // optional extra styles per page
  menuItems?: { label: string; path: string }[]; // NEW: dynamic menu items
}

export const NAVBAR_CONFIG: Record<string, NavbarConfig> = {
  '/': {
    title: 'Welcome to VidaEcoTour!',
    showMenu: true,
    cssClass: 'navbar-home',
    menuItems: [
      { label: 'Home', path: '/home' },
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  '/about': {
    title: 'Learn About Us',
    showMenu: true,
    cssClass: 'navbar-about',
    menuItems: [
      { label: 'Home', path: '/home' },
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  '/contact': {
    title: 'Contact Us',
    showMenu: true,
    cssClass: 'navbar-contact',
    menuItems: [
      { label: 'Home', path: '/home' },
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  '/login': {
    title: '',
    showMenu: false, // hide menu in login
    cssClass: 'navbar-auth',
  },
};
