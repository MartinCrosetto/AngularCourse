import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { routes } from './app.routes';

import localeEs from '@angular/common/locales/es-AR';
import localeFr from '@angular/common/locales/fr';
import { LocaleService } from './services/locale.service';

registerLocaleData(localeEs, 'es');
registerLocaleData(localeFr, "fr");

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Este proveedor no es reactivo, por lo que es necesario reiniciar la aplicación cada vez que se cambia el locale. Por lo tanto, debemos utilizar LocalStorage.
    {
      provide: LOCALE_ID,
      // useValue: 'es', // Aquí selecciono qué locale usar
      deps: [LocaleService], // Inyectamos el LocaleService
      useFactory: (localeService: LocaleService) => localeService.getLocale,  // Función que se ejecutará cuando este proveedor esté inicializado
    },
  ],
};
