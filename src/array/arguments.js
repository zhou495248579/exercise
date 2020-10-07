function side(arr) {
  arr[0] = arr[2];
}

/**
 *
 * @description c设置默认值后arguments与变量就没有关联，不设置就会关联
 */
function arguments(a, b, c = 3) {
  c = 10;
  side(arguments);
  return a + b + c;
}
let r = arguments(1, 1, 1);
console.log(r);
