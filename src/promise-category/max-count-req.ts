function getData() {
  return new Promise((res, rej) => {
    res("error");
  });
}

export function getDataLimit(count = 3) {
  let i = 1;
  return new Promise((resolve, reject) => {
    function _getData() {
      getData().then(
        (data) => {
          resolve(data);
        },
        (error) => {
          console.log(`执行${i}次`);
          if (i < count) {
            _getData();
            i++;
          }
        }
      );
    }
    _getData();
  });
}
