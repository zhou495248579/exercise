export function debounce(func, ms) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    const arg = arguments;
    timer = setTimeout(() => {
      func.apply(context, ...arg);
    }, ms);
  };
}

const fun  =debounce(() => {
  console.log(1);
}, 1000);
// debounce(() => {
//   console.log(2);
// }, 2);
fun();
fun()
