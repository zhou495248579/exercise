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

function add<T>(param: T): T {
    const arr = [];
    arr.push(param);
    return param;
}

let a = add(2);

interface GenericIdentityFn<T> {
    <T>(arg: T): T;
}

let identity: GenericIdentityFn<number> = function (a) {
    return a
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

interface Lengthwise {
    length: number;
}

class GenericNumber<T> {
    zeroValue: T;
    num: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.num = 's';
myGenericNumber.add = function (x: number, y: number) {
    return x + y;
};
// const g = new GenericNumber<number>();
// g.zeroValue = 1;
// g.num = 'ss';


function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = {a: 1, b: 2, c: 3, d: 4};

export enum FileAccess {
    // constant members
    None,
    Read = 1 + 2,
    Write = 3,
    // computed member
}

let variable = 1;

export enum enumType {
    A = 1 + variable
}

// let enumA: enumType.A = enumType.A;
// let cc: FileAccess.Write = FileAccess.Write;
enum E {
    X, Y, Z
}

function f(obj: { X: number }) {
    return obj.X;
}

const enum Directions {
    Up = 1,
    Down = 1 + Up,
    Left,
    Right
}

declare enum Enum {
    A = 1,
    B,
    C = 2
}

declare enum Foo {
    X, // Computed
    Y = 2, // Non-computed
    Z, // Computed! Not 3! Careful!
    Q = 1 + 1 // Error
}

let f1 = () => ({name: 'Alice'});
let f2 = () => ({name: 'Alice', location: 'Seattle'});
f1 = f2; // OK
enum EventType { Mouse = '2', Keyboard = '2' }

interface Event {
    timestamp: number;
}

interface MouseEvent extends Event {
    x: number;
    y: number
}

interface KeyEvent extends Event {
    keyCode: number
}

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
    /* ... */
}

// Unsound, but useful and common
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));

// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
listenEvent(EventType.Keyboard, () => console.log('s'));

function invokeLater(args: any[], callback: (x, y) => void) {
}

invokeLater([1, 2], (x?, y?) => console.log());

// Confusing (x and y are actually required) and undiscoverable
// invokeLater([1, 2], (x) => console.log(x + ', ' + y));


let fun1 = function (x) {

};

let fun2 = function () {
    console.log(2);
};

// fun2 = fun1

class Animal {
    private feet: number;

    constructor(name: string, numFeet: number) {
    }
}

class Tiger extends Animal {

}

interface Bird {
    fly();

    layEggs();
}

interface Fish {
    swim();

    layEggs();
}


class Size {
    private feet: number;

    constructor(numFeet: number) {
    }
}

let animal: Animal;
let size: Size;
let tiger: Tiger
animal = tiger;  // OK

function isBird(param: Bird | Fish): param is Bird {
    return (param as Bird).fly !== undefined;
}

const bird: Bird = {
    fly() {
    }, layEggs() {
    }
}

interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    spac(){

    }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    str() {

    }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}
type T02 = Exclude<string | number | (() => void), Function>;  // string | number
