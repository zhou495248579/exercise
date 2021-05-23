function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}
function isFunction(value: any) {
  return typeof value === "function";
}
export function deepClone(val: any, map?: Map<any, any>): any {
  map = map ?? new Map();
  if (!isObject(val)) {
    return val;
  }
  if (map.has(val)) {
    return map.get(val);
  }
  let ret: any;
  if (Array.isArray(val)) {
    ret = [];
    for (const item of val) {
      ret.push(deepClone(item, map));
    }
  } else if (val instanceof RegExp) {
    ret = new RegExp(val.source, val.flags);
  } else if (val instanceof Date) {
    ret = new Date(val);
  } else if (isFunction(val)) {
    ret = function (this: any, ...args: any[]) {
      return val.apply(this, args);
    };
  } else {
    ret = {};
    map.set(val, ret);
  }
  for (const key of Object.keys(val)) {
    ret[key] = deepClone(val[key], map);
  }
  return ret;
}
