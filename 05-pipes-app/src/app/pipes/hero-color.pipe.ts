import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../interfaces/hero.interface';
import { UpperCasePipe } from '@angular/common';

@Pipe({
  name: 'heroColor'
})

export class HeroColorPipe implements PipeTransform {
  transform(value: Color): string {
    //tomamos el valor de la enum
    return Color[value];
  }
}
