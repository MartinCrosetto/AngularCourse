import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  //! Tarea:
  /**
   * name -> obligatorio
   * email -> obligatorio y un email (Validator.email?)
   * username -> obligatorio, minlegth 6
   * password -> obligatorio, minlegth 6
   * confirmPassword -> obligatorio
   */
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group(
    {
      name: [
        'Martin',
        [Validators.required, Validators.pattern(this.formUtils.namePattern)],
      ],
      email: [
        'martincrosetto312@gmail.com',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.formUtils.emailPattern),
        ],
        [this.formUtils.checkingServerResponse],
      ],
      username: [
        'martincrosetto',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          this.formUtils.isValidUsername
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      // Validaciones a nivel de grupo (formulario)
      validators: [
        this.formUtils.isFieldOneEqualToFieldTwo('password', 'confirmPassword'),
      ],
    }
  );

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    // LOGICA DE GUARDADO

    this.myForm.reset({
      name: 'Martin',
      email: 'martincrosetto312@gmail',
      username: 'martincrosetto',
      password: '',
      confirmPassword: '',
    }); //resetea el formulario a su estado Pristine y el Touched a fals
  }
}
