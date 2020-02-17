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
    name: string,
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
console.log('color',c)
