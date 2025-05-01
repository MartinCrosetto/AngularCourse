import { GifService } from './../../services/gifs.service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);
  onSearch(query:string){
    console.log(query);
    this.gifService.searchGifs(query).subscribe((respuestaPeticion) => {
      //subscribe imprimirá por consola lo que sea que el operador emita
      // console.log(respuestaPeticion);
      this.gifs.set(respuestaPeticion);
    })
  };
}
