import { Component, inject, signal } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe,RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  // inyectamos el objeto Router donde esta toda la información de la ruta
  router = inject(Router);
  routes = routes.map((route) => ({
    path: route.path,
    title: `${route.title ?? 'Maps en Angular'}`,
  })).filter(route => route.path !== '**') // filtramos la ruta que redirige a fullscreen
  // cuando un objeto es un observable se puede utilizar el $ dentro de su nombre
  // nos suscribimos a los eventos del router, en este caso a los eventos de la ruta
  // el pipe me permitira poder ejecutar unas piezas en el flujo de las emisiones de estos eventos.
  // Los observables NO EMITEN NADA SI NO NOS SUSCRIBIMOS A ELLOS (por ende el console.log no se ejecutara)
  pageTitle$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    tap((event)=> console.log(event)),
    // el operador map es un operador de rxjs que me permite transformar el flujo de datos
    // en este caso me permite transformar el evento en un objeto que contenga la propiedad title
    map((event) => event.url),
    map(url => routes.find(route => `/${route.path}` === url)?.title ?? 'Maps en Angular')

  )
}
