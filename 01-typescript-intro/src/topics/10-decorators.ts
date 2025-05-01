function classDecorator<T extends {new (...args:any[]):{}}>(constructor: any){
    return class extends constructor {
        newProperty = "New Property";
        hello = "Override";
    }
}

@classDecorator
class SuperClass { 
    public myProperty: string = "Abc123";
    print(){
        console.log("Hola Mundo");
    }
}

console.log(SuperClass);
const myClass = new SuperClass();
console.log(myClass);

