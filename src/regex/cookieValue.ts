export function getCookieValue(str: string): string {
  if (!str) {
    return null;
  }
  const reg = /cookieValue=([^;\s]*)/gi;
  const match = reg.exec(str);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}
