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

class AccountDepart extends Department implements User {
    printMeeting() {
    }

    age: number;
    name: string;
    sayNumber(a: string)  {
        return 1;
    };
}


let a: SayName = function (a: string) {
    return 1;
};
