import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroFilter',
})
export class HeroFilterPipe implements PipeTransform {
  transform(value: Hero[], searchQuery: string): Hero[] {
    if(!searchQuery) return value;
    searchQuery = searchQuery.toLowerCase();
    // Para cada Hero, si incluye la palabra, retorna true, sino false y así creamos un Hero[] con solo los true.
    return value.filter((hero => hero.name.toLowerCase().includes(searchQuery) ))
  }
}
