import { maxSubStrLen } from "./max-length-sub-str";

test("base", () => {
  expect(maxSubStrLen("abcbcba")).toBe(3);
  expect(maxSubStrLen("dvdf")).toBe(3);
  expect(maxSubStrLen("loddktdji")).toBe(5);
  expect(maxSubStrLen("adfafwefffdasdcx")).toBe(5);
});
