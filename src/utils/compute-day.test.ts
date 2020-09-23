import { computeDays } from "./compute-day";

test("day", () => {
  expect(
    computeDays("Fri Sep 27 2020 15:13:59 GMT+0800 (中国标准时间)").day
  ).toBe(3);
  expect(
    computeDays("Wed Sep 23 2020 15:03:38 GMT+0800 (中国标准时间)").day
  ).toBe(0);
  expect(
    computeDays("Wed Sep 25 2020 15:49:38 GMT+0800 (中国标准时间)").day
  ).toBe(2);
});

test("hour", () => {
    expect(
        computeDays("Fri Sep 23 2020 17:19:59 GMT+0800 (中国标准时间)").hour
    ).toBe(2);
    expect(
        computeDays("Fri Sep 23 2020 15:34:59 GMT+0800 (中国标准时间)").hour
    ).toBe(1);
    expect(
        computeDays("Fri Sep 23 2020 15:30:59 GMT+0800 (中国标准时间)").hour
    ).toBe(0);
});
