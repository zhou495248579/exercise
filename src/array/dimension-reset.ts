export function dimensionReset(arr: any[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      arr.splice(i, 1, ...dimensionReset(arr[i]));
    }
  }
  return arr;
}
