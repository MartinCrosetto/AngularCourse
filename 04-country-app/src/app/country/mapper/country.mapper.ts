import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestCountryItemToCountryItem(
    RestCountryItem: RESTCountry
  ): Country {
    return {
      cca2: RestCountryItem.cca2,
      flag: RestCountryItem.flag,
      flagsSvg: RestCountryItem.flags.svg, // notar que le estamos poniendo otro nombre
      name: RestCountryItem.translations['spa'].common ?? 'No name', //usamos Nullish Coalescing Operator
      capital: RestCountryItem.capital?.join(','),
      population: RestCountryItem.population,
      region: RestCountryItem.region,
      subRegion: RestCountryItem.subregion,
    };
  }
  static mapRestCountryArrayToCountryArray(
    RestCountryItems: RESTCountry[]
  ): Country[] {
    return RestCountryItems.map((RestCountryItem: RESTCountry) =>
      CountryMapper.mapRestCountryItemToCountryItem(RestCountryItem)
    );
  }
}
