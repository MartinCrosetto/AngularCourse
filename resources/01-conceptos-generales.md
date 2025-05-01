---------------------------------------------------CONCEPTOS GENERALES------------------------------------------------------------

    ## **¿Que es Typescript? Y ¿Por que angular lo usa? ##
        Typescript es un superset de javascript que se transpila a javascript y luego se compila.
            Beneficios:
                Ofrece tipado estricto
                Mejora la legibilidad
                Permite usar características modernas
                Error en el editor
                Sabemos como luce
                Métodos y propiedades de los objetos
                Casi todos los frameworks y librerías soportan typescript
        Angular obliga a utilizar typescript POR LOS DECORADORES, permitiendo un trabajo uniforme basado en clases y funciones

    ## Mitos y realidades de angular ##
        ### MITO Angular es mejor que React, Vue, Svelte, Solid ###
            Cada tecnología tiene un nicho y un objetivo. El objetivo de Angular es tener una aplicación que luzca similar a la
            aplicación que otros programadores pueden desarrollar, porque, Angular tiene una manera estricta de:
                como se crean los componentes,
                como se nombran,
                en donde crearlos y,
                como agruparlos.
        ### MITO Angular es mas ordenado que React, Vue, Svelte ###
            Existen programadores de Angular muy desordenados y de ReactJs muy ordenados. Angular ofrece una forma de nombrar los
            archivos y recomienda colocarlos de cierta manera.
        ### REALIDAD Angular libera versiones a cada rato (cada 6 meses) ###
            Angular libera versiones mayores cada 6 meses, pero no hay de que estresarse
        ### MITO Las aplicaciones de Angular son muy pesadas ###
            Desde que estamos trabajando con señales y Angular esta botando muchas dependencias, las aplicaciones son mucho mas
            pequeñas. A mayor cantidad de dependencias mayor el peso.
            Son aplicaciones que van desde los 300KB, antes si eran pesadas porque pasaban de 1MB cualquier aplicación.
        ### MITO Angular no es SEO Friendly ###
            Angular desde hace un par de versiones atrás ya incluyó todo lo que va relacionado a Angular Universal, se fusionó
            y ahora solo es Angular, permitiendonos trabajar desde el lado del servidor, con la parte de hidratación y otras
            cosas relacionadas a que tengamos aplicaciones optimizadas para la generación del lado del servidor.
        ### MITO Angular no soporta patrones como Redux ###
            Existen tecnologías y librerías que lo implementan de una manera mas sencilla, pero podemos aplicar cualquier
            estructura de datos que prefiramos. Angular tiene una manera muy facil de manejar el gestor de estado o el
            estado de su aplicación, que nos haga pensar en si amerita o no un Redux. Igualmente, Redux no es la única manera de
            manejar el gestor de estado de nuestras aplicaciones.
        ### REALIDAD Angular 2,4,5,6,7,8,...,20... Es el mismo Angular ###
            Angular sigue siendo el mismo desde que paso de ser AngularJS, se busca que se diga Angular como Framework y no
            Angular 2, 3, .... Aunque posea ese estigma. No suceden cosas que nos obliguen a realizar un cambio significativo en
            el código.
        ### MITO solo puedo correr código de TypeScript en mis aplicaciones de Angular ###
            Todo el código de typescript termina siendo transpilado a javascript, por tanto, todo código javascript es compatible
            con typescript y podremos utilizar paquetes de terceros aunque estén escritos en typescript.
            Sino tenemos el objeto escrito en typescript tenemos:
                * Archivos de definición
            Aunque de igual manera si no tenemos archivos de definción, podemos usarlo en javascript.

