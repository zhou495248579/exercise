(function () {
    var a = (b = 5); // 如果严格模式下 b需要写明 window.b
    console.log(a) // 5
})();
console.log(b);
console.log(a); // a定义在函数iife作用域内，b定义在window上
