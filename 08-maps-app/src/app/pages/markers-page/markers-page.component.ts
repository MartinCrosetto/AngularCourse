import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';

import {v4 as UUIDv4} from 'uuid';
import { JsonPipe } from '@angular/common';
mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit(): Promise<void> {
    if (!this.divElement()?.nativeElement) {
      console.error('No se encontró el elemento del mapa');
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    console.log(element);
    // 4. Inicializamos el mapa
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-63.235482, -32.387678], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
    // Añadimos un marcador
    const marker = new mapboxgl.Marker({
      draggable: false,
      color: 'red',
    })
    .setLngLat([-63.235482, -32.387678])
    // agregamos a la instancia del mapa que querramos
    .addTo(map);

    // añadimos un event listener al marcador
    marker.on('dragend', (event) => { console.log(event); });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click',(event) => this.mapClick(event));

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {
    console.log(event.lngLat);

    if(!this.map()) return;
    const map = this.map()!;
    const coordinates = event.lngLat;
    // Generamos un color aleatorio
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapboxMarker = new mapboxgl.Marker({
      color: color,
    })
    .setLngLat(coordinates)
    .addTo(map);

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: mapboxMarker,
    }
    // this.markers.set([newMarker, ... this.markers()])
    this.markers.update((markers) => { return [newMarker,...markers] });
  }

  flyToMarker(lngLat: LngLatLike){
    if(!this.map()) return;
    this.map()?.flyTo({
      center:lngLat,
      easing: (t) => t,
      speed: 1,
      curve: 1,
      duration: 1000,
      essential: true,
      zoom: 14,

    })
  }
  //utilizamos la interfaz Marker y no mapbosgl.Marker porque el primero posee el id
  deleteMarker(marker: Marker){
    if(!this.map()) return;
    const map = this.map();
    marker.mapboxMarker.remove();
    this.markers.update((markers) => {
      return markers.filter((m) => m.id !== marker.id);
    });
  }
}