-------------------------------------------------------------ANGULAR--------------------------------------------------------------
Angular se puede utilizar para:
_ Web: SPA (Single Page Application), SSR(Server Side Rendering), SSG(Static Side Generation)
_ Movil: Ionic, NativeScript
_ Desktop: Electrón
En el curso nos enfocaremos en SPAs (Single Page Applications)
Angular se conoce como un Framework, esto quiere decir, que posee todo lo que necesitamos para crear una aplicación completa:
_ Gestor de estado
_ Enrutamiento
_ Reactividad
_ Observables
_ Peticiones HTTP
_ Directivas
_ Etc.
Cuándo Angular libera una versión nueva, todos sus componentes pasan automáticamente a esa versión, siendo compatibles entre
sí.
Los Bloques Fundamentales de Angular son:
_ Componentes: Pieza que representa una parte de la interfaz de usuario, que posee:
_ lógica(TS),
_ estilos - (SASS, CSS, etc)(interno o externo) - opcional y,
_ una plantilla HTML (interna o externa).

        * Rutas: permiten cambiar entre páginas (componentes que usualmente cubren todo el punto de vista). Esto es manejado
            mediante el sistema de enrutamiento de Angular, lo que permitirá:
            * Separar la lógica: en pequeñas pantallas
            * Control de acceso y autorización: que será permitida a través de las rutas
            * Control sobre estratégias de renderizado: o como queremos que nuestros componentes sean llamados por los diferentes
            URLs/rutas
        * Directivas: modifican el comportamientod e un elementoHTML, existiendo diferentes tipos de directivas:
            * Atributo: ngClass, ngStyle...
            * Estructurales: ngIf, ngFor... -> NOTA: ngIf y ngFor se estan cambiando AL NUEVO CONTROL FLOW de Angular
            * Componente: que usualmente estas son personalizadas. Además existen directivas creadas por Angular, que también son
            personalizadas.
        * Servicios: encapsulan la lógica de negocio y centralizan su acceso, usualmente utilizados para:
            * Gestión de datos:
            * Reutilización de Código:
            * Inyeccion de dependencias:
            Se utilizan en casi todas las aplicaciones de angular y es el gestor de estado prioritario.
        * Módulos: agrupan funcionalidades relacionadas, permitiendo su uso en otros componentes o módulos. Los objetivos
        principales de los módulos son:
            * Organizar la aplicación
            * Encapsular dependencias
            * Facilitar la carga bajo demanda
        En los ultimos años Angular bajó la utilización de módulos para priorizar la composición de Standalone Components.
        * Pipes: transforman datos de forma visual para representarlos apropiadamente en los componentes HTML.
            Existen dos tipos de pipes:
                * Puros: se evalúan cada vez que el argumento cambia.
                * Impuros: se evalúan cada vez que hay algún cambio en el ciclo de vida de nuestra aplicación de Angular.
                Se recomiendan los puros porque consumen menos memoria, y los impuros tienen sus casos de usos particulares.
            Los objetivos son:
                * Modificar como se presentan los datos,
                * ordenar y filtrar y,
                * optimizar el rendimiento.

    ## Inicio de un proyecto ##
        ng serve -o: -o significa que lo abra tan pronto esté listo mi servicio de angular en modo de desarrollo
        ng build: crea un directorio dist donde estan los archivos html, javascript, css, licencias, etc.
        ng generate component nombreDelComponente:
    ## Archivos y directorios de un proyecto ##
        tsconfig.json: archivo de configuraicon de typescript que le dice como quiere que sea la versión del código de javascript
        una vez ocurra la transpilación.
        tsconfig.spec.json y tsconfig.app.json: ambos extienden de tsconfig.json, añaden funcionalidades, el app es cuando la
        aplicación está corriendo y el spec es para testing
        package.json: en una aplicación de NodeJS son las instrucciones de:
            * Cuales son los scripts que queremos ejecutar
                start: para levantar la aplicación
                build: para construirla
                watch: para entrar en modo de observación
                test: para entrar en modo test
                pudiendo crear tantos scripts como la aplicación necesite.
            * configuraciones como
                name: nombre de la aplicación
                version: version de la aplicación
                private: proyecto privado (true o false) que no se piensa subir a npm
                dependencies: cuales son las dependencias que posee la aplicación(DE ANGULAR),
                las cuales poseen todas la misma versión asegurando la compatibilidad entre
                diferentes tecnologías.
                devDependencies: dependencias que solo son utilizadas para
                    el testing,
                    para crear la aplicación o,
                    para ejecutarla en modo de desarrollo.
                Cada una de estas dependencias viaja al bundle final de la aplicación
                Bundle: versión o producto de mi aplicación.

         posee referencias a karma y jasmine, los cuales son test-runners o herramienta de testing que estan depreca-
        dos. Por lo cual el equipo de Angular se está moviendo a JS.
        README.MD: archivo de markdown que dice generales del proyecto. Se debe utilizar para explicar que hace el proyecto, que
        dependecias tiene o como configurarlo para entrar en modo desarrollo, pero es un archivo que se puede eliminar.
        angular.json: archivo de configuración de Angular en el cual le dice a angular como queremos sea la configuración a la hora
        de construirla o a la hora de estar modo de producción, modo de desarrollo, o en testing, es muy raro que vayamos a tener
        que modificarlo. Uno de los usos comunes es cuando tenemos un archivos de estilos global (como el styles.css), no encon-
        traremos ninguna referencia a archivos de este estilo (globales) en ningún lado de la carpeta /app, pero si lo tiene
        el angular.json para que en toda la aplicación tengamos el archivo global.
            "styles": src/styles.css
        .gitignore: son los archivos y directorios que queremos ignorar de nuestro repositorio de GIT (no GitHub), que indirectamente
        todo lo que esté aca no se subirá. Pueden ser:
            * archivos de configuración: que se pueden ccrear con npm run o se pueden generar de forma automática, o
            * archivos que no son importantes a la hora de respaldar esos cambios: porque se pueden generar o construir
        .editorconfig: configuraciones recomendadas por la parte de Angular para nuestro editor de código
        public: contiene todo los recursos estáticos que nosotros queremosen nuestra aplicacion (Imagenes, iconos, fuentes, etc.)
        node_modules: contiene todos los paquetes que están referenciados en el package.json ya sea como paquetes que dependen de
        otros paquetes
        dist: directorio de distribución, solo aparece al ejecutar "ng build", que contiene lo que subiríamos a nuestro servidor
        es la versión de producción de la aplicación
        .vscode: configuraciones del editor de código de vscode, cuales son las extensiones recomendadas, un par de tareas
        y lo que queremso que haga cuando se lanza la aplicación.
        .angular: utilizada para manejar algún tipo de caché.

        src: carpeta que contiene los componentes.

    El estilo, el HTML y el spec son archivos opcionales. Todos los componentes tienen una parte HTML, pero ese HTML puede vivir en
    el app.component.ts
    ## app.component.ts ##
        componente raíz principal de nuestra aplicación
        Posee:
            * Clase AppComponent
            * Decorador Component: transforma la clase a un componente, esto permite poderlo colocar en el HTML, Angular sabe como
            renderizar ese componente y donde podemos colocarlo.
                * selector: OPCIONAL. Sirve para crear una etiqueta html especial
                * imports: OPCIONAL. Se importa el componente personalizado router-outlet que es el que se está utilizando para
                poder mostrar las rutas que vamos a navegar. El objetivo es poder cambiar de páginas entre la navegación
                que vamos a hacer
                * templateUrl: referencia al HTML
                * styleUrl: OPCIONAL. referencia al archivo de estilos.
                * standalone: sirve para establecer que sea un componente que a la vez sea su propio módulo
    ## app.config.ts ##
        archivo donde usualmente vamos a venir a realizar algun tipo de configuracion relacionado a javascript o typescript de manera global.
        export const appConfig: AplicationConfig = {
            providers: [
                provideZoneChangeDetection({eventCoalescing: true}): estrategia para la detección de cambios de estado en Angular que
                posiblemente en un futuro esto cambie o no exista.
                provideRouter(routes): esta proveyendo estas routes, las cuales las importa del archivo app.routes.ts
            ],
        }
    ## app.routes.ts ##
        export const routes: Routes = [
            /hola-mundo => HolaMundoComponent
            /admin => AdminComponent
            / => HomeComponent
            /404 => PageNotFoundComponent
        ];
    ## index.html ##
        Todos los componentes de Angular van a aparecer dentro de <app-root></app-root>
    ## main ##
        Es el punto de entrada de la aplicación de Angular, aqui se empieza a generar toda la aplicación.
        En algunos lugares vamos a tener que realizar algunas configuraciones, porque no es común hacer cambios en este archivo



    ## Componentes ##
        En el decorador, usar:
            * template y styles: si no pasan de 3 componentes/estilos cada uno.
            * templateUrl y styleUrl: si pasan las 3 componentes/estilos. Se debe indicar una Url dentro del directorio
            donde se encuentra el archivo HTML o CSS respectivamente


    ## Señales ##
        Son funciones.
        Forma de almacenar y reaccionar a cambios de datos de manera automática, sin necesidad de BehaviorSubject o EventEmitter,
        permitiendo una gestión del estado más eficiente y predecible en comparación con RxJS o @Input/@Output.
        Son:
            * Reactivas: cualquier cambio en su valor actualiza automáticamente la vista y dependencias
            * Inmutables: no se puede modificar directamente su valor, sino que se usa métodos especificos
            * Eficientes: eliminan la necesidade de ChangeDetectionStrategy.OnPush en muchos casos.
        Tipos:
            * Escritas(WritableSignal)
            * Señales Computadas(Readonly Signals): señal de solo lectura, puede cambiar solo si sus dependencias
            (que sean señales) se va a volver a computar.


        ¿Cuándo usar señales en lugar de RxJS?
            * Cuando solo se necesita un estado reactivo simple
            * Cuando se desea optimizar la detección de cambios en Angular
            * Cuando se quiere reducir la complejidad de RxJS en algunos casos.

        ¿Cómo usar señales en Angular?
            * Definir una señal
               Ej.:
                    En el component.ts
                        counterSignal = signal(10); -> es una writableSignal (una señal que se puede escribir)

            * Leer señal en plantilla HTML
                Ej.:
                    En el component.html
                            <h1>Counter Signal: {{ counterSignal() }}</h1>
            * Actualizar Señal

                Si la señal DEPENDE de un valor inicial -> usar .update();
                    Ej.: this.counterSignal.set(this.counterSignal()+ value) -> NO USAR, es engorrosa
                         this.counterSignal.update((currentValue) => {
                         return currentValue + value;
                         }) -> este ultimo recibe una callback function que retorna un numero
                si la señal NO DEPENDE de un valor inicial -> usar .set();
                    Ej.: this.counterSignal.set(0);

        ### Effect() ###
            Función de Angular que permite ejecutar código automáticamente cada vez que cambia una señal usada dentro de él.
            Usado para ejecutar efectos secundarios cuando cambia una señal tales como:
                * Actualizar valores derivados
                * Hacer llamadas a APIs
                * Escribir en la consola o en logs
                * Ejecutar funciones que dependen de señales.
            ### Pipes ###
                Objeto que permite transformar de manera visual la información que mostraremos en pantalla sin mutar la data real
    ## Estado ##
    ## Propiedades ##
    ## Rutas ##
        El enrutamiento en Angular se configura mediante la definición de rutas en un módulo de enrutamiento. Estas rutas son
        objetos que especifican un camino (path) y el componente que debe ser mostrado cuando se navega a ese camino.
        Ej.:
            import { NgModule } from '@angular/core';
            import { RouterModule, Routes } from '@angular/router';
            import { HomeComponent } from './home/home.component';
            import { AboutComponent } from './about/about.component';

            const routes: Routes = [
            { path: '', component: HomeComponent },
            { path: 'about', component: AboutComponent }
            ];

            @NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
            })
            export class AppRoutingModule { }
        Cuando el usuario navega a la ruta raíz (''), se muestra el HomeComponent, y cuando navega a /about, se muestra el AboutComponent.

    ## Métodos ##
    ## Eventos ##
        En Angular, los eventos se utilizan para manejar interacciones del usuario y otros eventos del navegador. Se pueden
        definir en un componente HTML de la siguiente manera:

        ### Eventos de tipo `()="funcion/propiedad"` ###
        Estos eventos se utilizan para ejecutar una función o propiedad cuando ocurre un evento específico en un elemento HTML. Por ejemplo:
        ```html
        <button (click)="miFuncion()">Haz clic aquí</button>
        ```
        En este caso, cuando el usuario haga clic en el botón, se ejecutará la función `miFuncion()` definida en el componente TypeScript.

        ### Eventos de tipo `[]` (Property Binding) ###
        Estos eventos se utilizan para enlazar propiedades de un componente con atributos de un elemento HTML. Por ejemplo:
        ```html
        <input [value]="miPropiedad" />
        ```
        En este caso, el valor del atributo `value` del elemento `input` se enlaza con la propiedad `miPropiedad` del componente TypeScript. Cualquier cambio en `miPropiedad` se reflejará automáticamente en el valor del `input`.

        ### Ejemplo combinado ###
        También se pueden combinar ambos tipos de eventos para manejar tanto la entrada de datos como las interacciones del usuario:
        ```html
        <input [value]="miPropiedad" (input)="actualizarPropiedad($event.target.value)" />
        ```
        En este caso, el valor del `input` se enlaza con `miPropiedad`, y cada vez que el usuario escriba algo en el `input`, se ejecutará la función `actualizarPropiedad` con el nuevo valor.

        Estos mecanismos permiten crear aplicaciones interactivas y reactivas de manera eficiente en Angular.
    ## Cambios en el DOM ##
    ## Archivos y directorios de un proyecto ##

    ## RouterLink ##
        Directiva de Angular que se utiliza para enlazar rutas dentro de una aplicación Angular. Permite la navegación entre diferentes componentes sin recargar la página completa, lo que mejora la experiencia del usuario.

        Cuándo utilizar RouterLink:
        Utiliza RouterLink cuando necesites crear enlaces de navegación dentro de tu aplicación Angular. Por ejemplo, si tienes una barra de navegación y quieres que los usuarios puedan hacer clic en los enlaces para ir a diferentes secciones de tu aplicación, RouterLink es la herramienta adecuada.

        Cómo importar RouterLink:
        Para utilizar RouterLink, primero debes asegurarte de que el módulo de enrutamiento de Angular (RouterLink) esté importado en tu módulo principal (o en el módulo correspondiente).


    ## RouterLinkActive ##
        Directiva del enrutador de Angular RouterLinkActive que permite aplicar una clase CSS a un enlace (<a>) cuando la ruta a la que apunta está activa. Esto es útil para resaltar visualmente el enlace correspondiente a la pági
    ## Usar Directivas de RouterLink RouterLinkActive RouterLinkActiveOptions ##
        *routerLink se utiliza para definir la ruta a la que debe navegar el enlace.
        *routerLinkActive se utiliza para aplicar una clase CSS cuando la ruta del enlace coincide con la ruta actual.
        *routerLinkActiveOptions permite ajustar cómo se determina si una ruta está activa, por ejemplo, si debe coincidir exactamente con la ruta actual o no.
    ## Nuevo control flow ##
        ### @for ###
            Directiva estructural porque permite cambiar la estructura del HTML basado en la directiva. Similar a ngFor
            Sintaxis:
            @for (let item of items(); track item.id) {
                <div>{{ item.name }}</div>
            }
            se trackea un valor identificador que sirva para trackear una vez cambie la lista.

        ### @if ###
            Directiva estructural porque permite cambiar la estructura del HTML
            basado en la directiva. Similar a ngIf (pero este ultimo no podía
            meterse dentro de un ngFor).
            El elemento no es que se oculte si no se cumple, sino que no se construye fisicamente.
            Sintaxis:
            @if (condicion booleana) {
                Elemento HTML
            } @else {
                Elemento HTML
            }
    ## Viejo Control Flow ##
        ### *ngIf ###
                    Más complicado de integrar en componentes
                    Mas complicado a la hora de trabajar con else

    ## ngClass - ngStyle - Alternativas ##

        ### Alternativas -> Template Syntax ##
            La sintaxis de plantillas en Angular permite a los desarrolladores enlazar datos entre la lógica de la aplicación y la vista de manera declarativa. Utiliza expresiones y directivas en el HTML para mostrar datos, responder a eventos del usuario y aplicar lógica condicional.
                Ej.:
                    <strong
                    [class.text-danger]="character.power > 9000"
                    [class.text-primary]="character.power < 9000"
                    >
                    ({{ character.power }})</strong>

        ### ngClass (clases de CSS de forma condicional) ###
            ngClass es una directiva que se usa para aplicar y quitar clases CSS de manera condicional en los elementos HTML. Permite definir dinámicamente las clases basadas en las propiedades del componente, proporcionando una forma más flexible y legible de manejar las clases CSS en comparación con la manipulación directa del DOM
                Ej.:
                    <strong [ngClass] = "powerClasess()" >
                    ({{ character.power }})</strong>
                    Esto requiere que en el componente.ts se defina el método:
                    powerClasess = computed(() => {
                        return {
                        // Aqui va la condición.
                        'text-danger': true,
                        };
                    });



    ## Comunicación entre componentes ##



    ## Inputs / outputs (Como señales) ##
        ### Outputs signals (Property Binding Manual) ###

            Utilizamos paréntesis para emitir eventos ()
            Ej.:

                En el character-add.component.html
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Nombre"
                        [value] = "name()"
                        (change)="name.set(txtName.value)"
                        #txtName
                    />



                        [value]="name()" → Esto enlaza el valor del input con la función name(). Pero no es un binding reactivo (no se actualiza automáticamente).
                        (input)="name.set(txtName.value)" → Actualiza name cada vez que el usuario escribe.
                        (change)="name.set(txtName.value)" → Actualiza name solo cuando el usuario termina de escribir y sale del input.
                        txtName → Crea una referencia local al input, para usarlo en el mismo template.

                En el character-add.component.ts
                    import { Component,signal,output } from "@angular/core";
                    import { Character } from "../../../../../../interfaces/character.interface";

                    @Component({
                    selector: "dragonball-character-add",
                    imports:[],
                    templateUrl: "./character-add.component.html",
                    })
                    export class CharacterAddComponent {
                    // ----OUTPUT SIGNALS----
                    name = signal("");
                    power = signal(0);
                    // output es una función genérica que va a emitir un personaje
                    newCharacter = output<Character>(); <--------------------------------------
                    addCharacter() {    
                        if (!this.name() || !this.power() || this.power() <= 0) {
                        return;
                        }
                        const newCharacter: Character = {
                        id: Math.floor(Math.random() * 1000),
                        name: this.name(),
                        power: this.power(),
                        };
                        this.newCharacter.emit(newCharacter) <---------------------------------

                        this.resetFields();
                    }

                    resetFields() {
                        this.name.set('');
                        this.power.set(0);
                    }
                    }


                    emit: Permite emitir eventos o valores desde un Observable.
                    subscribe: sirve para estar pendiente de todos los cambios que vaya emitiendo. Permite suscribirse a un Observable para recibir y reaccionar a los valores o eventos emitidos.




        ### Input Signals (Property Binding Manual) ###
            Utilizamos corchetes para asignar atributos
            Las señales encaminan estado

                Ej.:
                En el componente dragonball-super-page.component.html agregamos el componente hijo

                    <dragonball-character-list
                        [characters]="characters()"
                    >

                En el componente character-list.component recibimos del componente padre mediante el decorador @input

                    import { ChangeDetectionStrategy, Component, input } from '@angular/core';
                    import type { Character } from '../../../../../interfaces/character.interface'; -> notar como creamos una interfaz para utilizarla en la función genérica.

                    @Component({
                    selector: 'dragonball-character-list',
                    imports: [],
                    templateUrl: './character-list.component.html',
                    })
                    export class CharacterListComponent {
                    characters = input.required<Character[]>() -> aqui usamos la interfaz
                    }

    ## Servicios en Angular ##
    Los servicios en Angular son clases que encapsulan lógica y datos que pueden ser compartidos entre diferentes componentes. Utilizan el mecanismo de Inyección de Dependencias (Dependency Injection), lo que permite que actúen como Singletons, es decir, siempre se reutiliza la misma instancia del servicio en toda la aplicación.

    ### Beneficios de los Servicios:
    - **Centralización de la lógica de negocio**: Permiten mantener la lógica de negocio en un lugar centralizado, facilitando su mantenimiento y reutilización.
    - **Reutilización de código**: Los servicios pueden ser utilizados por múltiples componentes, evitando la duplicación de código.
    - **Facilitan el testing**: Al separar la lógica de negocio de los componentes, los servicios hacen que las pruebas unitarias sean más sencillas y efectivas.

    Ejemplo de un Servicio en Angular:
        ```typescript
        import { Injectable } from '@angular/core';

        @Injectable({
            providedIn: 'root'
        })
        export class DataService {
            private data: any[] = [];

            constructor() { }

            getData() {
                return this.data;
            }

            addData(item: any) {
                this.data.push(item);
            }
        }
        ```

    En este ejemplo, `DataService` es un servicio que maneja un array de datos. El decorador `@Injectable` con la propiedad `providedIn: 'root'` asegura que el servicio sea un Singleton y esté disponible en toda la aplicación.

    Ejemplo de Uso de un Servicio en un Componente:
        Para utilizar un servicio en un componente, se debe inyectar en el constructor del componente
            ```typescript
            import { Component, OnInit } from '@angular/core';
            import { DataService } from './data.service';

            @Component({
                selector: 'app-example',
                templateUrl: './example.component.html',
                styleUrls: ['./example.component.css']
            })
            export class ExampleComponent implements OnInit {
                data: any[] = [];

                constructor(private dataService: DataService) { }

                ngOnInit(): void {
                    this.data = this.dataService.getData();
                }

                addItem(item: any) {
                    this.dataService.addData(item);
                }
            }
            ```

        También se puede utilizar el método `inject` para inyectar el servicio de una manera más moderna:
            ```typescript
            import { Component, OnInit, inject } from '@angular/core';
            import { DataService } from './data.service';

            @Component({
                selector: 'app-example',
                templateUrl: './example.component.html',
                styleUrls: ['./example.component.css']
            })
            export class ExampleComponent implements OnInit {
                data: any[] = [];
                private dataService = inject(DataService);

                ngOnInit(): void {
                    this.data = this.dataService.getData();
                }

                addItem(item: any) {
                    this.dataService.addData(item);
                }
            }
            ```

        En este ejemplo, `ExampleComponent` utiliza `DataService` para obtener y agregar datos. La inyección del servicio se realiza a través del constructor del componente o utilizando el método `inject`.

        Los servicios en Angular son fundamentales para la arquitectura de aplicaciones escalables y mantenibles, proporcionando una forma eficiente de gestionar y compartir datos y lógica entre componentes.
    ## Efectos y LocalStorage ##
        LocalStorage y SessionStorage:
            Permiten guardar pares clave-valor, donde ambos deben ser strings.
            En caso de querer guardar objetos existe una forma de serializar un objeto a un string
            SessionStorage: cada vez que cerremos las instancias del navegador el SessionStorage se va a purgar
            LocalStorage: todo se va a preservar aunque la persona reinicie la computadora
                LocalStorage.clear()      => Limpia el LocalStorage
                LocalStorage.getItem()    => Obtiene el valor de una llave
                LocalStorage.setItem()    => Establecer un item
                LocalStorage.removeItem() => Remover un item
                LocalStorage.key()        => Para saber si existe la llave
                LocalStorage.length()     => Largo del LocalStorage
            NO GRABAR INFORMACIÓN SENSIBLE EN EL LocalStorage, porque un usuario con conocimiento basico
            puede manipularlo. 
            (Ej.: Tarjetas de crédito, información confidencial)
                
            

        Efectos:
            Las señales son útiles porque notifican a los consumidores interesados cuando cambian. Un efecto es una función (que
            recibeuna Callback Function) que se ejecuta cada vez que uno o más valores de señal cambian. Puedes crear un efecto
            con la función effect.

            Ej.: Cuando la signal del count cambie, ejecuta un console.log()
                effect(() => {
                    console.log(`The current count is: ${count()}`);
                });
            En nuestro caso queremos disparar un efecto para que cada vez que nuestros personajes cambien
            lo grabe en el LocalStorage
            ¿Para que sirven?:
                Nos sirven para poder ejecutar o disparar una acción(efecto) secundaria.

                    * Registrar datos que se muestran y cuándo cambian, ya sea para análisis o como herramienta de depuración.

                    * Mantener los datos sincronizados con window.localStorage.

                    * Agregar comportamiento DOM personalizado que no se puede expresar con la sintaxis de plantilla.

                    * Realizar renderizado personalizado a un <canvas>, biblioteca de gráficos u otra biblioteca de interfaz de
                    usuario de terceros.
                Los efectos NO SE UTILIZARÁN PARA HACER PETICIONES HTTP. Se puede, pero no se recomienda.
        onCleanup -> función que recibe por parámetro el efecto, que se dispara cada vez que el efecto se va a limpiar.
        Existen varios puntos en los cuales los efectos se van a limpiar:
            * Cuando vamos a destruir el componente
            * Cuando el efecto se vuelve a disparar (es decir la señal cambia)

    ## LinkedSignal ##
    ## HashRouter ##
    ## Despliegues ##
        ng build: construye la aplicación en modo de producción.



