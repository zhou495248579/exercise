const loagImg = function (src) {
    new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = function () {
            debugger
            setTimeout(() => {
                resolve();

            },1000)
            document.body.append(img);

        };

        img.onerror = function () {
            reject('加载图片失败');
        };
    })
};

const imgUrls = [
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575115991474&di=e12473a26a89cd090a65395deb41f62e&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsports%2Ftransform%2F20161008%2F1FUT-fxwrhpn9351517.JPG',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2013877421,694732424&fm=26&gp=0.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575117768775&di=0a19fe28c1bfc6860093e0436b0632c4&imgtype=0&src=http%3A%2F%2Fztd00.photos.bdimg.com%2Fztd%2Fw%3D700%3Bq%3D50%2Fsign%3D6f2059d2bffd5266a72b3e149b23e616%2F359b033b5bb5c9eafb2556dadc39b6003af3b331.jpg',

]
imgUrls.reduce((promise, imgUrl) => {
    return promise.then(() => {
        return loagImg(imgUrl);
    })
}, Promise.resolve());
