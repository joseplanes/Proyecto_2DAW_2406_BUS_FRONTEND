import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { autenticacionInterceptor } from './interceptor/autenticacion.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([autenticacionInterceptor])),
    HttpClient,
  ],
};
