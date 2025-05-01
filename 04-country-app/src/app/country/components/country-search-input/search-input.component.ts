import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-inputs',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {

  output = output<string>();

  placeholder = input<string>('buscar');   //Valor por defecto 'buscar'

  // El inputValue lo usamos para que busque sin tocar el botón de buscar
  // linkedSignal permite inicializar una señal con un proceso y despues de realizar ese proceso, la variable se trabaja como una señal normal
  inputValue = linkedSignal<string>(() => this.initialValue() ?? "");

  debounceTime = input<number>(300);

  initialValue = input<string>(""); // este valor lo recibimos del query parameter(que obtuvimos del path de la pagina), o no recibe nada en caso de no tener query parameters

  onSearch(value: string){
    this.output.emit(value);
  }

  setInputValue(value: string){
    this.inputValue.set(value);
  }

  debounceEffect = effect((onCleanup) => {

    const value = this.inputValue();   //Esta linea es super importante para el efecto, porque cuando cambié el inputValue, se disparará el efecto
    const timeout = setTimeout(()=>{
      this.output.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    })
  })



}