8hs y 06 min
GIFSAPP
LazyLoad

Separación de rutas

Rutas hijas

## Variables de entorno de Angular ##
    Existen varias maneras de trabajar las variables de entornos, pero las más comúnes es crear un "Objeto de Environments",
    el cuál posee dos propiedades:
        * Enviroments de Desarrollo
        * Enviroments de Producción

Angular CLI
    ng g environments: Angular CLI crea archivos de configuración para cada entorno definido. Por defecto, se crean dos archivos: 
    uno para el entorno de desarrollo (environment.ts) y otro para el entorno de producción (environment.prod.ts). Estos archivos
    se encuentran en la carpeta src/environments.
    Cada archivo de entorno contiene una constante environment que define varias propiedades de configuración. 
        Ej.: puedes definir una URL de API diferente para cada entorno.

----GIFS APP 1----

    inputs

    Comunicación entre componentes

    RouterOutlets anidados

    Señales

    Propiedades de componentes

    Tailwind

----GIFS APP 2----


    shift + ctrl + p -> paste json as code -> top level type name (GiphyResponse):
        Para que funcione debemos tener el objeto tipo JSON en el clipboard
    Manejo de rutas dinámicas

    Manejo de LocalStorage

    Observables a Señales

    Reutilización de componentes

    Peticiones HTTP

    Manejo de caché

    Mapeo de información

    Y más

