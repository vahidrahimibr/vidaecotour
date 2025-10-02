export interface NavbarConfig {
  title: string;
  showMenu: boolean;
  cssClass?: string;
  menuItems?: { label: string; path: string }[];
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
  '/home': {
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
    showMenu: false,
    cssClass: 'navbar-auth',
    menuItems: [],
  },
  '/register': {
    title: '',
    showMenu: false,
    cssClass: 'navbar-auth',
    menuItems: [],
  },
};
