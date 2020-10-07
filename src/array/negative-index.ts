export const negativeArray = (arr) =>
  new Proxy(arr, {
    get: (target: any, p: any, receiver: any) => {
      return Reflect.get(
        target,
        +p < 0 ? String(target.length + +p) : p,
        receiver
      );
    },
  });

let item = negativeArray([1, 2, 3])[-1];
console.log(item);
