import { sum } from "./sum";
import {isSymmetricalClosed, queryParse} from "./sto-write-test";

test("test 1+2", () => {
  expect(sum(1, 2)).toBe(3);
});

test("test to be undefined", () => {
  const a = 1;
  expect(a).toBeTruthy();
});

test("test tobe", () => {
  const obj = { name: "tom", age: 0 };
  expect(obj).toEqual({ name: "tom", age: 10 });
});

test("r", () => {
  const sourceUrl = "https://www.taobao.com?a=1&b=2&c=3&d#name";
  expect(queryParse(sourceUrl)).toEqual({
    a: "1",
    b: "2",
    c: "3",
    d: null,
  });
  expect(queryParse("https://www.taobao.com")).toEqual({});
});

test("s", () => {
  expect(isSymmetricalClosed("1->2")).toBeFalsy();
  expect(isSymmetricalClosed("1")).toBeTruthy();
  expect(isSymmetricalClosed("1->5->3->5->1")).toBeTruthy();
});

test("r", () => {
  const sourceUrl = "https://www.taobao.com?a=1&b=2&c=3&d#name";
  expect(queryParse(sourceUrl)).toEqual({
    a: "1",
    b: "2",
    c: "3",
    d: null,
  });
  expect(queryParse("https://www.taobao.com")).toEqual({});
});

test("r", () => {
  const sourceUrl = "https://www.taobao.com?a=1&b=2&c=3&d#name";
  expect(queryParse(sourceUrl)).toEqual({
    a: "1",
    b: "2",
    c: "3",
    d: null,
  });
  expect(queryParse("https://www.taobao.com")).toEqual({});
});
