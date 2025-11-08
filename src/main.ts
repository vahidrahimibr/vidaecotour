// main.ts
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Standard import
import { App } from './app/app';
import { appConfig } from './app/app.config';

// Add animations to your providers
appConfig.providers = [
  ...(appConfig.providers || []),
  provideAnimations(), // ✅ Standard animations (should resolve strikethrough)
  provideHttpClient(), // ✅ Enable Angular HttpClient
];

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
