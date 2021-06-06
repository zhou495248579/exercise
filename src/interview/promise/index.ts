type onFulfilled = (data: unknown) => void;
type onRejected = (error: unknown) => void;
export class MyPromise {
  onFulfilled: onFulfilled | null = null;
  onRejected: onRejected | null = null;

  resolve(data: unknown) {
    setTimeout(() => {
      this.onFulfilled?.(data);
    });
  }
  reject(error: unknown) {
    setTimeout(() => {
      this.onRejected?.(error);
    });
  }
  constructor(fn: (res: unknown, rej: unknown) => void) {
    if (typeof fn !== "function") {
      throw new Error("fn 不是一个函数");
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  then = (onFulfilled: onFulfilled, onRejected: onRejected) => {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  };
}
