import html from './index.html'
import styles from './styles/index.less';

import './pollfill/index'

const person = {
    name: 'lilei'
};


function createAnotherPerson(person) {
    const anotherPerson = Object.create(person);
    anotherPerson.name = 'tom';
    anotherPerson.sayName = function () {
        console.log(this.name)
    };
    return anotherPerson;
}

const anotherPerson = createAnotherPerson(person);
anotherPerson.sayName()