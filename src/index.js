import html from './index.html';
import styles from './styles/index.less';
import {RandomDispatchMoney} from "./randomDispatchMoney";

const box = document.getElementById('box');
const random = new RandomDispatchMoney(50, box);
random.beginRandomDispatch(10);