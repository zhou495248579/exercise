import html from './index.html'
import styles from './styles/index.less';

import './pollfill/index'
import {mockInstanceOf} from "./pollfill";

const result = mockInstanceOf(3, Array);
const obj = {
    valueOf: function() {
      return 2
    },
    toString:function () {
        return 1;
    }
};
console.log(obj + true);