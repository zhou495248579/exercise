import { sum } from "./sum";

test("test sum", () => {
  sum(1, 2, 3, 5).then((data) => {
    expect(data).toBe(11);
  });
});
