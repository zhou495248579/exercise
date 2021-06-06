import { isFunction } from "../../utils/utils";

type onFulfilled = (data: unknown) => void;
type onRejected = (error: unknown) => void;
export class MyPromise {
  onFulfilled: onFulfilled | undefined;
  onRejected: onRejected | undefined;

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

  then = (onFulfilled?: onFulfilled, onRejected?: onRejected) => {
    if (isFunction(onFulfilled)) {
      this.onFulfilled = onFulfilled;
    }
    if (isFunction(onRejected)) {
      this.onRejected = onRejected;
    }
  };
}
