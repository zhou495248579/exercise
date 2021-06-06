export function isFunction(value: any) {
  return typeof value === "function";
}
export function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}
