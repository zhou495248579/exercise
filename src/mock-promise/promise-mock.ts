enum Status {
  pending = "pending",
  success = "success",
  fail = "fail",
}
export class PromiseMock {
  private status = Status.pending;
  private successCallback = [];
  private failCallback = [];
  private value;
  private error;

  private onResolve = (value) => {
    if (this.status !== Status.pending) {
      return;
    }
    this.status = Status.success;
    this.value = value;
    this.successCallback.forEach((fun) => {
      fun(value);
    });
  };

  private onReject = (error) => {
    if (this.status !== Status.pending) {
      return;
    }
    this.status = Status.fail;
    this.error = error;
    this.failCallback.forEach((fun) => {
      fun(error);
    });
  };

  constructor(run) {
    run(this.onResolve, this.onReject);
  }
  private resolvePromise = (promise, result, resolve, reject) => {
    if (promise === result) {
      reject(new Error("循环引用"));
    }
    if (result instanceof PromiseMock) {
      if (result.status === Status.pending) {
        result.then((d) => {
          this.resolvePromise(promise, d, resolve, reject);
        }, reject);
      } else {
        result.then(resolve, reject);
      }
      return;
    }
    resolve(result);
  };
  then(
    successCallBack: Function = (data) => data,
    failCallBack: Function = (e) => e
  ) {
    let innerPromise = null;
    if (this.status === Status.pending) {
      return (innerPromise = new PromiseMock((resolve, reject) => {
        this.successCallback.push(() => {
          const result = successCallBack(this.value);
          this.resolvePromise(innerPromise, result, resolve, reject);
        });
        this.failCallback.push(() => {
          const result = failCallBack(this.error);
          this.resolvePromise(innerPromise, result, resolve, reject);
        });
      }));
    } else if (this.status === Status.fail) {
      return (innerPromise = new PromiseMock((resolve, reject) => {
        this.resolvePromise(
          innerPromise,
          failCallBack(this.error),
          resolve,
          reject
        );
      }));
    } else {
      return (innerPromise = new PromiseMock((resolve, reject) => {
        this.resolvePromise(
          innerPromise,
          successCallBack(this.value),
          resolve,
          reject
        );
      }));
    }
  }
}

