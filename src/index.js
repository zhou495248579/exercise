import html from './index.html'
import styles from './styles/index.less';
import Vue from './mock-vue/vue';

var vue = new Vue(
    '#box',
    {
        text: {
            value: '文本'
        },
        html: '<h1>html</h1>',
        inputValue: 'input'
    },
    {
        clickButton() {
            alert(this.$data.text.value);
        }
    }
)

// const input = document.getElementById('input');
// input.addEventListener('input', (e) => {
//     vue.$data.text.value = e.target.value;
// })

// const htmlBtn = document.getElementById('changeHtmlBtn');
// htmlBtn.addEventListener('click', (e) => {
//     vue.$data.html = '<h2>changeHtml</h2>'
// })
