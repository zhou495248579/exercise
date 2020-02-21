import html from './index.html'
import styles from './styles/index.less';
import Vue from './mock-vue/vue';
import yonerImg from './images/yonger.jpg'
const box = document.getElementById('box');

var img = document.createElement('img');
img.src = yonerImg;
box.appendChild(img);
