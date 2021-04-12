export function kmp(mainStr: string, subStr: string): number {
  if (!subStr) {
    return mainStr === subStr ? 0 : -1;
  }
  let i = 0,
    j = 0;
  const next: number[] = [];
  getNext(next, subStr);
  while (i < mainStr.length && j < subStr.length) {
    if (j === -1 || mainStr[i] === subStr[j]) {
      i++;
      j++;
    } else {
      j = next[j];
    }
  }
  if (j >= subStr.length) {
    return i - subStr.length;
  } else {
    return -1;
  }
}

function getNext(next: number[], str: string) {
  let i = 0,
    j = -1;
  next[0] = -1;
  while (i < str.length) {
    if (str[i] === str[j] || j === -1) {
      i++;
      j++;
      if (str[i] === str[j]) {
        next[i] = next[j];
      } else {
        next[i] = j;
      }
    } else {
      j = next[j];
    }
  }
}
