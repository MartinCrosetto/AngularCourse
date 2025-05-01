import { FormUtils } from './../../../utils/form-utils';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private formBuilder = inject(FormBuilder);

  formUtils = FormUtils;

  myForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', [Validators.required, Validators.minLength(3)]],
      ['Death Stranding', [Validators.required, Validators.minLength(3)]],
    ], /**Validaciones al arreglo */
  Validators.minLength(2))
 });

 newFavorite  = this.formBuilder.control('', [Validators.required, Validators.minLength(3)]) // control para agregar un nuevo juego


 get favoriteGames() {
  return this.myForm.get('favoriteGames') as FormArray; // get() es un método de FormGroup que devuelve un AbstractControl
 }

 onAddToFavorites(){
  if(this.newFavorite.invalid) return; // si el control es inválido, no hacemos nada
  const newGame= this.newFavorite.value;
  this.favoriteGames.push(this.formBuilder.control(newGame, [Validators.required, Validators.minLength(3)])) // agregamos un nuevo control al FormArray
  this.newFavorite.reset(); // reseteamos el control
 }

 onDeleteFromFavorites(index : number) {
  this.favoriteGames.removeAt(index-2); // removemos el control en la posición index
 }

 onSave(){
  console.log(this.myForm.value)
  this.myForm.markAllAsTouched(); // marcamos el formulario como tocado
 }
}
