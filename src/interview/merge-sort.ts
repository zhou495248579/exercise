export function mergeArr<T>(arr1: T[], arr2: T[]): T[] {
  let i = 0,
    j = 0,
    res = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }
  if (i < arr1.length) {
    res = res.concat(arr1.slice(i));
  } else {
    res = res.concat(arr2.slice(j));
  }
  return res;
}

export function mergeSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) {
    return arr.slice(0);
  }
  let mid = Math.floor((arr.length) / 2); // 注意这地方是length 不是length -1
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return mergeArr(left, right);
}
