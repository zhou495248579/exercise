import html from './index.html'
import styles from './styles/index.less';

import  './pollfill/index'
function f(param) {
    this.a =param
}
const obj={};
f.mockApply(
    obj,['p']
)
console.log(obj)
