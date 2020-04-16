import React, {Component} from "react";
import {Counter} from "./counter/counter";

export class App extends Component {
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }

    static getDerivedStateFromError(er) {

    }

    render() {
        return (<div>
            <Counter/>
        </div>);
    }
}
