import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Character } from '../../../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  // --- INPUT SIGNALS ----
// characters: Esta es una propiedad del componente que almacenará los datos recibidos a través del decorador input.

// input: Esta es una función o decorador que se utiliza en Angular para recibir datos desde un componente padre.
// Es decir, permite que un componente hijo reciba información que le envía su componente padre.

// required<Character>(): Aquí, required es una función genérica que asegura que el valor recibido es obligatorio
// y debe ser del tipo Character. El tipo Character es una interfaz o clase definida en tu proyecto
// que describe la estructura de los datos que se esperan.

  //Required input signal
  characters = input.required<Character[]>();
  //Optional input signal
  listName = input.required();
}
