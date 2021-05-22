function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}
function isFunction(value: any) {
  return typeof value === "function";
}
export function deepClone(val: any): any {
  if (Array.isArray(val)) {
    const arr = [];
    for (const item of val) {
      arr.push(deepClone(item));
    }
    return arr;
  }
  if (isFunction(val)) {
    const fun: any = (...args: any[]) => {
      // @ts-ignore
      return val.apply(this as any, args);
    };
    for (const key of Object.keys(val)) {
      fun[key] = deepClone(val[key]);
    }
    return fun;
  }
  if (isObject(val)) {
    const obj: any = {};
    for (const key of Object.keys(val)) {
      obj[key] = deepClone(val[key]);
    }
    return obj;
  }
  return val;
}
