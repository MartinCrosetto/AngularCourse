import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/pages/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information-page.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  //----SNAPSHOT----
  //Es una captura única de los parámetros de la ruta activa en el momento exacto en que se accede a ellos
  //NO se actualiza automáticamente si los parámetros de la ruta cambian
  //NO evita peticiones - simplemente es una forma no reactiva de acceder a los datos de la ruta
  countryCode = inject(ActivatedRoute).snapshot.params['code']; // o paramsmap("code")
  countryService = inject(CountryService);
  // Como vamos a conectar un Observable usamos rxResource
  countryResource = rxResource({
    request: ()=>({ code: this.countryCode}),
    loader: ({request}) => {
      //Debemos retornar un Observable
      return this.countryService.searchCountryByAlphaCode(request.code);
    }
  })

}
