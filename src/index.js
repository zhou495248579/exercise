// import html from './index.html'
// import styles from './styles/index.less';

import './pollfill/index'
import {DateConstructor, inherit} from "./pollfill";

function Parent() {
    this.name = 'parent'
}

Parent.prototype.sayName = function () {
    console.log(this.name)
}
inherit(Child, Parent);

function Child() {
    this.type = 'type';
}

Child.prototype.sayType = function () {
    console.log(this.type)
}
Parent.a = 's'

const c = new Child();
c.sayName();
c.sayType();
console.log(c.a)
console.log(DateConstructor())