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
    Object.setPrototypeOf(date, DateConstructor.prototype);
    return date;
}

Object.setPrototypeOf(DateConstructor.prototype, Date.prototype);
DateConstructor.prototype.getMyTime = function () {
    console.log('this is my time')
};

export function flat(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            arr.splice(i, 1, ...flat(arr[i]));
        }
    }
    return arr;
}

export function inherit(child, parent) {
    if(typeof parent !== 'function' && parent !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    child.prototype = Object.create(parent.prototype, {
        constructor: {
            value: child,
            writable: false,
            configurable: true
        }
    });
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(child, parent);
    } else if (child.__proto__) {
        child.__proto__ = parent;
    } else {
        for (const key in parent) {
            // 可以用in方法判断这个键值是否存在这个对象上
            if (parent.hasOwnProperty(key) && !(key in child)) {
                child[key] = parent[key];
            }
        }
    }
    return child;
}

// class C extends {a: 1} {
//
// }
//
// new C()