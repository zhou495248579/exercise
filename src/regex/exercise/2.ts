const beginEndReg = /^|$/g;
console.log("hello".replace(beginEndReg, "#"));
const multiReg = /^|$/gm;
console.log("I\nlove\njavascript".replace(multiReg, "#"));

const behindReg = /(?<=p)/g;
const behindStr = "happy pegg";
console.log(behindStr.replace(behindReg, "#"));

const str1 = "12345678";
const regx = /(?!^)(?=(\d{3})+$)/g;
console.log(str1.replace(regx, ","));
