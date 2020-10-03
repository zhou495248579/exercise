export function throttle(func, ms) {
  let prev = 0;
  return function () {
    let now = +new Date();
    let context = this;

    if (now - prev > ms) {
      func.apply(context, arguments);
      prev = now;
    }
  };
}

const fun = throttle(() => {
  console.log(1);
}, 1000);
fun();
setTimeout(()=> {
    fun();

},1000)
