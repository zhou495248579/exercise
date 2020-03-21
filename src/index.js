// import html from './index.html'
// import styles from './styles/index.less';

// import './pollfill/index'
import {Child} from "./pollfill/inherit";

const child = new Child();
// console.log(child.name, child.hasOwnProperty('name'))
console.log(child)
child.setName('ss')
console.log(child.getName())