export function maxSubStrLen(str: string): number {
  let i = 0,
    j = 0,
    maxLen = 0;
  while (j <= str.length) {
    const rest = str.slice(i, j);
    if (rest.includes(str[j])) {
      i++;
    } else {
        maxLen = Math.max(maxLen, j - i);
        j++;
    }
  }
  return maxLen;
}
