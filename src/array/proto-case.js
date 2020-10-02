var p = [];
var A = new Function();
A.prototype = p;
var a = new A;
a.push(1);
console.log(a.length);
console.log(p.length);
