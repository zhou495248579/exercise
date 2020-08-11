import {timer} from "./timer";

test("test timer", () => {
  timer();
  expect(setTimeout).toBeCalledTimes(1);
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
});
