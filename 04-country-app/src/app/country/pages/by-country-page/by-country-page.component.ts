import { CountryService } from './../../services/country.service';
import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/country-search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  placeholder = signal('Buscar por país');
  countryService = inject(CountryService);



  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get("query") ?? "";
  query = linkedSignal(() => this.queryParam);
  router = inject(Router);
  // ----RxRESOURCES----
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {

      if (!this.query()) return of([]);

      this.router.navigate(["/country/by-country/"], {
        queryParams: {
          
          query: request.query,

        }});

      return this.countryService.searchByCountry(request.query);
    }
  });

   // ----RESOURCES----

    // countryResource = resource({
    //   request: () => ({ query: this.query() }),
    //   loader: async ({ request }) => {

    //     if (!this.query()) return [];

    //     return await firstValueFrom(
    //       this.countryService.searchByCountry(request.query)
    //     );
    //   },
    // });
}
