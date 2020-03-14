import html from './index.html'
import styles from './styles/index.less';

import './pollfill/index'
import {get, mockInstanceOf} from "./pollfill";

const obj = {
    user: {
        posts: [
            { title: 'Foo', comments: [ 'Good one!', 'Interesting...' ] },
            { title: 'Bar', comments: [ 'Ok' ] },
            { title: 'Baz', comments: []}
        ],
        comments: ['sd']
    }
}
console.log(get(['user', 'posts', 0, 'comments'], obj)) // [ 'Good one!', 'Interesting...' ]