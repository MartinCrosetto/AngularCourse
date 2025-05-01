import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    // Retorna una copia del arreglo de regiones
    // para evitar que se modifique desde afuera
    return [...this._regions];
  }

  getCountryByRegion(region: string): Observable<Country[]> {
    if(!region) return of([]); // si no hay region, retornamos un Observable vacío
    console.log(region);
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url);
  }


  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryBordersByBordersAlphaCodesArray(alphaCodes:string[]): Observable<Country[]> {
    // TODO: por hacer
    // si no hay alphaCodes de los borders, retornamos un Observable vacío
    if(!alphaCodes || alphaCodes.length === 0) return of([]);

    const countriesRequests: Observable<Country>[] = [];

    alphaCodes.forEach((alphaCode) => {
      const request = this.getCountryByAlphaCode(alphaCode);
      countriesRequests.push(request);
    })
    // CombineLatest permite combinar varios Observables y esperar a que todos emitan un valor exitoso
    // si una falla, se cancelan todos los demás
    return combineLatest(countriesRequests);

  }
}
