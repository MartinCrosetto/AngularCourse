import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  templateUrl: `./counter-page.component.html`,
  styleUrl: `./counter-page.component.css`,
  changeDetection: ChangeDetectionStrategy.OnPush, //-> aqui le decimos que no queremos usar ZoneJs en este
  // componente, lo que mejorará su performance.
})
export class CounterPageComponent {
  counter = 10;
  counterSignal = signal(10);

  constructor() {
    setInterval(() => {
      //this.counter += 1; // si desactivamos el ZoneJS, esto no se ejecutaría, porque al ser onPush (reactivo), como
      // se espera que el componente reaccione, no ocurre nada, es por eso que debemos usar una señal.
      this.counterSignal.update( (currentValue) => currentValue + 1);

      console.log("Tick");
    }, 2000);
  }




  increaseBy(value: number) {
    this.counter += value;
    // ---- Actualizar señal con valor anterior----
    // this.counterSignal.set(this.counterSignal()+ value) -> NO USAR, es engorrosa
    this.counterSignal.update((currentValue) => {
      return currentValue + value;
    });
  }
  resetCounter(): void {
    this.counter = 0;
    // ----Actualizar señal sin valor anterior----
    this.counterSignal.set(0);
  }
}
