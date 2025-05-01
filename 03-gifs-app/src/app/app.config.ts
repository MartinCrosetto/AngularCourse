import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient,withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Configuramos el HTTPClient y lo proveemos para que sea utilizado en el servicio al hacer
    // private http = inject(HttpClient);


    // Esto permite que Angular utilize en el fondo las peticiones tradicionales XHR (XMLHttpRequest)
    // Si queremos trabajar con el nuevo estandar que es el Fetch usamos withFetch().

    // Ahora las peticiones de Angular siempre pasan por los Observables, pero en el fondo va a ser
    // una petición fetch.
    // Esto significa: en el nivel más bajo, Angular utiliza la API Fetch del navegador para realizar
    // las solicitudes HTTP. La API Fetch es una interfaz moderna que permite hacer solicitudes
    // de red de manera sencilla y eficiente. Así que, aunque trabajemos con Observables en Angular,
    // internamente se está utilizando Fetch para realizar las peticiones.
    provideHttpClient(withFetch()),
  ]


};
