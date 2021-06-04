export class MyPromise {
  resolve() {}
  reject() {}
  constructor(fn: (res: unknown, rej: unknown) => void) {
    if (typeof fn !== "function") {
      throw new Error("fn 不是一个函数");
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  then = () => {};
}
