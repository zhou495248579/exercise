import {Dep} from "./watch";

export default class Observer {
    constructor(data) {
        this.observe(data);
    }

    observe(data) {
        if (data && typeof data === 'object') {
            for (const key of Object.keys(data)) {
                this.defineReactive(data, key, data[key]);
            }
        }
    }

    defineReactive(data, key, value) {
        this.observe(value);
        const dep = new Dep();
        Object.defineProperty(data, key, {
            configurable: false,
            enumerable: true,
            get: () => {
                Dep.target && dep.add(Dep.target)
                return value;
            },
            set: (v) => {
                this.observe(v);
                if (v !== value) {
                    value = v;
                    dep.notify();
                }
            }
        })
    }
}
