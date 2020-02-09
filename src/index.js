import html from './index.html'
import styles from './styles/index.less';
import Promise from "./mock-promise/promise";

const p1 = new Promise((resolve, rejected) => {
    resolve('p1');
});

const p2 = new Promise((resolve, rejected) => {
    resolve('p2');
});

const p3 = new Promise((resolve, rejected) => {
    resolve('p3');
});
// Promise.reject('邹正你妈死了').catch((error) => {
//     console.error(error)
// })
Promise.race([p1, p2, p3]).then((result) => {
    console.log(result)
})
