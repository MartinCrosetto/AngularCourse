import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
// 1. Importamos el módulo de Mapbox
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

import { environment } from '../../../environments/environment.development';
import { DecimalPipe, JsonPipe} from '@angular/common';
// 2. Asignamos el token de acceso
mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right:20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `,
})
export class FullscreenMapPageComponent implements AfterViewInit {
  //Referencia al div que contiene el mapa
  // al viewChild lo podemos buscar por la referencia local #map (es una señal)
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  zoom = signal(14);
  coordinates = signal({
    lng: -74.5,
    lat: 40,
  });

  zoomEffect = effect(() => {
    if (!this.map()) return;
    this.map()?.setZoom(this.zoom());
  });

  //3. Luego de inicializar la vista inicializamos el mapa
  async ngAfterViewInit(): Promise<void> {
    // Si no existe el divElement, no podemos inicializar el mapa
    if (!this.divElement()?.nativeElement) {
      console.error('No se encontró el elemento del mapa');
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;
    const {lng,lat} = this.coordinates()
    console.log(element);
    // 4. Inicializamos el mapa
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng,lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });
    this.mapListeners(map);
  }

  // 5. Agregamos listeners
  mapListeners(map: mapboxgl.Map) {
    //
    map.on('zoomend',(event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    })
    map.on('moveend' , (event) => {
      const center = map.getCenter();
      this.coordinates.set(center);
    })
    map.on('load',() =>{
      console.log('Map loaded');
    })

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());





    this.map.set(map);
  }
}
