import { DragonballService } from './../../../services/dragonball.service';
import { Component, computed, inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../../components/shared/navbar/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from '../../../components/shared/navbar/dragonball/character-list/character-add/character-add.component';



@Component({
  templateUrl: './dragonball-super-page.component.html',
  imports: [CharacterListComponent, CharacterAddComponent],
})
export class DragonballSuperPageComponent {
  // ----Inyección de Dependencia----

  // ---Forma Tradicional de Inyección de Dependencia---
  // constructor(
  //   public dragonballService: DragonballService
  // ) {}

  // ---Forma Nueva de Inyección de Dependencia---
  public dragonballService = inject (DragonballService)

}
