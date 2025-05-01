import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { GifService } from './../../services/gifs.service';

import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

// const imageUrls: string[] = [
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
// ];

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// AfterViewInit es uno de los pasos del ciclo de vida de los componentes de Angular que nos indicará llamar un método cuando los componentes ya fueron renderizados (la vista)

export default class TrendingPageComponent implements AfterViewInit{
  //De existir una instancia del GifService la inyecta, de no existir crea una instancia y la inyecta
  gifService = inject(GifService);

  scrollStateService = inject(ScrollStateService);

  //viewChild("selector") -> toma la referencia de un solo elemento HTML hijo
  //viewChildren("selector") -> toma la referencia a un conjunto de elementos HTML hijos
  // ambos devuelven una signal
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv'); //ref indica que es una referencia al HTML.

  //Luego de que se destruyo el componente y cuando la vista es inicializada nuevamente, debemos mover el scroll
  //Cuando la vista es inicializada debemos mover el scroll,
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) {
      return;
    }
    //Le asignamos el valor que tenía guardado el servicio del trendingScrollState()
    scrollDiv.scrollTop = this.scrollStateService.getTrendingScrollState()
  }

  onScroll(event: Event) {
    // ?.nativeElemente es el elemento html
    // Posee un signo de interrogacion porque al momento en que el componente se construye, todavía no existe el HTML, existiendo un momento
    // de tiempo en el cual a pesar que exista el elemento HTML no hay una referencia.
    // También puede ocurrir que exista una condición que hayamos puesto por la cual el elemento no haya sido aun construido.
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) {
      return;
    }

    //Variables a manejar en el infinite scroll:
    // El tamaño del Viewpoint de la persona (en px)
    // El ScrollHeight que hizo (en px) -> scrollTop
    // El tamaño del contenido (en px) -> scrollHeight

    // Tamaño del ViewPoint del cliente (que tan grande es la pantalla)
    const clientHeight = scrollDiv.clientHeight;
    // Posición actual del scroll
    const scrollTop = scrollDiv.scrollTop;

    // El máximo posible de scroll que se puede hacer
    const scrollHeight = scrollDiv.scrollHeight;

    // Debo sumar: scrollTop + clientHeight y si supera el scrollHeight maximo de la pantalla o esta cerca, ahi debo hacer la petición de la siguiente página
    // los 300px son de gracia para que detecte el final antes
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight; // devuelve un booleano

    this.scrollStateService.setTrendingScrollState(scrollTop);
    if (isAtBottom) {
      //TODO: cargar la siguiente página de gifs
      this.gifService.loadTrendingGifs();
    }
  }
}
