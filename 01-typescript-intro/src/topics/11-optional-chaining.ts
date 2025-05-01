import { Passenger } from './11-optional-chaining';
export interface Passenger {
    name: string,
    children?: string[],
}
const passenger1: Passenger = {
    name: "Fernando",
}
const passenger2: Passenger = {
    name: "Melissa",
    children: ["Natalia","Elizabeth"],
}

const printChildren = (passenger: Passenger):number => {
    // ----Optional Chaining Operator----
    // const howManyChildren = passenger.children?.length || 0;
    // ----Not Null Assertion Operator----
    // El simbolo de admiración significa que siempre va a recibir ese hijo
    // si no recibe el hijo, va a lanzar un error.
    // este operador funciona cuando trabajamos con propiedades solamente, en cualquier otro lugar es una negación.
    const howManyChildren = passenger.children!.length || 0; 
    console.log(howManyChildren);
    return howManyChildren
}
printChildren(passenger1);