// import html from './index.html'
// import styles from './styles/index.less';

import {ClockInterface, FileAccess, SayName, SearchFunc, sum, User} from "./ts-learn/type";

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
};

class Clock implements ClockInterface {
    currentTime: Date;

    constructor(h: number, m: number) {
    }

    tick() {
        console.log("beep beep");
    }
}

class Control implements SelectableControl {
    private state: any;

    select() {

    }
}

interface SelectableControl extends Control {
    select(): void;
}


abstract class Department {
    abstract printMeeting() ;

}

//
// class AccountDepart extends Department implements User {
//     printMeeting() {
//     }
//
//     age: number;
//     name: string;
//     sayNumber(a: string)  {
//         return 1;
//     };
// }
//
//
// let a: SayName = function (a: string) {
//     return 1;
// };
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function (this: void) {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            // return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}
let fun = deck.createCardPicker();
// let cardPicker = fun();
// let pickedCard = cardPicker();

// alert("card: " + pickedCard.card + " of " + pickedCard.suit);

function sum(a: number, b: number): number;
function sum(a: string, b: string): string;
function sum(a, b) {
    return a + b;
}

// sum(2,'s')

let s: sum = function (a, b) {
    return a + b;
};
let a = s('1', '2');
//
// function pickCard(x: {suit: string; card: number; }[]): number;
// function pickCard(x: number): {suit: string; card: number; };
// function pickCard(x) {
//     // Check to see if we're working with an object/array
//     // if so, they gave us the deck and we'll pick the card
//     if (typeof x == "object") {
//         let pickedCard = Math.floor(Math.random() * x.length);
//         return pickedCard;
//     }
//     // Otherwise just let them pick the card
//     else if (typeof x == "number") {
//         let pickedSuit = Math.floor(x / 13);
//         return { suit: suits[pickedSuit], card: x % 13 };
//     }
// }

