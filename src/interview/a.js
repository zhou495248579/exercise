var a = 1;
(function a() {
  a = 2;
  console.log(a); // iife中函数名不可变 a=2不会修改变量a，严格模式下回报错
})();
var a = [0];
if (a) {
  console.log(a == true);
} else {
  console.log(a);
}

