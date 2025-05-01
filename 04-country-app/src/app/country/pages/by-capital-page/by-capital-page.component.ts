import { ActivatedRoute, Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { CountryListComponent } from '../../components/country-list/country-list.component';
import { SearchInputComponent } from '../../components/country-search-input/search-input.component';
import { CountryService } from './../../services/country.service';

@Component({
  selector: 'by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  placeholder = signal('Buscar por capital de país');
  countryService = inject(CountryService);

  // ----QUERY PARAMETERS----
  // ---Traer Query Parameters---
  // Inicialmente me traerá nada, porque buscará por el parámetro de consulta query, el cual todavía no existe
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get("query") ?? "";
  query = linkedSignal(() => this.queryParam);
  // ---Cambiar Query Parameters---
  router = inject(Router);

  //----RxRESOURCES----
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    // El loader ahora no trabaja con una promesa (no usa async ni firstValueFrom())
    loader: ({ request }) => {
      console.log({query: request.query})
      // El problema del if es que no estamos regresando un Observable sino un arreglo vacío:
      // if (!this.query()) return [];
      // existen formas para regresar un arreglo vacío:
      // * En el searchByCapital si recibimos un query vacío, retornar un arreglo vacío
      // * Utilizamos 'of' de rxjs para manejar el caso en que no haya query.
      // 'of' nos permite crear un Observable que emite el valor que le pasemos.
      // En este caso, si no hay query, retornamos un Observable que emite un arreglo vacío.
      if (!this.query()) return of([]);

      // ---Cambiar Query Parameters---
      //Actualizamos el url creando el parámetro de consulta "query"
      this.router.navigate(["/country/by-capital/"], {
        queryParams: {
          //Aca podemos poner tantos query parameters como querramos
          query: request.query,
          // hola: "mundo",
        }
      })

      return this.countryService.searchByCapital(request.query);
    },
  });

  //----RESOURCES----

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     //Si no tenemos un valor en el query, retornamos []
  //     if (!this.query()) return [];
  //     // Si tenemos un valor en el query, hacemos la petición Http
  //     // return this.countryService.searchByCapital(request.query)
  //     // Esto puede devolver un Observable<Country[]> o un Observable<never[]> o undefined
  //     // Cuando trabajamos con resource, tenemos que retornar promesas.

  //     // await firstValueFrom() nos permite transformar cualquier Observable en una promesa (usamos await porque es una promesa y debemos esperar a que el
  //     // Observable emita un valor)
  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     );
  //   },
  // });

  //----HANDLERS (MANEJADORES DE EVENTOS)----
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([])

  // onSearch(query: string) {
  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //   .subscribe({
  //     next: (respuestaPeticion) => {

  //         this.isLoading.set(false);
  //         this.countries.set(respuestaPeticion);
  //     },
  //     error: (error) => {
  //       //Si hubiera alguna excepción lanzada en el service, acá se pasa por parámetro y se muestra en consola o pantalla

  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(error)
  //     }
  //   });
  // }
}
