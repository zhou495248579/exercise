import { deepClone } from "lodash-mock";

test("deepcopy", () => {
  const obj = { a: 1 };
  const newObj = deepClone(obj);
  expect(obj).not.toBe(newObj);
  expect(newObj.a).toBe(1);
});
