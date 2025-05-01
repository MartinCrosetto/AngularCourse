import { AfterContentChecked, AfterContentInit, afterNextRender, afterRender, AfterViewChecked, AfterViewInit, Component, DoCheck, effect, OnChanges, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';


const log = (...messages:string[]) => {
  // Esta función es para mostrar los mensajes en la consola de una manera más legible
  // En el primer parámetro se muestra el primer mensaje y en el segundo parámetro se muestra el resto de los mensajes
  // Se utiliza el método slice para obtener el resto de los mensajes
  // Se utiliza el método join para unir los mensajes con una coma y un espacio
  console.log(`${ messages[0] } %c${ messages.slice(1).join(', ')}`, 'color: #bada55' )
}

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
// el implements OnInit es utilizado cuando se quiere forzar o estar totalmente seguros
// de que el componente va a implementar el ciclo de vida de Angular
export class HomePageComponent implements OnInit, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  traditionalProperty = 'Martín';
  signalProperty = signal('Martín');


  changeTraditional(){
    this.traditionalProperty = 'Martín Crosetto';
  }

  changeSignal(){
    this.signalProperty.set('Martín Crosetto');
  }



  // Llamado cuando se crea una nueva instancia del componente
  constructor() {
    log('Constructor llamado');
     // Zoneless adquiere utilidad cuando se quiere disparar efectos fuera del ciclo de vida de Angular
     // en el siguiente setTimeout se dispara un evento luego de 2 segundos pero como no es una signal
     // angular no sabe que el valor ha cambiado y no se vuelve a renderizar, debido a que angular
     // no esta incorporando zone.js
     // Esto es una de las ventajas de usar signals, ya que al ser una signal
     // angular sabe que el valor ha cambiado y se vuelve a renderizar
    // setTimeout(() => {
    //   this.signalProperty.set('Juan Carlos');
    //   console.log('hecho')
    // }, 2000);
    setTimeout(() => {
      this.traditionalProperty = 'Juan Carlos';
      console.log('hecho')
    }, 2000);
  }
  //Tambien los efectos son parte del ciclo de vida de Angular
  // Se dispara cuando se crea el componente
  // se utiliza para tareas específicas
  // Se desaconseja usarlo para disparar peticiones HTTP
  basicEffect = effect((onCleanup) => {
    console.log('effect',"Disparar efectos secundarios");

    // casualmente cuando el componente va ser destruido se llama a onCleanup
    onCleanup(() =>{
      log('onCleanup', "Se ejecuta cuando el efecto se va a destruir");
    });
  });



  ngOnInit() {
    log('ngOnInit', "Runs once after Angular has initialized all the component's inputs.");
  }

  ngDoCheck() {
    log('ngDoCheck', "Runs every time this component is checked for changes.");
  }

  ngOnChanges() {
    log('ngOnChanges', "Runs every time the component's inputs signals have changed.");
  }

  ngAfterContentInit() {
    log('ngAfterContentInit', "Runs once after the component's content has been initialized.");
  }

  ngAfterContentChecked() {
    log('ngAfterContentChecked', "Runs every time this component content has been checked for changes.");
  }

  ngAfterViewInit() {
    log('ngAfterViewInit', "Runs once after the component's view has been initialized.");
  }

  ngAfterViewChecked() {
    log('ngAfterViewChecked', "Runs every time the component's view has been checked for changes.");
  }

  ngOnDestroy(){
    log('ngOnDestroy', " Runs once before the component is destroyed.");
  }

  afterNextRenderEffect = afterNextRender(() => {
    // Se utiliza para ejecutar código después de que todos los componentes hayan sido renderizados en el DOM
    log('afterNextRenderEffect', "Runs once the next time that all components have been rendered to the DOM.");

  });

  afterRenderEffect = afterRender(() => {
    log('afterRenderEffect', "	Runs every time all components have been rendered to the DOM.");
  })
}
