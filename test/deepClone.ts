import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import { deepClone } from "lodash-mock";

const assert = chai.assert;

describe("deepclone", () => {
  it("一个函数", () => {
    assert.isFunction(deepClone);
  });
});
