// import html from './index.html'
// import "./styles/index.scss";
Promise.allSettled([
    Promise.reject({ code: 500, msg: '服务异常' }),
    Promise.resolve({ code: 200, list: [] }),
    Promise.resolve({ code: 200, list: [] })
]).then(res => {
    console.log(res)
    /*
          0: {status: "rejected", reason: {…}}
          1: {status: "fulfilled", value: {…}}
          2: {status: "fulfilled", value: {…}}
      */

})
