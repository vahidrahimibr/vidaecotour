// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ import
import { App } from './app/app';
import { appConfig } from './app/app.config';

// Add animations to your providers
appConfig.providers = [
  ...(appConfig.providers || []),
  provideAnimations(), // ✅ enable Angular animations
];

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
