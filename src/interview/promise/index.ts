import { isFunction } from "../../utils/utils";
export enum State {
  pending,
  fulfilled,
  rejected,
}
type onFulfilled = (data: unknown) => void;
type onRejected = (error: unknown) => void;
export class MyPromise {
  onFulfilled: onFulfilled | undefined;
  onRejected: onRejected | undefined;
  state = State.pending;
  resolve(data: unknown) {
    if (this.state !== State.pending) {
      return;
    }
    this.state = State.fulfilled;
    setTimeout(() => {
      this.onFulfilled?.(data);
    });
  }
  reject(error: unknown) {
    if (this.state !== State.pending) {
      return;
    }
    this.state = State.rejected;
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
