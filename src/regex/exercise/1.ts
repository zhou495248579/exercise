const reg = /ab{2,5}c/g;
console.log("abc abbc abbbc abbbbc abbbbbc abbbbbbc".match(reg));
// 16进制颜色
const colorReg = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
const colorStr = "#ffbbad #Fc01DF #FFF #ffE";
console.log(colorStr.match(colorReg));
