import html from './index.html'
import styles from './styles/index.less';
import Promise from "./mock-promise/promise";

const p = new Promise((resolve, rejected) => {
    resolve('hello');
});
p.then((data) => {
    // console.log(data);
    // return data
    return new Promise((resolve, reject) => {
        resolve(data + '1');
    })
}, (error) => {
    console.error(error);
}).then((data) => {
    console.log(data)
}, (error) => {
    console.error(error)
})
