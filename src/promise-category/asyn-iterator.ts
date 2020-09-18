function makeValue(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("value");
    }, ms);
  });
}

function* makeValues() {
  yield makeValue(1000);
  yield makeValue(2000);
  yield makeValue(3000);
}

async function run() {
  for await (let item of makeValues()) {
    console.log(item);
  }
}
run();
