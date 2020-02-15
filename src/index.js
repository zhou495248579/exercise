import html from './index.html'
import styles from './styles/index.less';
import Promise from "./mock-promise/promise";

// const p1 = new Promise((resolve, rejected) => {
//     resolve('p1');
// });
//
// const p2 = new Promise((resolve, rejected) => {
//     resolve('p2');
// });
//
// const p3 = new Promise((resolve, rejected) => {
//     resolve('p3');
// });
// // Promise.reject('邹正你妈死了').catch((error) => {
// //     console.error(error)
// // })
// Promise.race([p1, p2, p3]).then((result) => {
//     console.log(result)
// })

var m = function mock(param) {
    switch (typeof param) {
        case 'number':
            return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + Number.MIN_SAFE_INTEGER;
        case 'boolean':
            return Math.random() - 0.5 > 0;
        case 'string':
            const numberCodeList = [];
            for (let i = 0; i < param.length; i++) {
                numberCodeList.push(Math.floor(Math.random() * (122 - 97 + 1)) + 97)
            }
            return String.fromCharCode(...numberCodeList);
        default:
            throw new Error('type error');
    }
};
for (let i = 0; i < 100; i++) {
    console.log(m('ssss'));
}
