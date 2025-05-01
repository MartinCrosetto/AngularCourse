import { FormUtils } from './../../../utils/form-utils';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termAndConditions: [false, Validators.requiredTrue],
  })

  onSave() {
    if(this.myForm.invalid){ //si el formulario es inválido (falló alguna validación de los controls)
      this.myForm.markAllAsTouched(); // marca todos los campos como tocados
      return;
    }
    console.log(this.myForm.value);
    // LOGICA DE GUARDADO

    this.myForm.reset({
      gender: 'M',
      wantNotification: false,
      termAndConditions: false,
    }); //resetea el formulario a su estado Pristine y el Touched a false


  }

 }
