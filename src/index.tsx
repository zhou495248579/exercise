import * as React from "react";
import App from "./App";
import "./styles/index.scss";
import { BScroll } from "./b-scroll";
import * as ReactDom from "react-dom";

new BScroll();
ReactDom.render(<App />, document.getElementById("root"));