## Operadores RxJS ##
        Permiten transformar lo que emitan los observable y que toda la lógica de procesamiento
        quede en el servicio, permitiendo que los componentes reciban toda la data lo más
        procesada posible

        tap: permite hacer algun efecto secundario, no transformaciones, no necesita un return
        tap(respuesta => console.log({tap1: respuesta})),
        tap(respuesta => console.log({tap2: respuesta})),
        tap(respuesta => console.log({tap3: respuesta}))

        map: permite barrer cada uno de los elementos de la respuesta y regresar una transformacion totalmente diferente.
        recibe como argumento lo que venga del operador anterior
        map(respuesta => `Hola Mundo ${ respuesta.data.length }`))



        catchError: El catchError debe retornar un Observable o lanzar una excepción
            Ej.:
                catchError(error => {
                    //El error que tiró la petición erronea lo ponemos en consola.
                    console.log("Error fetching", error);
                    // throwError genera un Observable<never> y hasta ahí llega la ejecución
                    return throwError(() => new Error(`No se pudo obtener países con el query: ${query}`));
                }),

        delay: nos permite ralentizar un tiempo, fecha o scheduler

## Manejo de Excepciones ##
    ### Handlers (Manejadores de Eventos que pueden ocurrir durante la vida de una suscripción a un Observable) ###
    .subscribe({
        next/next(value) -> cuando todo sale bien y vamos a obtener el siguiente valor del Observable
        error/error(error) -> si sucede alguna excepción por parámetro tenemos el error
        complete/complete() -> sucede cuando pase el error o el next (se termina el Observable)
    })

        Ej.:
            En el componente.ts:
                this.countryService.searchByCapital(query)
                    .subscribe({
                    next: (respuestaPeticion) => {

                        this.isLoading.set(false);
                        this.countries.set(respuestaPeticion);
                    },
                    error: (error) => {
                        //Si hubiera alguna excepción lanzada en el service mediante un operador CatchError, acá se pasa por parámetro y se muestra en pantalla
                        this.isLoading.set(false);
                        this.countries.set([]);
                        this.isError.set(error)
                    }
                });
            En el Service:
                searchByCapital(query: string):Observable<Country[]> {
                    query = query.toLowerCase();
                    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
                    .pipe(

                    map( respuestaPeticion => CountryMapper.mapRestCountryArrayToCountryArray(respuestaPeticion) ),

                    catchError(error => {
                        //El error que tiró la petición erronea lo ponemos en consola.
                        console.log("Error fetching", error);
                        // El catchError debe retornar un Observable o lanzar una excepción
                        // throwError genera un Observable<never> y hasta ahí llega la ejecución
                        return throwError(() => new Error(`No se pudo obtener países con el query: ${query}`));
                    }),
                    )
                }
