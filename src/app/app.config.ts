import { authInterceptor } from './modules/auth/interceptors/auth.interceptor';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http'; // ← Agregar withFetch
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(), // ← AGREGAR ESTO para usar Fetch API
      withInterceptors([authInterceptor])
    ),
  ]
};