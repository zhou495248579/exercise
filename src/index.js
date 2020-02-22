import html from './index.html'
import styles from './styles/index.less';

import render from './render';
function getLodash() {
   return  import('lodash'
        ).then(() => {
            const div = document.createElement('div')
       div.innerText = _.join([1, 2, 3], '**')
        return div
    })
}

const btn = document.getElementById('loadButton');
btn.addEventListener('click',() => {
    getLodash().then((result) => {
        document.body.appendChild(result);
    })
}, false)
const renderbtn = document.getElementById('render');
renderbtn.addEventListener('click',() => {
    render();

}, false)
