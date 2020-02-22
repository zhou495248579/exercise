import html from './index.html'
import styles from './styles/index.less';
// import styles from './styles/styles.css';
import "@babel/polyfill";
import App from "./app";
import React from 'react';
import ReactDOM from 'react-dom'

ReactDOM.render(<App/>, document.getElementById('box'));
