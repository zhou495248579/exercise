function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(a + b);
  }, 1000);
}

export async function sum(...rest) {
  return rest.slice(1).reduce( (a: Promise<number>, b) => {
    return a.then((data) => {
      return new Promise((res, rej) => {
        asyncAdd(data, b, res);
      });
    });
  }, Promise.resolve(rest[0]));
}
