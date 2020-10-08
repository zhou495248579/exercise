import { CompileUtils } from "./utils";

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
    });
  }
}
export class Watch {
  constructor(expr, vm, callback) {
    this.$vm = vm;
    this.expr = expr;
    this.callback = callback;
    this.oldValue = this.getOldValue();
  }
  update() {
    const value = CompileUtils.getValue(this.expr, this.$vm);
    if (value !== this.oldValue) {
      this.callback(value);
      this.oldValue = value;
    }
  }
  getOldValue() {
    Dep.target = this;
    const value = CompileUtils.getValue(this.expr, this.$vm);
    Dep.target = null;
    return value;
  }
}
