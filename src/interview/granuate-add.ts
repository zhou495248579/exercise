export function currying(fn: Function) {
  let args = [];
  return function temp(...newArgs) {
    if (newArgs.length) {
      args = args.concat(newArgs);
      return temp;
    } else {
      const result = fn.apply(this, args);
      args = [];
      return result;
    }
  };
}

export function add(...args) {
  return args.reduce((a, b) => {
    return a + b;
  });
}
