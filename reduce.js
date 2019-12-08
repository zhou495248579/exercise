Object.defineProperty(Array.prototype, 'reduce', {
    value: function (callback, initValue) {
        if (typeof callback !== 'function') {
            throw new Error(callback + 'is not function');
        }
        if (this === null) {
            throw new Error('reduce 不能callbakc in null')
        }
        let i = 0,
            o = Object(this), // 拿数组
            value = null,
            len = o.length >>> 0;
        if (arguments[1]) {
            value = arguments[1];
        } else {
            while (i < len && !i in o) {
                i++;
            }
            if (i >= len) {
                throw new Error('数组不能为空')
            }
            value = o[i++]
        }

        while (i < len) {
            if (i in o) {
                value = callback(value, o[i], i, o);
            }
            i++;
        }
        return value;
    }
});
const runPromiseInSequence = function (array, value) {
    array.reduce((promiseItem, callback) => {
        return promiseItem.then(callback)
    }, Promise.resolve(value))
};

const f1 = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('p1 running')
        resolve(1)
    }, 1000)
})

const f2 = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('p2 running')
        resolve(2)
    }, 1000)
})
runPromiseInSequence([f1, f2], 'init')
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
