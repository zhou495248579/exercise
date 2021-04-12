import { kmp } from "./kmp";
describe("kmp", () => {
  test("base", () => {
    expect(kmp("ababaabacd", "aab")).toBe(4);
    expect(kmp("ababaabacd", "abacd")).toBe(5);
    expect(kmp("ababaabacd", "abaa")).toBe(2);
    expect(kmp("ababaabacd", "acd")).toBe(7);
  });
  test("nomatch", () => {
    expect(kmp("ababaabacd", "aae")).toBe(-1);
    expect(kmp("ababaabacd", "")).toBe(-1);
    expect(kmp("", "")).toBe(0);
  });
});
