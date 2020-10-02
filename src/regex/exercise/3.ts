const dRegex = /(\d{4})-(\d{2})-(\d{2})/
const dString = '2018-02-24';
console.log(dRegex.exec(dString))
console.log(RegExp.$1)
console.log(RegExp.$2)
const tagRegex = /<([^>]+)>([\d\D]*)<\/\1>/;
const tagStr ="<div>div1</div>";
console.log(tagStr.match(tagRegex))
