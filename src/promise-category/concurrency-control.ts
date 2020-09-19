function fetchData(n) {
  return new Promise((resolve, reject) => {
    resolve(n);
  });
}


async function loop() {
    for(let i =0;i<100;i++) {
        console.log('loop')
       const d = await fetchData(i);
        console.log(d);
    }
}
loop()
