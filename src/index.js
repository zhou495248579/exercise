import html from './index.html'
import styles from './styles/index.less';

import  './pollfill/index'
import {debounce, throttle} from "./pollfill";

window.addEventListener('scroll', throttle(() => {
    console.log('scroll')
}, 500));
