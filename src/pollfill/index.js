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
