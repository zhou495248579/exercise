import { isFunction } from "../../utils/utils";
export enum State {
  pending,
  fulfilled,
  rejected,
}
type onFulfilled = (data: unknown) => void;
type onRejected = (error: unknown) => void;
type handle = [
  onFulfilled | undefined | null,
  onRejected | null | undefined,
  MyPromise
];
enum Method {
  res = 0,
  rej = 1,
}
export class MyPromise {
  callBack: handle[] = [];
  state = State.pending;

  resolveWith(param: any) {
    if (this === param) {
      this.reject(new TypeError("环"));
    }
    if (param instanceof MyPromise) {
      this.resolvePromise(param);
    } else if (param instanceof Object) {
      this.resolveWithObject(param);
    } else {
      this.resolve(param);
    }
  }

  private resolveWithObject(param: any) {
    const then = param.then;
    console.log(then)
    if (isFunction(then)) {
      this.resolveWithThenable(param);
    } else {
      this.resolve(param);
    }
  }

  private resolveWithThenable(param: any) {
    try {
      param.then(
        (d: unknown) => {
          this.resolveWith(d); // 这地方和promise不一样
        },
        (r: unknown) => {
          this.reject(r);
        }
      );
    } catch (e) {
      this.reject(e);
    }
  }

  private resolvePromise(param: MyPromise) {
    param.then(
      (d) => {
        this.resolve(d);
      },
      (e) => {
        this.reject(e);
      }
    );
  }

  resolveOrReject(data: unknown, i: Method) {
    if (this.state !== State.pending) {
      return;
    }
    this.state = i === Method.res ? State.fulfilled : State.rejected;
    nextTick(() => {
      this.callBack.forEach((item) => {
        let r;
        try {
          r = item[i]?.call(undefined, data);
        } catch (e) {
          return item[2]?.reject(e);
        }
        item[2].resolveWith(r);
      });
    });
  }

  resolve(data: unknown) {
    this.resolveOrReject(data, Method.res);
  }
  reject(error: unknown) {
    this.resolveOrReject(error, Method.rej);
  }
  constructor(fn: (res: any, rej: any) => void) {
    if (typeof fn !== "function") {
      throw new Error("fn 不是一个函数");
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  then = (onFulfilled?: onFulfilled | null, onRejected?: onRejected | null) => {
    const handle: handle = [null, null, new MyPromise(() => void 0)];
    if (isFunction(onFulfilled)) {
      handle[0] = onFulfilled;
    }
    if (isFunction(onRejected)) {
      handle[1] = onRejected;
    }
    this.callBack.push(handle);
    return handle[2];
  };
}

function nextTick(fn: () => void) {
  if (process !== undefined && typeof process.nextTick === "function") {
    return process.nextTick(fn);
  } else {
    var counter = 1;
    var observer = new MutationObserver(fn);
    var textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
      characterData: true,
    });

    counter = counter + 1;
    textNode.data = String(counter);
  }
}
