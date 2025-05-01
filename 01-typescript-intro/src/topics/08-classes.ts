export class Person {
  // public name: string;
  // private address :string;
  constructor(public name: string,public lastname: string ,public address: string = "No address") {
    this.name = name;
    this.address = address;
  }
}
// En tiempo de compilación se rompe encapsulamiento.
// export class Hero extends Person {

//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string
//     ){
//         super(realName, "New York");
//     }
// }

//----Priorizar composición por sobre herencia----
// esto permise el reuso de comportamiento por composición a otras clases, sin necesidad de romper el encapsulamiento
// mediante herencia. Y así un heroe distinto (Ej.: Hulkbuster) puede reusar la misma instancia de persona.
// en tiempo de ejecución ocurre todo
export class Hero {
  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string,
    public person: Person
  ) {
    this.person = new Person(realName);
  }
}

const tony = new Person("Tony","Stark", "New York");
const ironman = new Hero("Iron Man", 45, "Tony Stark", tony);

console.log(ironman);