## Resources ##
    El recurso es una función que se define mandandole por parámetro un objeto de configuracion.
    El objeto de configuración tiene dos propiedades/métodos:
        request: Fat Arrow Function que permite mandar los argumentos que queremos que pasen como argumento en la 
        función Loader, lo recomendable es mandar un objeto y cada argumento(señal) como propiedades. (SE ACONSEJA SEAN SEÑALES PARA SER REACTIVOS y REDISPARAR EL LOADER)
        loader: Fat arrow Function que recibe como argumento:
            abortSignal: utilizado en el caso de que se quiera cancelar la petición y ya no necesiten dispararla (abortarla)
            para hacer alguna nueva o ya no nos interese el valor anterior
            request: es el objeto que retorna el método request (por lo general contiene una señal.)
            previous:  es el valor anterior retornado por el loader, útil para comparar y decidir si se debe realizar una nueva petición o no.
        
        
        
        y realiza el trabajo asíncrono.
    La ventaja es que cada vez que cambie la señal que se pase como argumento a la request, el request se recomputa y
    llama al loader, con los valores que cambiaron de esa señal.
## rxResources ##


## Obtener parámetros del PATH ##
   ### SNAPSHOT ###
        Es una captura única de los parámetros de la ruta activa en el momento exacto en que se accede a ellos
        NO se actualiza automáticamente si los parámetros de la ruta cambian
        NO evita peticiones - simplemente es una forma no reactiva de acceder a los datos de la ruta
        Ej.:
            countryCode = inject(ActivatedRoute).snapshot.params['code']; // o paramsmap("code") -> el nombre del parámetro lo sacamos del archivo router


