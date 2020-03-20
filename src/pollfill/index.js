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
        timer && clearTimeout(timer); // 如果之前有定时器在等待，就撤销调用，每次定时器都保存最新的调用
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

export const mockInstanceOf = function (l, r) {
    if (typeof l !== 'object') {
        return false;
    }

    while (l) {
        if (l.__proto__ === r.prototype) {
            return true;
        }
        l = l.__proto__;
    }
    return false;
};

export const get = function (params, obj) {
    return params.reduce((accum, attr) => {
        return (accum && accum[attr]) ? accum[attr] : null;
    }, obj);
};

export function DateConstructor() {
    // Date对象在js中只能通过Date函数用构造函数的方式实例化
    const date = new (Function.prototype.bind.apply(Date,
        [Date].concat(Array.prototype.slice.call(arguments))))();
    // Object.setPrototypeOf(date,DateConstructor.prototype);
    return date;
}

export function flat(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            arr.splice(i, 1, ...flat(arr[i]));
        }
    }
    return arr;
}