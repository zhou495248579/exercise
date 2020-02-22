import html from './index.html'
import styles from './styles/index.less';
// import styles from './styles/styles.css';
import yonerImg from './images/yonger.jpg'
import createImg from "./createImg";

createImg();
const box = document.getElementById('box');
var img = document.createElement('img');
img.classList.add(styles.yonger);
img.src = yonerImg;
box.appendChild(img);
console.log('sd')
console.log('sd')
