import { HttpUrlEncodingCodec } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { GifService } from 'src/app/gifs/services/gifs.service';
interface MenuOption {
  label: string;
  subLabel: string;
  route: string; // ruta a la cual queremos navegar
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptionsComponent {

  gifService = inject(GifService);

  // Cuando cambie la señal del GifService (searcheHistoryKeys()), se actualizará esta señal searchedGifs().
  searchedGifs = computed(() =>{ return this.gifService.searchHistoryKeys()});

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending',
    },

    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar Gifs',
      route: '/dashboard/search',
    },
  ];
}
