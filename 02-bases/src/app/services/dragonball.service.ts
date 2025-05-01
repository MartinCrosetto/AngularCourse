import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

//Como no va a tener ninguna dependencia, lo pongo por fuera de la clase
const loadFromLocalStorage = ():Character[] => {
  const characters = localStorage.getItem("characters");

  return characters ? JSON.parse(characters):[]; // Esto no está bien, porque no estamos seguros si va a ser un objeto
}




// Injectable: es un decorador que transforma la clase en un servicio
// Se trabaja con provideIn: 'root' para que el servicio trabaje a nivel global
@Injectable({providedIn: 'root'})
export class DragonballService {

  // En la inicialización de la señal llamo al loadFromLocalStorage()
  characters = signal<Character[]>(loadFromLocalStorage());
  // ----EFECTOS----
  // Una tarea por efecto

  // Guardo los personajes en LocalStorage usando un effect
  saveToLocalStorage = effect(() => {
    // localStorage.setItem("llave", valor el cual es un objeto serializado a string)
    localStorage.setItem("characters",JSON.stringify(this.characters()));
  });



  addCharacter(newCharacter: Character) {
    this.characters.update((currentArray: Character[]) => {
      // crea un array literal y agregale todos los elementos del array currentArray, y agregale como elemento el newCharacter
      return [...currentArray, newCharacter];
    })
  }

}