## Regresar en el PATH ##
   Ej.:
        location = inject(Location)
        goBack(){
            this.location.back()
        }


Caché

Router

QueryParameters

Configuraciones

Debounce


## Mapas y Sets ##
    Los mapas sirven para almacenar PARES DE LLAVE-VALOR y permite saber el orden de la inserción
    de las llaves.
    const miMapa = new Map()
    miMapa -> Map(0) {size: 0}
    
    Los sets permiten almacenar valores ÚNICOS tanto primitivos como referencias a objetos
    const miSet = new Set()
    miSet -> Set(0) {size: 0}

    https://gist.github.com/Klerith/aa4fa691df78588203d4223e747e7925

    Característica	             Map	                        Set
    Almacena	            Pares clave-valor	            Valores únicos
    Claves permitidas	    Cualquier tipo de dato	        No aplica
    Valores duplicados	    Permitidos (por clave única)	No permitidos
    Acceso por clave/valor	.get(key)	                    .has(value)
    Orden	                Mantiene el orden	            Mantiene el orden
    Uso común	            Asociaciones clave-valor	    Listas sin duplicados

## QueryParameters ##

    activatedRoute = inject(ActivatedRoute);
    

    Existen dos formas de utilizar los queryParameters:
    * **Estático**: Utiliza `snapshot`, que es una captura de los parámetros de la ruta en un momento específico, sin
    necesidad de suscribirse a un Observable. utilizado cuando se necesita leer los parámetros una vez y no reaccionar a cambios en los parámetros.
        Se poseen dos opciones:

            *queryParams: permite el acceso directo como objeto simple.

                queryParam = this.activatedRoute.snapshot.queryParams["query"] ?? ""; // el ?? "" nos asegura siempre la propiedad queryParams reciba un string, cuando no exista queryparameters en la ruta.

            *queryParamMap: permite el acceso a través de métodos de ParamMap.

                queryParam = this.activatedRouter.snapshot.queryParamMap.get("query") ?? ""
                queryParam = this.activatedRouter.snapshot.queryParamMap.has("query")


    * **Reactivo**: Nos suscribimos a un Observable para recibir actualizaciones en tiempo real cuando los parámetros cambian.
        Se poseen dos opciones:
            *queryParams: Usando queryParams como Observable

                this.activatedRoute.queryParams.subscribe(params => {
                // Se ejecuta cada vez que cambian los parámetros de consulta
                this.queryParam = params['query'] ?? '';
                
                // Lógica adicional basada en el cambio de parámetros
                this.loadData();
                });
            *queryParamMap: Usando queryParamMap como Observable

                this.activatedRoute.queryParamMap.subscribe(params => {
                // Se ejecuta cada vez que cambian los parámetros de consulta
                this.queryParam = params.get('query') ?? '';
                
                // También puedes usar otros métodos de ParamMap
                if (params.has('filter')) {
                    this.filter = params.get('filter');
                }
                
                // Lógica adicional basada en el cambio de parámetros
                this.loadData();
                });

