async function asyncLoop(arr: number[]) {
  let result = [];
  while (arr.length) {
    const item = arr.shift();
    const _result = await work(item);
    result.push(_result);
  }
  return result;
}

function work(item) {
  return new Promise((resolve, reject) => {
    resolve(item);
  });
}
asyncLoop([1,4,6]).then((result) => {
  console.log(result);
});
