import { sum } from "./sum";

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
