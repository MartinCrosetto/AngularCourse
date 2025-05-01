import { CountryMapper } from './../mapper/country.mapper';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay, tap, of } from 'rxjs';

import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';



const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor() {}

  // Inyección de dependencia de la instanica HttpClient(debe estar proveído en el app.config)
  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>; // Tipo de objeto similar a un set (colección), no necesito inicializarlo porque ya esta inicializado como Map( es un objeto Map vacío inicialmente)

  private queryCacheCountry = new Map<string, Country[]>;

  private queryCacheRegion = new Map<string, Country[]>;


  searchByCapital(query: string):Observable<Country[]> {
    query = query.toLowerCase();

    //Usamos el caché para verificar si ya existe el objeto query que corresponda mostrar
    if(this.queryCacheCapital.has(query)) return of(this.queryCacheCapital.get(query) ?? [])

    console.log(`Peticionando al servidor por ${query}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(

      map( (respuestaPeticion) => CountryMapper.mapRestCountryArrayToCountryArray(respuestaPeticion) ),
      //Una vez tenemos transformada la petición a Country[], hacemos un efecto secundario para que la cachee
      tap((countries) => this.queryCacheCapital.set(query,countries)),
      catchError((error) => {
        //El error que tiró la petición erronea lo ponemos en consola.
        console.log("Error fetching", error);
        // El catchError debe retornar un Observable o lanzar una excepción
        // throwError genera un Observable<never> y hasta ahí llega la ejecución
        return throwError(() => new Error(`No se pudo obtener países con el query: ${query}`));
      }),
    )

  }

  searchByCountry(query:string):Observable<Country[]>{
    query = query.toLowerCase();

    if(this.queryCacheCountry.has(query)) return of(this.queryCacheCountry.get(query) ?? [])

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(

      map( respuestaPeticion => CountryMapper.mapRestCountryArrayToCountryArray(respuestaPeticion) ),

      tap((countries) => this.queryCacheCountry.set(query,countries)),

      delay(2000),

      catchError(error => {
        //El error que tiró la petición erronea lo ponemos en consola.
        console.log("Error fetching", error);
        // El catchError debe retornar un Observable o lanzar una excepción
        // throwError genera un Observable<never> y hasta ahí llega la ejecución
        return throwError(() => new Error(`No se pudo obtener países con el query: ${query}`));
      }),
    )
  }

  searchByRegion(query:Region | null):Observable<Country[]>{

    if(query == null) return of([])
      
    if(this.queryCacheRegion.has(query)) return of(this.queryCacheRegion.get(query) ?? [])

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${query}`)
    .pipe(

      map( respuestaPeticion => CountryMapper.mapRestCountryArrayToCountryArray(respuestaPeticion) ),

      tap((countries) => this.queryCacheRegion.set(query,countries)),

      delay(2000),

      catchError(error => {

        console.log("Error fetching", error);

        return throwError(() => new Error(`No se pudo obtener países con el query: ${query}`));
      }),
    )
  }


  searchCountryByAlphaCode(code:string):Observable<Country | undefined >{
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(

      map( respuestaPeticion => CountryMapper.mapRestCountryArrayToCountryArray(respuestaPeticion) ), //Recibe unarreglo RESTCOUNTRY[] con un solo elemento y
      // Devuelve un arreglo Country con un solo elemento
      tap(countries => console.log(countries)),
      map( countries => countries.at(0)), //Esto se hace para obtener el unico objeto del arreglo Country[]
      catchError(error => {
        //El error que tiró la petición erronea lo ponemos en consola.
        console.log("Error fetching", error);
        // El catchError debe retornar un Observable o lanzar una excepción
        // throwError genera un Observable<never> y hasta ahí llega la ejecución
        return throwError(() => new Error(`No se pudo obtener países con ese código: ${code}`));
      }),
    )
  }



}
