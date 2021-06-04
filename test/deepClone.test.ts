import * as chai from "chai";
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
  it("有环", () => {
    // @ts-ignore
    const o1: any = { name: "zhangsan" };
    o1.self = o1;
    const o2 = deepClone(o1);
    assert(o2 !== o1);
    assert(o2.name === o1.name);
    assert(o2.self !== o1.self);
    assert(o2.self.name === o1.self.name);
  });
  it("reg", () => {
    const r1: any = new RegExp("a\\d", "gi");
    r1.attr = {
      name: "sss",
    };
    const r2 = deepClone(r1);
    assert(r1 !== r2);
    assert(r1.source === r2.source);
    assert(r1.flags === r2.flags);
    assert(r2.test("a2") === true);
    assert.isFalse(r2.test("2a"));
    assert(r1.attr !== r2.attr);
    assert(r1.attr.name === r2.attr.name);
  });
  it("date", () => {
    const d1: any = new Date();
    d1.attr = {
      name: "sss",
    };
    const d2 = deepClone(d1);
    assert(d1 !== d2);
    assert(d1.getTime() === d2.getTime());
    assert(d1.attr !== d2.attr);
    assert(d1.attr.name === d2.attr.name);
  });
  it("不拷贝原型属性", () => {
    const o1 = Object.create({
      age: 14,
    });
    o1.name = "lilei";
    const o2 = deepClone(o1);
    assert(o1 !== o2);
    assert(o1.name === o2.name);
    assert.isUndefined(o2.age);
  });
  it("复杂对象", () => {
    const a = {
      n: NaN,
      n2: Infinity,
      s: "",
      bool: false,
      null: null,
      u: undefined,
      sym: Symbol(),
      o: {
        n: NaN,
        n2: Infinity,
        s: "",
        bool: false,
        null: null,
        u: undefined,
        sym: Symbol(),
      },
      array: [
        {
          n: NaN,
          n2: Infinity,
          s: "",
          bool: false,
          null: null,
          u: undefined,
          sym: Symbol(),
        },
      ],
    };
    const a2 = deepClone(a);
    assert(a !== a2);
    assert.isNaN(a2.n);
    assert(a.n2 === a2.n2);
    assert(a.s === a2.s);
    assert(a.bool === a2.bool);
    assert(a.null === a2.null);
    assert(a.u === a2.u);
    assert(a.sym === a2.sym);
    assert(a.o !== a2.o);
    assert.isNaN(a2.o.n);
    assert(a.o.n2 === a2.o.n2);
    assert(a.o.s === a2.o.s);
    assert(a.o.bool === a2.o.bool);
    assert(a.o.null === a2.o.null);
    assert(a.o.u === a2.o.u);
    assert(a.o.sym === a2.o.sym);
    assert(a.array !== a2.array);
    assert(a.array[0] !== a2.array[0]);
    assert.isNaN(a2.array[0].n);
    assert(a.array[0].n2 === a2.array[0].n2);
    assert(a.array[0].s === a2.array[0].s);
    assert(a.array[0].bool === a2.array[0].bool);
    assert(a.array[0].null === a2.array[0].null);
    assert(a.array[0].u === a2.array[0].u);
    assert(a.array[0].sym === a2.array[0].sym);
  });
});
