// export interface User extends Age {
//     name: string
// }
//
// interface Age {
//     age: number
// }

// export interface setUser {
//     (name: string, age: number): string;
// }
//
export type Age = {
    age: number
}
export type User = {
    name: string;
    sayNumber(a: string): string;
} & Age

// export type SetUser = (name: string, age: number) => void;

// export interface Name {
//     name: string
// }

// export type User = Name & {
//     age:number
// };
export const obj = {
    a: 1
}
// export function sum(a,b) {
//     return a+b;
// }
// export type Age = {
//     age: number
// }
enum Color {Red, Green, Blue}

let c: Color = Color.Green;
console.log('color', c)


export interface SearchFunc {
    (source: string, subString: string): boolean;
}

export interface ClockConstructor {
    new(hour: number, minute: number): any;
}

export interface ClockInterface {
    tick();
}

export interface SayName {
    (param: string): string;
}

export interface sum {
    (this: void, a: string, ...b: string[]): string
}
export interface sum {
    (this: void, a: number, ...b: number[]): number
}
// let s: sum = function d(a, b, c) {
//     return 5;
// }

// s(2,3)
class Handler {
    info: string;
    onClickGood(this: Handler, e: any) {
        this.info
        // can't use this here because it's of type void!
        console.log('clicked!');
    }
}
let h = new Handler();
document.getElementById('s').addEventListener('click',h.onClickGood);
