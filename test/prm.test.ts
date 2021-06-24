import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);

const assert = chai.assert;

describe("promise", () => {
  it("promise error", (done) => {
    let fn = sinon.fake();
    Promise.resolve({})
      .then(() => {
        throw new Error("hhh");
      })
      .then(fn);

    setTimeout(() => {
      assert.isFalse(fn.called);
      done();
    });
  });
  it("promise error", (done) => {
    let fn = sinon.fake();
    Promise.resolve({})
      .then(() => {
        throw new Error("hhh");
      })
      .catch(fn);
    setTimeout(() => {
      assert.isTrue(fn.called);
      done();
    });
  });
  it("promise error", () => {
    Promise.resolve({})
      .then(() => {
        throw new Error("hhh");
      })
      .catch((e: Error) => {
        assert.equal(e.message, "hhh");
      });
  });
  it("async error", () => {
    const f = async function () {
      throw new Error("fffff");
    };
    let fn = sinon.fake();
    let fn2 = sinon.fake();

    f().then(fn).catch(fn2);
    setTimeout(() => {
      assert.isFalse(fn.called);
      assert.isTrue(fn2.called);
    });
  });
});
