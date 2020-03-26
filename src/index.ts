// import html from './index.html'
// import styles from './styles/index.less';

import {ClockInterface, SayName, SearchFunc, User} from "./ts-learn/type";

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
// let deck = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     createCardPicker: function() {
//         // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
//         return () => {
//             let pickedCard = Math.floor(Math.random() * 52);
//             let pickedSuit = Math.floor(pickedCard / 13);
// debugger
//             return {suit: this.suits[pickedSuit], card: pickedCard % 13};
//         }
//     }
// }
// let fun = deck.createCardPicker;
// let cardPicker = fun();
// let pickedCard = cardPicker();
//
// alert("card: " + pickedCard.card + " of " + pickedCard.suit);
