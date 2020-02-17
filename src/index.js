import html from './index.html'
import styles from './styles/index.less';

import  './pollfill/index'
function f(param) {
    console.log(arguments);
    this.a =param
}
const obj={};
// const newF = f.mockbind(obj,'3', '2', '1')
// newF('a', 'b', 'c')

f.mockApply(
    obj,['p']
)
console.log(obj)
