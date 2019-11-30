const walk = (direction, distance) => {
    const ele = document.getElementById('box'),
        startDistance = direction === 'left' ? parseInt(getComputedStyle(ele).left) : parseInt(getComputedStyle(ele).top);
    return new Promise((resolve, reject) => {
            const innerWalk = () => {
                setTimeout(() => {
                    const currentDistance = direction === 'left' ? parseInt(getComputedStyle(ele).left) : parseInt(getComputedStyle(ele).top);
                    if (currentDistance === distance + startDistance) {
                        resolve();
                    } else {
                        if (direction === 'left') {
                            ele.style.left = parseInt(getComputedStyle(ele).left) + 1 + 'px';
                        } else {
                            ele.style.top = parseInt(getComputedStyle(ele).top) + 1 + 'px';

                        }
                        innerWalk();
                    }
                }, 20)


            };
            innerWalk();
        }
    )

};
// walk('top', 100).then(() => {
//     return walk('left', 500)
// }).then(() => {
//     return walk('top', 500)
// })

const task = async function () {
    await walk('top', 100);
    await walk('left', 500);
    await walk('top', 100);
};
task();
