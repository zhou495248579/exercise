import { timer } from "./timer";
jest.useFakeTimers();

test("test timer", () => {
  timer();
  expect(setTimeout).toBeCalledTimes(1);
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
});
