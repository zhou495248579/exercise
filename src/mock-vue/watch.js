import {CompileUtil} from "./utils";

export class Dep {
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

export class Watch {
    constructor(expr, vm, callBack) {
        this.expr = expr;
        this.vm = vm;
        this.callBack = callBack;
        this.oldValue = this.getOldValue();
    }

    update() {
        const newValue = CompileUtil.getValue(this.expr, this.vm);
        if (this.oldValue !== newValue) {
            this.callBack(newValue);
            this.oldValue = newValue;
        }
    }

    getOldValue() {
        Dep.target = this; // 用这种方式就不能Dep类与Watch类分在两个文件，webpack打包target值会丢掉
        const oldValue = CompileUtil.getValue(this.expr, this.vm); // 获取data中的值，在get中添加Watch入Dep
        Dep.target = null;
        return oldValue;
    }
}
