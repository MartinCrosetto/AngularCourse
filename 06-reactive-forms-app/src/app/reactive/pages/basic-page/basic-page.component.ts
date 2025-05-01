import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  //servicio que esta proveido en nuestro ReactiveFormsModule
  private formBuilder = inject(FormBuilder);

  formUtils = FormUtils;


  myForm: FormGroup = this.formBuilder.group({
    // property: [valor por default del input, Validadores Síncronos[], Validadores Asíncronos [] ]
    name: ['', [Validators.required, Validators.minLength(3)]], // Validators.required es un validador síncrono que requiere que el campo no esté vacío y Validators.minLength(3) es un validador síncrono que requiere que el campo tenga al menos 3 caracteres
    price: [0, [Validators.required, Validators.min(10)]], // Validators.min(0) es un validador síncrono que requiere que el campo sea mayor o igual a 0
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  // isValidField(fieldName: string): boolean | null {
  //   return (this.myForm.controls[fieldName].errors && this.myForm.controls[fieldName].touched )// la doble negación !! convierte el valor en un booleano
  // }

  // getFieldError(fieldName:string): string | null {
  //   if(!this.myForm.controls[fieldName]) return null; // si el campo no existe, retornamos null

  //   const errors = this.myForm.controls[fieldName].errors ?? {}; //

  //   for(const key of Object.keys(errors)) { // Object.keys(errors) retorna un array con las llaves del objeto errors
  //     switch(key) {
  //       case 'required':
  //         return 'Este campo es requerido';
  //       case 'minlength':
  //         return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
  //       case 'min':
  //         return `Este campo debe ser mayor o igual ${errors['min'].min}`;

  //     }
  //   }
  //   return null;
  // }

  onSave(): void { // se llama cuando se hace submit en el formulario
    if(this.myForm.invalid){ //si el formulario es inválido (falló alguna validación de los controls)
      this.myForm.markAllAsTouched(); // marca todos los campos como tocados
      return;
    }
    console.log(this.myForm.value);
    // LOGICA DE GUARDADO

    this.myForm.reset({
      price: 0,
      inStorage: 0,
    }); //resetea el formulario a su estado Pristine y el Touched a false

  }

  // myForm2 = new FormGroup({
  //   name: new FormControl('', [], []), // FormControl es una clase que se utiliza para crear un control de formulario individual
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

}
