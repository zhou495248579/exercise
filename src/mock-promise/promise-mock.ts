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

  then(successCallBack: Function = (data) => data, failCallBack = (e) => e) {
    if (this.status === Status.pending) {
      this.successCallback.push(successCallBack);
      this.failCallback.push(failCallBack);
    } else if (this.status === Status.fail) {
      failCallBack(this.error);
    } else {
      successCallBack(this.value);
    }
  }
}

const p = new PromiseMock((res, rej) => {
  setTimeout(()=> {
      res("d");

  },3000)
});
p.then((d) => {
  console.log(d);
});
