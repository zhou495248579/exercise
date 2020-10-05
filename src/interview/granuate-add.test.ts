import { add, currying } from "./granuate-add";

test("base", () => {
  const addCurry = currying(add);
  expect(addCurry(1)(2)(3)()).toBe(6);
    expect(addCurry(1)(2)(3)(4,5,6)()).toBe(21);

});
