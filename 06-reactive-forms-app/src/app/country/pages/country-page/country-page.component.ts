import { CountryService } from './../../services/country.service';
import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  formBuilder = inject(FormBuilder);

  countryService =  inject(CountryService);

  regions = signal(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  countryBorders = signal<Country[]>([]);

  myForm = this.formBuilder.group({
    region: ['',Validators.required],
    country: ['',Validators.required],
    border: ['',Validators.required],
  })

  // Effect para obtener los paises por region y que se actualice el select de paises
  // Se usa un efecto para que la suscripcion se ejecute cada vez que cambie el valor de la region
  // y se desuscriba automaticamente
  onFormChanged = effect((onCleanup) => {

    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

      onCleanup( () => {
        regionSubscription.unsubscribe();
        countrySubscription.unsubscribe();
        console.log('Limpiado...')
      })
  })

  onRegionChanged() {
    // nos suscribimos al evento valueChanges, porque puede existir al cambiar el formulario, para obtener
    // el valor del campo region y con ello hacer la peticion al servicio de los paises
    return this.myForm.get('region')!.valueChanges.pipe(
      //cada vez la region cambie todo el formulario debe cambiar
      //limpiamos los countries
      tap((region) => { this.myForm.get('country')!.setValue('')}),
      // limpiamos los borders
      tap((region) => { this.myForm.get('border')!.setValue('')}),
      // limpiamos los arreglos de countries y borders
      tap((region) => {
        this.countryBorders.set([]);
        this.countriesByRegion.set([])}),

      // el switchmap se usa para cambiar el flujo de datos
      // en este caso, cuando cambia la region, se hace una nueva peticion
      // y se cancela la anterior
      switchMap((region) => this.countryService.getCountryByRegion(region ?? '')),
    )
    .subscribe((countries) => {
      console.log({countries});
      this.countriesByRegion.set(countries);
    })
  }

  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges.pipe(
      // limpiamos los borders del formulario
      tap(() => { this.myForm.get('border')!.setValue('')}),
      // solo pasa si el valor es mayor a 0
      // es decir, si hay un pais seleccionado
      // si no hay pais seleccionado, no hacemos nada
      filter(value => value!.length > 0),
      // cuando cambia el country, se hace una nueva petición y se cancela la anterior
      switchMap((alphaCode) => this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
      switchMap(country => this.countryService.getCountryBordersByBordersAlphaCodesArray(country.borders ?? [])),
    )
    .subscribe(borders => {
      console.log({borders})
      // actualizamos el arreglo de borders
      this.countryBorders.set(borders);

    } )
  }

}






