import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import { MyPromise } from "../src/interview/promise";
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
      new Promise();
    });
    assert.throw(() => {
      // @ts-ignore
      new Promise(1);
    });
    assert.throw(() => {
      // @ts-ignore
      new Promise(false);
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
});
