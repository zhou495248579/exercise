import '../styles/index.less';

Function.prototype.mockbind = function (target, ...args) {
    const self = this;
    return function (...param) {
        const newParam = [...args, ...param]
        self.apply(target, newParam);
    }
};

Function.prototype.mockApply = function (target, args) {
    const self = this;
    const obj = new Object(target);
    const key = Symbol.for('key');
    obj[key] = self;
    const result = obj[key](...args);
    delete obj[key];
    return result;
};

/**
 * 防抖
 */
export const debounce = function (func, wait) {
    let timer = null;
    return function (...args) {
        const context = this;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, wait);
    }
};

/**
 * 节流
 */

export const throttle = function (func, wait) {
    let startTime = 0;

    return function (...args) {
        const context = this;
        const handTime = +new Date(); // 小技巧等于调用getTime方法

        if (handTime - startTime > wait) {
            func.apply(context, args);
            startTime = handTime;
        }

    }
};
