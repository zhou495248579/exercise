import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import { MyPromise, State } from "../src/interview/promise";

chai.use(sinonChai);

const assert = chai.assert;

describe("promise", () => {
  it("promise is class", () => {
    assert.isFunction(MyPromise);
    assert.isObject(MyPromise.prototype);
  });
  it("new Promise() 如果接受的不是一个函数就报错", () => {
    assert.throw(() => {
      // @ts-ignore
      new MyPromise();
    });
    assert.throw(() => {
      // @ts-ignore
      new MyPromise(1);
    });
    assert.throw(() => {
      // @ts-ignore
      new MyPromise(false);
    });
  });
  it("new Promise(fn) 会生成一个对象，对象有 then 方法", () => {
    const promise = new MyPromise(() => {});
    assert.isFunction(promise.then);
  });
  it("new Promise(fn) 中的 fn 立即执行", () => {
    let fn = sinon.fake();
    new MyPromise(fn);
    assert(fn.called);
  });
  it("new Promise(fn) 中的 fn 执行的时候接受 resolve 和 reject 两个函数", () => {
    new MyPromise((resolve, reject) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
    });
  });
  it("promise.then(success) 中的 success 会在 resolve 被调用的时候执行", (done) => {
    const success = sinon.fake();
    const promise = new MyPromise((resolve) => {
      assert.isFalse(success.called);
      // @ts-ignore
      resolve();
      setTimeout(() => {
        assert.isTrue(success.called);
        done();
      });
    });
    // @ts-ignore
    promise.then(success);
  });
  it("promise.then(null, fail) 中的 fail 会在 reject 被调用的时候执行", (done) => {
    const fail = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      assert.isFalse(fail.called);
      // @ts-ignore
      reject();
      setTimeout(() => {
        assert.isTrue(fail.called);
        done();
      });
    });
    // @ts-ignore
    promise.then(null, fail);
  });
  it("2.2.1 onFulfilled和onRejected都是可选的参数：", () => {
    const promise = new MyPromise((resolve) => {
      // @ts-ignore
      resolve();
    });
    // @ts-ignore
    promise.then(false, null);
    assert(1 === 1);
  });
  it("2.2.2 如果onFulfilled是函数", (done) => {
    const succeed = sinon.fake();
    const promise = new MyPromise((resolve) => {
      assert.isFalse(succeed.called);
      // @ts-ignore
      resolve(233);
      // @ts-ignore
      resolve(2333);
      setTimeout(() => {
        // @ts-ignore
        assert(promise.state === State.fulfilled);
        assert.isTrue(succeed.calledOnce);
        assert(succeed.calledWith(233));
        done();
      }, 0);
    });
    promise.then(succeed);
  });
  it("2.2.3 如果onRejected是函数", (done) => {
    const fail = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      assert.isFalse(fail.called);
      // @ts-ignore
      reject(233);
      // @ts-ignore
      reject(2333);
      setTimeout(() => {
        // @ts-ignore
        assert(promise.state === State.rejected);
        assert.isTrue(fail.calledOnce);
        assert(fail.calledWith(233));
        done();
      }, 0);
    });
    // @ts-ignore
    promise.then(null, fail);
  });
  it("2.2.4 在我的代码执行完之前，不得调用 then 后面的俩函数", (done) => {
    const succeed = sinon.fake();
    const promise = new MyPromise((resolve) => {
      // @ts-ignore
      resolve();
    });
    promise.then(succeed);
    assert.isFalse(succeed.called);
    setTimeout(() => {
      assert.isTrue(succeed.called);
      done();
    }, 0);
  });
  it("2.2.4 失败回调", (done) => {
    const fn = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      // @ts-ignore
      reject();
    });
    // @ts-ignore
    promise.then(null, fn);
    assert.isFalse(fn.called);
    setTimeout(() => {
      assert.isTrue(fn.called);
      done();
    }, 0);
  });
  it("2.2.5 onFulfilled和onRejected必须被当做函数调用", (done) => {
    const promise = new MyPromise((resolve) => {
      // @ts-ignore
      resolve();
    });
    promise.then(function () {
      "use strict";
      // @ts-ignore
      assert(this === undefined);
      done();
    });
  });
  it("2.2.6 then可以在同一个promise里被多次调用", (done) => {
    const promise = new MyPromise((resolve) => {
      // @ts-ignore
      resolve();
    });
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()];
    promise.then(callbacks[0]);
    promise.then(callbacks[1]);
    promise.then(callbacks[2]);
    setTimeout(() => {
      assert(callbacks[0].called);
      assert(callbacks[1].called);
      assert(callbacks[2].called);
      assert(callbacks[1].calledAfter(callbacks[0]));
      assert(callbacks[2].calledAfter(callbacks[1]));
      done();
    });
  });
  it("2.2.6.2 then可以在同一个promise里被多次调用 reject", (done) => {
    const promise = new MyPromise((resolve, reject) => {
      // @ts-ignore
      reject();
    });
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()];
    promise.then(null, callbacks[0]);
    promise.then(null, callbacks[1]);
    promise.then(null, callbacks[2]);
    setTimeout(() => {
      assert(callbacks[0].called);
      assert(callbacks[1].called);
      assert(callbacks[2].called);
      assert(callbacks[1].calledAfter(callbacks[0]));
      assert(callbacks[2].calledAfter(callbacks[1]));
      done();
    });
  });
  it("2.2.7 then必须返回一个promise", () => {
    const promise = new MyPromise((resolve) => {
      // @ts-ignore
      resolve();
    });
    const promise2 = promise.then(
      () => {},
      () => {}
    );
    // @ts-ignore
    assert(promise2 instanceof MyPromise);
  });
  it("2.2.7.1 如果 then(success, fail) 中的 success 返回一个值x, 运行 [[Resolve]](promise2, x) ", (done) => {
    const promise1 = new MyPromise((resolve) => {
      // @ts-ignore
      resolve();
    });
    promise1
      .then(
        () => "成功",
        () => {}
      )
      .then((result) => {
        assert.equal(result, "成功");
        done();
      });
  });
  it("2.2.7.1.2 success 的返回值是一个 Promise 实例", (done) => {
    const promise1 = new MyPromise((resolve) => {
      // @ts-ignore
      resolve();
    });
    const fn = sinon.fake();
    const promise2 = promise1.then(
      /*s1 */ () =>
        new MyPromise((resolve) => {
          // @ts-ignore
          resolve();
        })
    );
    promise2.then(fn);
    setTimeout(() => {
      assert(fn.called);
      done();
    }, 10);
  });
  it("2.2.7.1.2 success 的返回值是一个 Promise 实例，且失败了", (done) => {
    const promise1 = new MyPromise((resolve) => {
      // @ts-ignore
      resolve();
    });
    const fn = sinon.fake();
    // @ts-ignore
    const promise2 = promise1.then(
      /*s1 */ () =>
        new MyPromise((resolve, reject) => {
          // @ts-ignore
          reject();
        })
    );
    promise2.then(null, fn);
    setTimeout(() => {
      assert(fn.called);
      done();
    });
  });
  it("2.2.7.1.2 fail 的返回值是一个 Promise 实例", (done) => {
    const promise1 = new MyPromise((resolve, reject) => {
      // @ts-ignore
      reject();
    });
    const fn = sinon.fake();
    const promise2 = promise1.then(
      null,
      () =>
        new MyPromise((resolve) => {
          // @ts-ignore
          resolve();
        })
    );
    promise2.then(fn, null);
    setTimeout(() => {
      assert(fn.called);
      done();
    });
  });
  it("2.2.7.1.2 fail 的返回值是一个 Promise 实例，且失败了", (done) => {
    const promise1 = new MyPromise((resolve, reject) => {
      // @ts-ignore
      reject();
    });
    const fn = sinon.fake();
    const promise2 = promise1.then(
      null,
      () =>
        new MyPromise((resolve, reject) => {
          // @ts-ignore
          reject();
        })
    );
    promise2.then(null, fn);
    setTimeout(() => {
      assert(fn.called);
      done();
    });
  });
  it("2.2.7.2 如果success抛出一个异常e,promise2 必须被拒绝", (done) => {
    const promise1 = new MyPromise((resolve, reject) => {
      // @ts-ignore
      resolve();
    });
    const fn = sinon.fake();
    const error = new Error();
    const promise2 = promise1.then(() => {
      throw error;
    });
    promise2.then(null, fn);
    setTimeout(() => {
      assert(fn.called);
      assert(fn.calledWith(error));
      done();
    }, 10);
  });
  it("2.2.7.2 如果fail抛出一个异常e,promise2 必须被拒绝", (done) => {
    const promise1 = new MyPromise((resolve, reject) => {
      // @ts-ignore
      reject();
    });
    const fn = sinon.fake();
    const error = new Error();
    const promise2 = promise1.then(null, () => {
      throw error;
    });
    promise2.then(null, fn);
    setTimeout(() => {
      assert(fn.called);
      assert(fn.calledWith(error));
      done();
    });
  });
});
