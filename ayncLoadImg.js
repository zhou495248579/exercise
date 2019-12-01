const loagImg = function (src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = function () {
                resolve(src);

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

];
// imgUrls.reduce((promise, imgUrl) => {
//     return promise.then(() => {
//         return loagImg(imgUrl);
//     })
// }, Promise.resolve());


const loadByLimit = (urlIds, loadImg, limit) => {
    const urlIdsCopy = [...urlIds]

    if (urlIdsCopy.length <= limit) {
        // 如果数组长度小于最大并发数，直接全部请求
        const promiseArray = urlIds.map(urlId => loadImg(urlId))
        return Promise.all(promiseArray)
    }

// 注意 splice 方法会改变 urlIdsCopy 数组
    const promiseArray = urlIdsCopy.splice(0, limit).map(urlId => loadImg(urlId))
    urlIdsCopy.reduce(
        (prevPromise, urlId) =>
            prevPromise
                .then(() => Promise.race(promiseArray))
                .catch(error => {
                    console.log(error)
                })
                .then(resolvedId => {
                    // 将 resolvedId 剔除出 promiseArray 数组
                    // 这里的删除只是伪代码，具体删除情况要看后端 Api 返回结果
                    let resolvedIdPostion = promiseArray.findIndex(id => resolvedId === id)
                    promiseArray.splice(resolvedIdPostion, 1)
                    promiseArray.push(loadImg(urlId))
                })
        ,
        Promise.resolve()
    )
        .then(() => Promise.all(promiseArray))
}
loadByLimit(imgUrls,loagImg, 2);
