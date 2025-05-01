import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroSortBy'
})

export class HeroSortByPipe implements PipeTransform {
  // en el sortBy, en lugar de poner string y hacer un mapeo, ponemos keyof o nulo
  transform(value: Hero[], sortBy: keyof Hero | null ): Hero[] {
    if(!sortBy) return value;

    switch(sortBy) {

      case "name":
        // localeCompare s un método de JavaScript que compara dos cadenas de texto y devuelve un número que indica si la cadena de
        // referencia viene antes, después o es igual a la cadena comparada, según el orden alfabético y las reglas de
        // idioma específicas.
        return value.sort((a,b) => a.name.localeCompare(b.name) );

      case "canFly":
        return value.sort((a,b) => (a.canFly ? 1 : -1 ) - (b.canFly ? 1: -1));

      case "color":
        return value.sort((a,b) => a.color - b.color );

      case "creator":
        // No usamos localeCompare porque es una enum, y las enums no son más que un número (posición de la constante)
        return value.sort((a,b) => a.creator - b.creator)
      default:
        return value;
    }



  }
}