## Pipes en Angular ##

### DatePipe ###
Transforma una fecha en una cadena de texto con un formato específico.
```html
{{ today | date:'fullDate' }}
```

### UpperCasePipe ###
Convierte una cadena de texto a mayúsculas.
```html
{{ 'hello' | uppercase }}
```

### LowerCasePipe ###
Convierte una cadena de texto a minúsculas.
```html
{{ 'HELLO' | lowercase }}
```

### TitleCasePipe ###
Convierte la primera letra de cada palabra en mayúscula.
```html
{{ 'hello world' | titlecase }}
```

### CurrencyPipe ###
Formatea un número como una moneda.
```html
{{ 1234.56 | currency:'USD' }}
```

### DecimalPipe ###
Formatea un número con decimales.
```html
{{ 1234.56 | number:'1.2-2' }}
```

### PercentPipe ###
Formatea un número como un porcentaje.
```html
{{ 0.1234 | percent }}
```

### i18nPluralPipe ###
Selecciona una cadena de texto basada en una cantidad.
```html
{{ messages.length | i18nPlural: messageMapping }}
```

### i18nSelectPipe ###
Selecciona una cadena de texto basada en un valor de clave.
```html
{{ gender | i18nSelect: genderMapping }}
```

### JsonPipe ###
Convierte un objeto en una cadena JSON.
```html
{{ object | json }}
```

