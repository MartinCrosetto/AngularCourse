// 1. Recibe un objeto Giphy que viene de la Api de Giphy
// 2. Regresa un objeto basado en la interfaz Gif

import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {
  static mapGiphyItemToGif(item:GiphyItem):Gif {
    return {
      id: item.id,
      title: item.title,
      url:item.images.original.url
    }
  }


  static mapGiphyItemsToGifArray(items:GiphyItem[]):Gif[] {
    //serializa un array de GiphyItems a un array de Gifs mediante un map que a cada elemento le aplica el método
    //estático de la clase mapGiphyItemToGif.
    return items.map(this.mapGiphyItemToGif);
  }
}
