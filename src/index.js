import html from './index.html'
import styles from './styles/index.less';
// import styles from './styles/styles.css';
import "@babel/polyfill";


import Counter from './counter';
import Number from "./number";
Counter();
new Number();

if(module.hot) {
  module.hot.accept('./number', () => {
      document.body.removeChild(document.getElementById('number'));
      new Number();
  })
}
new Promise((resolve, reject) => {
    resolve('helle')
}).then((res) => {
    console.log(res)
})

[1,2,3].map((item) => {
    return item + 1;
})
