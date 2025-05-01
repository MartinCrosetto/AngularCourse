import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
})
export class TitleComponent implements OnChanges{
  title = input.required<string>();
  title2 = input.required<string>();
  title3 = input.required<string>();
  title4 = input.required<string>();

// si necesitamos hacer algo cuando cambia el valor de un input property debemos verificar si no es el primer cambio
// porque el previousValue puede ser undefined o nulo
// si la señal cambia al mismo valor NO SE DETONA ESTE METODO porque realmente no hubo un cambio
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', 'Se detectaron cambios en el componente');
    for (const inputName in changes) {
      const inputValues = changes[inputName];
      console.log(`Previous ${inputName} == ${inputValues.previousValue}`);
      console.log(`Current ${inputName} == ${inputValues.currentValue}`);
      console.log(`Is first ${inputName} change == ${inputValues.firstChange}`);
    }
  }
}
