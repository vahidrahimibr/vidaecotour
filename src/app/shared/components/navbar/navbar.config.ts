export interface NavbarConfig {
  title: string;
  showMenu: boolean;
  cssClass?: string;
  menuItems?: { label: string; path: string }[];
}

const DEFAULT_MENU = [
  { label: 'Home', path: '/home' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const NAVBAR_CONFIG: Record<string, NavbarConfig> = {
  '/': {
    title: 'Welcome to VidaEcoTour!',
    showMenu: true,
    cssClass: 'navbar-home',
    menuItems: DEFAULT_MENU,
  },
  '/home': {
    title: 'Welcome to VidaEcoTour!',
    showMenu: true,
    cssClass: 'navbar-home',
    menuItems: DEFAULT_MENU,
  },
  '/about': {
    title: 'Learn About Us',
    showMenu: true,
    cssClass: 'navbar-about',
    menuItems: DEFAULT_MENU,
  },
  '/contact': {
    title: 'Contact Us',
    showMenu: true,
    cssClass: 'navbar-contact',
    menuItems: DEFAULT_MENU,
  },
  '/login': {
    title: '',
    showMenu: false,
    cssClass: 'navbar-auth',
  },
  '/register': {
    title: '',
    showMenu: false,
    cssClass: 'navbar-auth',
  },
};
