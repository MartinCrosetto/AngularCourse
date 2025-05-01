import { Component, inject, computed } from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-gif-history-page',
  imports: [GifListComponent],
  templateUrl: './gif-history-page.component.html',

})
export default class GifHistoryPageComponent {
  //Esto es la ruta activa
  //query es un observable que va a estar emitiendo valores conforme la URL cambie
  // Ej.: si estoy en Saitama y luego paso a Goku, estoy emitiendo valores que vamos a recibir gracias
  // al ActivatedRoute, porque estamos en la misma ruta, lo que cambia son los parámetros.
  // Como los parámetros cambian dinamicamente, debemos suscribirnos al observable de ActivatedRoute

  // Tambien se puede hacer con el ActivatedRouteSnapshot, pero este solo toma la fotografía de como está en un momento
  //  y necesitamos sea dinamico

  // PRIMER FORMA

  // query = inject(ActivatedRoute).params.subscribe(
  //   params => {
  //     console.log({params})

  //     // params es un objeto que contiene pares clave-valor.
  //     // de todos los params nos interesa el query, por tanto hacemos:
  //     // params['query'] accede al valor asociado a la clave 'query' dentro del objeto params.
  //     console.log(params['query']);
  //   }
  // );


  // SEGUNDA FORMA (RECOMENDADA, usa signals)
  //Cualquier observable(aquel que tenga el suscribe) que tengamos lo transformamos a una señal
  query = toSignal(
    //como solo interesa el parametro query y es un observable (sabemos que tiene el pipe())
    inject(ActivatedRoute).params.pipe(
      map((params) => params['query'] )
    )
  )

  gifService = inject(GifService);

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()) );
}