### KeyValuePipe ###
Transforma un objeto o mapa en un array de pares clave-valor.
```html
<div *ngFor="let item of object | keyvalue">
  {{item.key}}: {{item.value}}
</div>
```
### AsyncPipe ###
El `AsyncPipe` se utiliza para suscribirse a un `Observable` o `Promise` y obtener su valor emitido. Se encarga automáticamente de la suscripción y cancelación, lo que ayuda a evitar fugas de memoria.

```html
<div *ngIf="data$ | async as data">
    {{ data }}
</div>
```

En este ejemplo, `data$` es un `Observable` o `Promise`, y el `AsyncPipe` se suscribe a él, asignando el valor emitido a la variable `data`.


Pipes para transformar strings

Pipes dentro de propiedades computadas

Pipes para filtrar arreglos

Pipes para ordenar arreglos


Validaciones personalizadas

Síncronas

Asíncronas

Validaciones con

Patrones

Expresiones regulares

Palabras en concreto

Selectores

Checkboxes

Radios

Peticiones HTTP en secuencai

Suscripciones de cambios de los campos del formulario







IMPORTANTE
La diferencia entre poner entre [] y sin [] es que sin [] es cuando le asignamos un string y con [] es cuando asignamos una variable.


Cuando presionas Enter en un <input> dentro de un <form>, el navegador interpreta que deseas enviar el formulario, lo que provoca un submit automático. Esto ocurre por el comportamiento predeterminado de los formularios en HTML.

    ¿Por qué sucede esto?
        1. Comportamiento nativo de HTML

            Si un <input> está dentro de un <form> y no hay un botón de envío (<button type="submit"> o <input type="submit">), al presionar Enter, el navegador intenta enviarlo automáticamente.

        2. El primer botón submit disponible

            Si el formulario tiene un botón submit, el navegador lo ejecuta al presionar Enter dentro de cualquier campo del formulario.
    ¿Cómo evitarlo?
        Puedes usar event.preventDefault() para evitar que el formulario se envíe:


## LifeCycle Hooks
    ### ngOnInit
        Utilizado cuando queremos hacer una peticion http cuando el componente es montado.
        Con el Resource o RxResource ya no hace falta este hook
    ## ngOnDestroy
        Metodo del ciclo de vida de los componentes de angular que se dispara cuando el componente va a ser destruido
        comunmente utilizado para
            * hacer limpieza
            * quitar Observables
            * cancelar suscripciones
            * notificar un webSocket de que una persona no esta en esta pantalla

        Pero el Resource RxResource con la funcion Cleanup terminan opacando el ngOnDestroy