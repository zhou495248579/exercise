class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldValue = this.getOldValue();
    }

    update() {
        const newValue = CompileUtil.getValue(this.expr, this.vm);
        if (newValue !== this.oldValue) {
            this.cb(newValue);
            this.oldValue = newValue;
        }
    }

    getOldValue() {
        Dep.target = this;
        const oldValue = CompileUtil.getValue(this.expr, this.vm);
        Dep.target = null;
        return oldValue
    }
}

class Dep {

    constructor() {
        this.subs = [];
    }

    add(watcher) {
        this.subs.push(watcher);
    }

    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}

class Observer {
    constructor(data) {
        this.observe(data);
    }

    observe(data) {
        if (data && typeof data === 'object') {
            for (let key of Object.keys(data)) {
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
            get() {
                Dep.target && dep.add(Dep.target);
                return value
            },
            set: (newValue) => {
                this.observe(newValue);
                if (newValue !== value) {
                    value = newValue;
                    dep.notify();
                }
            }

        })
    }
}
