// import html from './index.html'
// import styles from './styles/index.less';

import './pollfill/index'
import {flat} from "./pollfill";

console.log(flat([1,[2,3], [4,[5, 6]]]))