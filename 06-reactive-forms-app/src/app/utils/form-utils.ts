// clase que va a tener métodos estáticos, porque vamos a ejecutar metodos sin necesidad de crear una instancia,
//  para validar los campos.
// en caso de necesitar una instancia, inyectar dependencia y crear un servicio

import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

async function sleep() {
  // Simulamos una llamada al servidor que tarda 2.5 segundos
  // En un caso real, aquí deberías usar un servicio inyectado para realizar la llamada HTTP al servidor
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    },2500);

  })
}

export class FormUtils {
  //Expresiones regulares para hacer validaciones (de correo, nombre o algun patron)
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      // si el form tiene errores y fue tocado
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    ); // la doble negación !! convierte el valor en un booleano
  }

  static isValidFieldInArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return (
      // si el formArray en la posición index del control tiene errores y fue tocado

      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }


  static getTextError(errors: ValidationErrors):string | null {
    console.log(errors)
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `Este campo debe ser mayor o igual ${errors['min'].min}`;

        case 'email':
          return 'El correo no es válido';

        case 'pattern':
          if(errors['pattern'].requiredPattern === FormUtils.namePattern) {
            return 'Este campo debe de tener nombre y apellido';
          }

          if(errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El correo electronico no luce como un correo electronico';
          }

          if(errors['pattern'].requiredPattern === FormUtils.notOnlySpacesPattern) {
            return 'Este campo no puede contener espacios';
          }

          return 'Error de patrón contra expresión regular'

        case 'emailTaken':
          return 'El correo electrónico ya está siendo utilizado'

        case 'usernameTaken':
          return 'El nombre de usuario ya está siendo utilizado'

        default:
          return `Error de validación no controlado ${key}`;

      }
    }
    return null;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null; // si el campo no existe, retornamos null

    const errors = form.controls[fieldName].errors ?? {}; //

    return FormUtils.getTextError(errors);
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (!formArray.controls[index]) return null; // si el campo no existe, retornamos null
    const errors = formArray.controls[index].errors ?? {}; // si no hay errores, retornamos un objeto vacío
    return FormUtils.getTextError(errors);
  }


  static isFieldOneEqualToFieldTwo(field1: string, field2: string) {
    //Esta funcion debe retornar otra función que recibe un formGroup
    return (formGroup: AbstractControl) => {
      //Funcion que retorna null si no hay errores o un objeto con el error si hay errores
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }

  //Validación personalizada Async
  static async checkingServerResponse(control: AbstractControl):Promise<ValidationErrors | null> {
    console.log('validando contra el servidor...');
    await sleep(); // Simulamos una llamada al servidor que tarda 2.5 segundos
    // Obtenemos el valor del control del formulario myForm
    const controlValue = control.value;
    if(controlValue === 'hola@mundo.com') {
      // Si el valor es 'hola@mundo', retornamos un objeto con el error
      // En este caso, el error se llama 'emailTaken'
      return {
        emailTaken: true, // debo manejar el error en el template
      }
    }
    return null;
  }

  static isValidUsername(control: AbstractControl): ValidationErrors | null {
    const controlValue = control.value;
    if (controlValue === 'strider') {
      return { usernameTaken: true }; // debo manejar el error en el template
    }
    return null;
  }

}
