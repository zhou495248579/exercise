var x=1;
if(function f(){}){ // 运算符中的函数声明在执行阶段中找不到
    x += typeof f;
}
console.log(x)
