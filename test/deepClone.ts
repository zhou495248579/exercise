import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import { deepClone } from "../src/interview/deepClone";

const assert = chai.assert;

describe("deepclone", () => {
  it("一个函数", () => {
    assert.isFunction(deepClone);
  });
  it("拷贝基本类型", () => {
    const a1 = 1;
    assert(a1 === deepClone(a1));
    const a2 = "1";
    assert(a2 === deepClone(a2));
    const a3 = true;
    assert(a3 === deepClone(a3));
    const n = undefined;
    assert(n === deepClone(n));
    const n2 = null;
    assert(n2 === deepClone(n2));
    const s = Symbol();
    assert(s === deepClone(s));
  });
  it("拷贝基本对象", () => {
    const o1 = {
      name: "lisi",
      child: {
        name: "wangwu",
      },
    };
    const o2 = deepClone(o1);
    assert(o2 !== o1);
    assert(o1.name === o2.name);
    assert(o1.child !== o2.child);
    assert(o1.child.name === o2.child.name);
  });
  it("拷贝数组", () => {
    const arr1: any[] = [
      [1, 2],
      { name: "lilianjie", children: [{ name: "liujial" }] },
    ];
    const arr2 = deepClone(arr1);
    assert(arr1 !== arr2);
    assert(arr1[0] !== arr2[0]);
    assert(arr1[0][0] === arr2[0][0]);
    assert(arr1[1] !== arr2[1]);
    assert(arr2[1].name === arr1[1].name);
    assert(arr2[1].children !== arr1[1].children);
    assert(arr1[1].children[0].name === arr2[1].children[0].name);
    assert.deepEqual(arr2, arr1);
  });
  it("拷贝函数", () => {
    const f1 = (a1: number, a2: number) => {
      return a1 + a2;
    };
    f1.attr = {
      name: "sss",
    };
    const f2 = deepClone(f1);
    assert(f1(1, 2) === f2(1, 2));
    assert(f1.attr !== f2.attr);
    assert(f1.attr.name === f2.attr.name);
  });
});
