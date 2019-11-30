const draw = (color, duration) => {
    const ele = document.getElementById('box');
    return new Promise((resolve, reject) => {
            ele.style.backgroundColor = color;
            setTimeout(() => {
                resolve();
            }, duration)
        }
    )

};
// walk('top', 100).then(() => {
//     return walk('left', 500)
// }).then(() => {
//     return walk('top', 500)
// })

const task = async function () {
    await draw('green', 3000);
    await draw('red', 2000);
    await draw('yellow', 1000);
};
task();
