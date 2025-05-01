// IMPORTACIONES DE ANGULAR

import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

import { map, tap, Observable } from 'rxjs';

// IMPORTACIONES DE PAQUETES DE TERCEROS

// IMPORTACIONES DE NUESTRAS IMPLEMENTACIONES
import { environment } from '@environments/environment';
import { GifMapper } from '../mapper/gif.mapper';
// Cuando usamos interfaces y las importamos se aconseja usar la palabra clave "type"
import { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';

// ----CACHÉ----
// las llaves del LocalStorage son dinámicas
// Para manejarlo en typescript utilizamos Record
// {
//  "Goku": [gif1,gif2,gif3],
//  "Saitama": [gif1,gif2,gif3],
//  "dragon ball": [gif1,gif2,gif3],

// }
// //Record <llave tipo string, valor tipo Array de Gifs>
// Record<String,Gif[]>


//Como no va a tener ninguna dependencia, lo pongo por fuera de la clase
const loadGifsFromLocalStorage = ():Record<string,Gif[]> => {
  const gifsFromLocalStorage = localStorage.getItem("historyGifs");

  return gifsFromLocalStorage ? JSON.parse(gifsFromLocalStorage): {}; // Esto no está bien, porque no estamos seguros si va a ser un objeto
}



@Injectable({ providedIn: 'root' })
export class GifService {
  constructor() {
    this.loadTrendingGifs();
    console.log('Servicio Creado');
  }

  // Inyectamos la dependencia HTTPClient de Angular
  private http = inject(HttpClient);



  // Señal para almacenar los trending Gifs
  trendingGifs = signal<Gif[]>([]);
  // Creo una señal que se utilizará para un icono de carga en el DOM
  trendingGifsIsLoading = signal(false);

  private trendingPage = signal(0);



  // Necesito una estructura de gifs -> [[gif,gif,gif],[gif,gif,gif],[gif,gif,gif],[gif,gif,gif]]
  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for(let i = 0; i < this.trendingGifs().length; i += 3){
      groups.push(this.trendingGifs().slice(i, i+3));
    }

    return groups; // [[g1,g2,g3], [g4,g5,g6], ....]
  })




  // EL VALOR DE TODAS LAS SEÑALES SE PURGA AL RECARGAR LA PAGINA, POR ENDE,
  // EL LOCALSTORAGE COMO USA UNA SEÑAL PARA GUARDAR DATOS, ENTONCES TOMARÁ EL VALOR DE LA SEÑAL VACÍA
  // RESULTANDO EN UN LOCALSTORAGE VACIO, RAZÓN POR LA CUAL DEBEMOS INICIALIZAR LA SEÑAL CON LA LLAMADA
  // AL LoadFromLocalStorage()
  searchHistory = signal<Record<string, Gif[]>>(loadGifsFromLocalStorage());

  //Cada vez que la señal searchHistory cambie, se volverá a computar el searchHistoryKeys
  searchHistoryKeys = computed(() => {
    return Object.keys(this.searchHistory());
  });

  loadTrendingGifs() {
    if(this.trendingGifsIsLoading()){
      //si esta en true, significa que hay una petición resolviéndose, asi que no hace una petición nueva
      return
    }
    //si esta en falso, lo pone en true y vamos a hacer la petición
    this.trendingGifsIsLoading.set(true);

    // Observer es un patron de diseño que permite que una Clase subscriba a un Observer que estará mirando
    // a un Sujeto/Observable, el cual, emite valores asincronamente.

    // .get devuelve un Observable que resuelve en un Object.

    // En el contexto de Angular y RxJS, el Observable actúa como el sujeto que emite valores, y los
    // componentes o servicios que se suscriben al Observable actúan como Observers.
    // Vamos a estar pendiente de lo que nuestra petición HTTP resuelva y con esa resolución, vamos a
    // obtener el objeto producto de la petición HTTP
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          // La Api de Giphy no maneja pages, sino offset
          // offset es a partir de cual gif empieza a cargar la página. Como nosotros pusimos un limit de 20 gifs, debemos cargar a partir de 20.
          offset: this.trendingPage() * 20,

        },
        //La petición no se disparará hasta que no nos suscribamos
      })
      .subscribe((respuestaPeticion) => {
        console.log( "HOLA")
        const gifs = GifMapper.mapGiphyItemsToGifArray(respuestaPeticion.data);
        // Como manejamos páginas, no usamos .set, porque sobreescribiríamos el valor de la señal.
        // Debemos usar update
        // this.trendingGifs.set(gifs);
        this.trendingGifs.update((currentGifs) => [...currentGifs,... gifs]);
        this.trendingPage.update((currentPageValue => currentPageValue +1))
        this.trendingGifsIsLoading.set(false);

        console.log(gifs);
      });

  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          q: query,
        },
        // ----PIPE y RxJS----
        // Los observable son Lazy, no ejecutandose (hacer la petición) hasta que alguien se suscriba a ellos
        // Como no se suscribe automáticamente, hay que usar pipe() para procesar la respuesta con operadores de RxJS
      })
      .pipe(
        //pipe hace que la respuesta pase por todos los operadores que tengamos hacia abajo

        // ----OPERADORES RxJS----
        // Permiten transformar lo que emitan los observable y que toda la lógica de procesamiento
        // quede en el servicio, permitiendo que los componentes reciban toda la data lo más
        // procesada posible

        //tap: permite hacer algun efecto secundario, no transformaciones, no necesita un return
        // tap(respuesta => console.log({tap1: respuesta})),
        // tap(respuesta => console.log({tap2: respuesta})),
        // tap(respuesta => console.log({tap3: respuesta}))

        //map: permite barrer cada uno de los elementos de la respuesta y regresar una transformacion totalmente diferente.
        // recibe como argumento lo que venga del operador anterior
        // map(respuesta => `Hola Mundo ${ respuesta.data.length }`))

        // hago object desestructuring y obtengo la data de la respuesta
        map(({ data }) => data),
        // serializo de GiphyItems a GifsItems
        map((giphyItems) => GifMapper.mapGiphyItemsToGifArray(giphyItems)),

        //TODO: Historial
        // ----EFECTOS SECUNDARIOS----
        // Acá tap recibe la data del primer map
        tap((items) => {
          // usamos paréntesis para hacer un return de un nuevo objeto, sin necesidad de usar llaves y la palabra  return
          this.searchHistory.update((history) => ({
            ...history, //construye un objeto literal y asigna las querys que ya tenga la señal history (Record<string,Gif[]>)

            [query.toLowerCase()]: items, // dentro de un array literal agrega la query (key) : items (valor) de tipo Gif[]
          }));
        })
      );
  }
  getHistoryGifs(query: string): Gif[] {
    // Llamamos a la señal searchHistoty() y como es un objeto, queremos la propiedad que coincida con query
    return this.searchHistory()[query] ?? [];
  }


  // ----EFECTOS----
  // cada vez que la señal cambie, el efecto se disparará
  // Guardo los Record<string,gifs[]> en LocalStorage usando un effect
  saveGifsToLocalStorage = effect(() => {
    // localStorage.setItem("llave", valor el cual es un objeto serializado a string)
    const historyGifsString = JSON.stringify(this.searchHistory())
    localStorage.setItem("historyGifs",historyGifsString);
  });

}
