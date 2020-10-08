import html from './index.html'
import styles from './styles/index.less';
import Vue from './mock-vue/vue';

var vue = new Vue(
    '#box',
    {
        text: {
            value: '文本'
        }
    }
)

const input = document.getElementById('input');
input.addEventListener('input', (e) => {
    vue.$data.text.value = e.target.value;
})
