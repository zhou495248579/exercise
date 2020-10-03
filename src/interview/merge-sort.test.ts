import { mergeArr, mergeSort } from "./merge-sort";

test("merge arr", () => {
  expect(mergeArr([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
});

test("merge sort", () => {
  const arr = [1, 2, 4, 2, 3, 7, 3, 5, 7, 4, 5, 8];
  expect(mergeSort(arr)).toEqual([1, 2, 2, 3, 3, 4, 4, 5, 5, 7, 7, 8]);
});
