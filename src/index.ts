import "./styles/index.scss";
function delay(times: number): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, times);
  });
}

const promises = [delay(1000),delay(3000),delay(4000)];
async function start() {
    for(let i = 0;i<promises.length;i++) {
        const r = await promises[i]
        console.log(i,r)
    }
}

start();