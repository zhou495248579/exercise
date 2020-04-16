import React, {Component} from "react";

export class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
        this.addCounter = this.addCounter.bind(this);
    }

    render() {
        throw new Error('报错了')
        return (
            <div>
                <span>
                    counter {this.state.counter}
                </span>
                <button onClick={this.addCounter}>增加</button>
            </div>
        );
    }

    static getDerivedStateFromProps(props, state) {
        // 只要当前 user 变化，
        // 重置所有跟 user 相关的状态。
        // 这个例子中，只有 email 和 user 相关。
        // console.log(props, state)
        return null;
    }


    addCounter() {
        this.setState({
            counter: this.state.counter + 1
        });
    }
}
