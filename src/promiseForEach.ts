// export async function loop(arr) {
//   const arr = [1, 2, 3],
//     result = [];
//   while(arr) {
//
//   }
//   const _result = await _loop(arr);
//   if (_result) {
//     result.push(_result);
//   } else {
//     return _loop(arr.slice(0));
//   }
//   return result;
// }
async function loop(arr: number[]) {
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
loop([1,4,6]).then((result) => {
  console.log(result);
});
