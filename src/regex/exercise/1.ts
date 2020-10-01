const reg = /ab{2,5}c/g;
console.log("abc abbc abbbc abbbbc abbbbbc abbbbbbc".match(reg));
// 16进制颜色
const colorReg = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
const colorStr = "#ffbbad #Fc01DF #FFF #ffE";
console.log(colorStr.match(colorReg));
// 匹配时间
const timeReg = /^([0-1][0-9]|[2][0-3]):[0-5][0-9]$/g;
const timeStr = "23:59";
const timeStr2 = '02:07'
console.log(timeStr.match(timeReg));
console.log(timeStr2.match(timeReg));
// 日期
const dateReg = /^[0-9]{4}-([0][0-9]|[1][0-2])-(0[1-9]|[12][0-9]|3[01])$/g;
console.log( dateReg.test("2017-06-10") );
// 路径
const pathReg = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/
console.log( pathReg.test("F:\\study\\javascript\\regex\\regular expression.pdf") );
console.log( pathReg.test("F:\\study\\javascript\\regex\\") );
console.log( pathReg.test("F:\\study\\javascript") );
console.log( pathReg.test("F:\\") );
