import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  SlicePipe,
  TitleCasePipe,
} from '@angular/common';
import { interval, tap } from 'rxjs';

import { CardComponent } from '../../components/card/card.component';

const client1 = {
  name: 'Fernando',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canadá',
};
const client2 = {
  name: 'Melisa',
  gender: 'female',
  age: 33,
  address: 'Toronto, Canadá',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe,
  ],
  templateUrl: './uncommon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UncommonPageComponent {
  //----i18n Select Pipe----

  client = signal(client1);
  // funciona con un mapa, que permitirá cambiar de manera dinámica acorde a una condición
  // {{ client().gender | i18nSelect: invitationMap}}
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient(): void {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }
    this.client.set(client1);
  }

  //----i18n Plural Pipe----
  clients = signal([
    'María',
    'Pedro',
    'Fernando',
    'Melissa',
    'Natalia',
    'Andrea',
    'Juan',
    'Carlos',
  ]);

  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    other: 'tenemos # clientes esperando.',
  });

  deleteClient(): void {
    this.clients.update((currentClients: string[]): string[] =>
      currentClients.slice(1)
    );
    console.log(this.clients());
  }

  // ----SlicePipe----
  // Solo se usa en el component.html

  // ----JsonPipe----
  // Sirve para representar un JSON en pantalla, esto sirve para hacer depuraciones

  // ----KeyValuePipe----
  profile = {
    name: 'Martín',
    age: 22,
    address: 'Villa María, Argentina',
  };

  // ----AsyncPipe----
  // Trabaja tanto con promesas como con Observables
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject("Tenemos un error en la data");
      resolve("Tenemos data en la promesa");
      console.log("La promesa resolvió")
    },3500)
  })
  // Cada 2000ms va a estar emitiendo un valor
  // La particularidad de los Observables es que cuando no estamos suscritos a el, no pasa nada en ese Observable
  // myObservableTimer = interval(2000).pipe(
  //   tap((value) => console.log("tap", value))
  // ).subscribe().unsubscribe();
  // Usamos unsubscribe para asegurarnos de que al cambiar entre rutas no quede activa la suscripción al observable que emite un valor cada 2000ms.


  //El async realiza esta suscripción y cuando cambiamos de ruta, se desuscribe
  myObservableTimer = interval(2000).pipe(
      tap((value) => console.log("tap", value))
    )
}
